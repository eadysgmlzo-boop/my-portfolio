import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { query, conversation_id } = await req.json();
    const apiKey = process.env.DIFY_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing DIFY_API_KEY environment variable' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.dify.ai/v1/chat-messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        inputs: {},
        query: query,
        response_mode: "streaming",
        conversation_id: conversation_id || "",
        user: "visitor-nextjs",
        files: []
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Dify API Error: ${response.status}` },
        { status: response.status }
      );
    }

    // 直接将 Dify 的流式响应透传给前端
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
