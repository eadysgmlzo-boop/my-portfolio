import { ChatMessage } from "@/types";

// Next.js API Route - 请求由服务端代理到 Dify
// API Key 在服务端环境变量中配置，前端无需关心
const API_URL = '/api/chat';

export const CONNECTION_ERROR_FLAG = "__CONNECTION_ERROR__";

/**
 * Standardized stream function to match the UI component's expectation
 */
export const streamChatResponse = async (
  history: ChatMessage[],
  newMessage: string,
  onChunk: (text: string) => void,
  context: 'general' | 'business' = 'general'
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

  try {
    // 构建请求体
    const body = {
      query: newMessage,
      conversation_id: "", // 可以根据需要管理会话 ID
    };

    // 请求 Next.js API Route
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Dify API Error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) throw new Error("No response body");

    let fullBuffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const jsonStr = line.slice(6);
        if (jsonStr.trim() === '[DONE]') continue;

        try {
            const data = JSON.parse(jsonStr);
            
            // Dify returns 'message' event for text chunks
            if (data.event === 'message') {
                const text = data.answer;
                fullBuffer += text;
                onChunk(fullBuffer); // Update UI with full text so far
            }
        } catch (e) {
            console.warn("Parse error", e);
        }
      }
    }

  } catch (error) {
    console.error("Dify Chat Error:", error);
    onChunk(CONNECTION_ERROR_FLAG);
  }
};