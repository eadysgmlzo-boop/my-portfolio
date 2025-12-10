"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Minimize2, AlertCircle, Phone, Mail, RotateCcw, Square } from 'lucide-react';
import { ChatMessage } from '@/types';
// SWITCHED TO DIFY SERVICE
import { streamChatResponse, CONNECTION_ERROR_FLAG, resetConversation, stopGeneration } from '@/services/difyService';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import QRCode from 'react-qr-code';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatWidget: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [qrError, setQrError] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null); // 追踪正在流式输出的消息

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
        setMessages([
            { id: '1', role: 'model', text: t('chat.initial'), timestamp: Date.now() }
        ]);
    }
  }, [language, t]); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    // Update messages locally
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    const botMsgId = (Date.now() + 1).toString();
    setStreamingMsgId(botMsgId); // 标记正在流式输出的消息
    // Add placeholder for bot message
    setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '', timestamp: Date.now() }]);

    // Use Dify Service
    await streamChatResponse(
      updatedMessages,
      userMsg.text,
      (fullText) => {
        setMessages(prev => prev.map(msg =>
          msg.id === botMsgId ? { ...msg, text: fullText } : msg
        ));
      },
      'general'
    );

    setStreamingMsgId(null); // 流式输出结束
    setIsTyping(false);
  };

  // 重置对话
  const handleReset = () => {
    resetConversation();
    setMessages([
      { id: '1', role: 'model', text: t('chat.initial'), timestamp: Date.now() }
    ]);
  };

  // 停止生成
  const handleStop = () => {
    stopGeneration();
    setStreamingMsgId(null);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Render the message content or the Error Card
  const renderMessageContent = (msg: ChatMessage) => {
      if (msg.text === CONNECTION_ERROR_FLAG && msg.role === 'model') {
          return (
              <div className="flex flex-col gap-3 min-w-[200px]">
                  <div className="flex items-center gap-2 text-red-400 font-bold border-b border-red-500/20 pb-2">
                      <AlertCircle size={18} />
                      <span>{language === 'zh-CN' ? '连接失败' : 'Connection Failed'}</span>
                  </div>
                  <p className="text-txt-muted text-xs">
                    {language === 'zh-CN'
                        ? '抱歉，我的 Dify 服务似乎未响应。您可以直接通过以下方式联系我：'
                        : 'Sorry, my Dify service is not responding. You can contact me directly:'}
                  </p>

                  {/* Contact Info Card */}
                  <div className="bg-glass/10 rounded-xl p-3 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-txt-main">
                          <div className="p-1.5 bg-green-500/20 text-green-500 rounded-lg"><Phone size={14} /></div>
                          <span className="font-mono">153-3714-5797</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-txt-main">
                          <div className="p-1.5 bg-blue-500/20 text-blue-500 rounded-lg"><Mail size={14} /></div>
                          <span className="font-mono">lsl1113479669@163.com</span>
                      </div>

                      {/* QR Code Placeholder */}
                      <div className="flex flex-col items-center justify-center pt-2 border-t border-glass/10">
                          <div className="bg-white p-2 rounded-lg mb-1 w-full max-w-[140px] overflow-hidden">
                              {!qrError ? (
                                <img
                                  src="wechat-qr.jpg"
                                  alt="WeChat QR"
                                  className="w-full h-auto object-cover"
                                  onError={() => setQrError(true)}
                                />
                              ) : (
                                <QRCode
                                  value="lsl1113479669"
                                  size={120}
                                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                  viewBox={`0 0 256 256`}
                                />
                              )}
                          </div>
                          <span className="text-[10px] text-txt-muted">
                              {language === 'zh-CN' ? '扫一扫加我微信' : 'Scan to add WeChat'}
                          </span>
                      </div>
                  </div>
              </div>
          );
      }

      // 使用 ReactMarkdown 渲染 Markdown 内容
      const isStreaming = msg.id === streamingMsgId;

      return (
        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // 自定义表格��式
              table: ({ children }) => (
                <table className="border-collapse text-xs my-2 w-full">{children}</table>
              ),
              th: ({ children }) => (
                <th className="border border-glass/20 px-2 py-1 bg-glass/10 text-left font-semibold">{children}</th>
              ),
              td: ({ children }) => (
                <td className="border border-glass/20 px-2 py-1">{children}</td>
              ),
              // 代码块样式
              code: ({ className, children }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-glass/20 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                ) : (
                  <code className="block bg-glass/10 p-2 rounded-lg text-xs font-mono overflow-x-auto my-2">{children}</code>
                );
              },
              // 段落样式
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              // 列表样式
              ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
              // 链接样式
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">{children}</a>
              ),
              // 加粗
              strong: ({ children }) => <strong className="font-bold text-txt-main">{children}</strong>,
            }}
          >
            {msg.text}
          </ReactMarkdown>
          {/* 流式输出时显示闪烁光标 */}
          {isStreaming && (
            <span className="inline-block w-2 h-4 bg-secondary/80 ml-0.5 animate-pulse" />
          )}
        </div>
      );
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        aria-label="chat"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 ${
            isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-gradient-to-r from-secondary to-purple-600 text-white'
        }`}
      >
        <div className="relative">
             <MessageSquare size={26} />
             <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
             </span>
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: '100%', scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: '100%', scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 md:inset-auto md:bottom-8 md:right-8 w-full h-[100dvh] md:w-[400px] md:h-[600px] md:max-h-[80vh] bg-surface/95 backdrop-blur-xl md:border md:border-glass/10 md:rounded-2xl shadow-2xl flex flex-col z-[60] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-glass/5 flex justify-between items-center bg-glass/5 pb-safe-top md:pb-4 pt-safe-top md:pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-purple-700 flex items-center justify-center relative shadow-lg">
                    <Sparkles size={18} className="text-white" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-bold text-txt-main text-sm">AI Assistant</h3>
                  <p className="text-xs text-green-400 font-mono flex items-center gap-1">
                     <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                     {t('chat.online')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="p-2 hover:bg-glass/10 rounded-lg text-txt-muted hover:text-txt-main transition-colors"
                  title={language === 'zh-CN' ? '重新开始' : 'New Chat'}
                >
                  <RotateCcw size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-glass/10 rounded-lg text-txt-muted hover:text-txt-main transition-colors"
                >
                  <span className="md:hidden"><Minimize2 size={24} /></span>
                  <span className="hidden md:block"><X size={20} /></span>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-secondary to-purple-600 text-white rounded-tr-none'
                        : 'bg-surface border border-glass/10 text-txt-main rounded-tl-none'
                    }`}
                  >
                    {renderMessageContent(msg)}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-glass/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                      <span className="w-2 h-2 bg-txt-muted rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-txt-muted rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-txt-muted rounded-full animate-bounce delay-200"></span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-glass/5 bg-background/50 backdrop-blur-md pb-safe-bottom md:pb-4">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('chat.placeholder')}
                  className="flex-1 bg-surface border border-glass/10 rounded-xl px-4 py-3 text-sm text-txt-main placeholder-txt-muted focus:outline-none focus:border-secondary transition-colors shadow-inner"
                  disabled={isTyping}
                />
                {isTyping ? (
                  <button
                    onClick={handleStop}
                    className="p-3 bg-red-500 rounded-xl text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                    title={language === 'zh-CN' ? '停止生成' : 'Stop'}
                  >
                    <Square size={18} fill="currentColor" />
                  </button>
                ) : (
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="p-3 bg-secondary rounded-xl text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-secondary/20"
                  >
                    <Send size={18} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;