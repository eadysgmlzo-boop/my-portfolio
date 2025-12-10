import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // 启用 Edge Runtime，转发延迟更低

export async function POST(req: NextRequest) {
  try {
    // 1. 获取前端传来的参数
    const { query, inputs, conversation_id, user } = await req.json();

    // 2. 校验环境变量
    const apiKey = process.env.DIFY_API_KEY;
    const apiUrl = process.env.DIFY_API_URL || 'https://api.dify.ai/v1';

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing DIFY_API_KEY environment variable' },
        { status: 500 }
      );
    }

    // 3. 构造 Dify 请求体
    const payload = {
      inputs: inputs || {},
      query: query,
      response_mode: "streaming",
      conversation_id: conversation_id || "",
      user: user || "default-user",
      files: []
    };

    // 4. 调用 Dify API
    const response = await fetch(`${apiUrl}/chat-messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // 5. 错误处理
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Dify API Error', details: await response.text() },
        { status: response.status }
      );
    }

    // 6. 直接透传流式响应
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
