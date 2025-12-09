import { GoogleGenAI, GenerateContentResponse, Content } from "@google/genai";
import { ChatMessage } from "../types";

// API key must be obtained exclusively from process.env.API_KEY.
export const CONNECTION_ERROR_FLAG = "__CONNECTION_ERROR__";

const DEFAULT_SYSTEM_INSTRUCTION = `
You are the interactive AI assistant for a high-end technical portfolio website belonging to "Alex Dev".
Your goal is to impress visitors with professional, witty, and technically accurate responses.

Key Information about Alex Dev:
- Role: Full Stack Engineer & AI Automation Specialist
- Core Stack: React, TypeScript, Node.js, Python, Tailwind CSS.
- AI Expertise: Gemini API, LangChain, n8n workflows.
- Design Skills: Figma, UI/UX, Motion Design.
- Background: Bio-engineering degree, creating "Bio-IT" and "AI for Science" solutions.
- Experience: Freelance Full Stack Dev & AI Automation Designer (2025-Present).

Guidelines:
- Keep answers concise and engaging (under 100 words unless asked for detail).
- Use a friendly, tech-savvy tone.
- If asked about contact info, provide email: lsl1113479669@163.com and phone: 15337145797.
- If asked about projects, mention the "Works" section which features an E-commerce AI bot, Crypto Dashboard, and Mini Programs.
`;

const BUSINESS_SYSTEM_INSTRUCTION = `
You are "Alex Dev's" AI Business Manager. You are professional, persuasive, and focused on converting leads into clients.
Your goal is to gather project requirements, estimate costs roughly (ranges), and encourage the user to book a meeting.

Key Guidelines:
- Tone: Professional, confident, consultative.
- Services: Web Development ($50-$150/hr), AI Automation (Fixed price starting at $2000), Consulting ($200/hr).
- When a user describes a project (e.g., E-commerce site), break it down technically (Frontend, Backend, Database) and give a rough timeline (e.g., 4-8 weeks).
- Always end with a call to action: "Shall I schedule a call for you?" or "Would you like a detailed proposal sent to your email?"
- If asked for contact info, provide email: lsl1113479669@163.com and phone: 15337145797.
- Do not promise exact delivery dates. Use estimates.
`;

/**
 * Streams a chat response from Gemini using the @google/genai SDK.
 * 
 * @param history - Array of previous chat messages.
 * @param newMessage - The new message from the user.
 * @param onChunk - Callback function to handle incoming text chunks.
 * @param context - 'general' for the main chatbot, 'business' for the contact section.
 */
export const streamChatResponse = async (
  history: ChatMessage[],
  newMessage: string,
  onChunk: (text: string) => void,
  context: 'general' | 'business' = 'general'
) => {
  try {
    if (!process.env.API_KEY) {
       console.error("API_KEY is missing.");
       onChunk(CONNECTION_ERROR_FLAG);
       return;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-flash';
    
    const systemInstruction = context === 'business' ? BUSINESS_SYSTEM_INSTRUCTION : DEFAULT_SYSTEM_INSTRUCTION;

    // Transform application ChatMessage[] to Gemini API Content[] format
    const validHistory: Content[] = history
      .filter(msg => msg.text && msg.text.trim().length > 0 && msg.text !== CONNECTION_ERROR_FLAG)
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: validHistory
    });

    const resultStream = await chat.sendMessageStream({ message: newMessage });

    for await (const chunk of resultStream) {
       const c = chunk as GenerateContentResponse;
       if (c.text) {
         onChunk(c.text);
       }
    }
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    onChunk(CONNECTION_ERROR_FLAG);
  }
};
