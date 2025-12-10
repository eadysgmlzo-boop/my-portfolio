import { ChatMessage } from "@/types";

// Next.js API Route - 请求由服务端代理到 Dify
// API Key 在服务端环境变量中配置，前端无需关心
const API_URL = '/api/chat';

export const CONNECTION_ERROR_FLAG = "__CONNECTION_ERROR__";

// 💾 会话记忆 ID，保持上下文连贯
let conversationId = '';

// 💾 固定用户 ID，整个会话保持一致
const userId = `visitor-${Math.random().toString(36).substring(2, 10)}`;

// 🛑 当前请求的 AbortController，用于停止生成
let currentController: AbortController | null = null;
let currentReader: ReadableStreamDefaultReader<Uint8Array> | null = null;

/**
 * 获取当前会话 ID（供外部使用）
 */
export const getConversationId = () => conversationId;

/**
 * 重置会话（开始新对话）
 */
export const resetConversation = () => {
  conversationId = '';
};

/**
 * 停止当前正在进行的生成
 */
export const stopGeneration = () => {
  console.log('stopGeneration called');
  if (currentReader) {
    currentReader.cancel();
    currentReader = null;
  }
  if (currentController) {
    currentController.abort();
    currentController = null;
  }
};

/**
 * Standardized stream function to match the UI component's expectation
 * 支持会话记忆、agent_message 事件、完整参数透传
 */
export const streamChatResponse = async (
  history: ChatMessage[],
  newMessage: string,
  onChunk: (text: string) => void,
  context: 'general' | 'business' = 'general'
) => {
  // 如果有正在进行的请求，先取消
  if (currentController) {
    currentController.abort();
  }

  currentController = new AbortController();
  const controller = currentController;
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

  try {
    // 构建请求体 - 支持完整参数
    const body = {
      query: newMessage,
      inputs: {}, // 如果 Dify YAML 有变量，在这里传
      conversation_id: conversationId, // 带上记忆 ID
      user: userId, // 固定用户标识
    };

    console.log('Dify Request:', { ...body, conversationId, userId });

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
      const errorText = await response.text();
      console.error('Dify API Error:', response.status, errorText);
      throw new Error(`Dify API Error: ${response.status} - ${errorText}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) throw new Error("No response body");

    // 保存 reader 引用，以便停止时可以取消
    currentReader = reader;

    let fullBuffer = '';
    let pendingData = ''; // 处理跨 chunk 的不完整数据

    try {
      while (true) {
        // 检查是否已被中止
        if (controller.signal.aborted) {
          break;
        }

        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        pendingData += chunk;

        // Dify 的数据块可能会连在一起，需要按 "\n\n" 分割
        const lines = pendingData.split('\n\n');
        // 保留最后一个可能不完整的部分
        pendingData = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6); // 去掉 "data: " 前缀
          if (jsonStr.trim() === '[DONE]') continue;

          try {
            const data = JSON.parse(jsonStr);

            // 🧠 核心逻辑：处理不同类型的事件
            if (data.event === 'message' || data.event === 'agent_message') {
              // 收到文本片段，拼接到 buffer
              const text = data.answer || '';
              fullBuffer += text;
              onChunk(fullBuffer); // Update UI with full text so far

              // 更新会话 ID（第一次请求会返回）
              if (!conversationId && data.conversation_id) {
                conversationId = data.conversation_id;
              }
            }

            // 处理错误事件
            if (data.event === 'error') {
              console.error('Dify Error Event:', data);
              throw new Error(data.message || 'Dify returned an error');
            }

          } catch (e) {
            // 只在非 JSON 解析错误时警告
            if (jsonStr.trim()) {
              console.warn("Parse error:", e);
            }
          }
        }
      }
    } finally {
      currentReader = null;
    }

    // 处理最后可能残留的数据
    if (pendingData.startsWith('data: ')) {
      const jsonStr = pendingData.slice(6);
      if (jsonStr.trim() && jsonStr.trim() !== '[DONE]') {
        try {
          const data = JSON.parse(jsonStr);
          if (data.event === 'message' || data.event === 'agent_message') {
            fullBuffer += data.answer || '';
            onChunk(fullBuffer);
            if (!conversationId && data.conversation_id) {
              conversationId = data.conversation_id;
            }
          }
        } catch (e) {
          // ignore
        }
      }
    }

  } catch (error) {
    // 用户主动停止，不显示错误
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Generation stopped by user');
      return;
    }
    console.error("Dify Chat Error:", error);
    onChunk(CONNECTION_ERROR_FLAG);
  } finally {
    currentController = null;
  }
};