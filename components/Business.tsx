"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, ChevronRight, ChevronUp, Info, AlertCircle, Phone, Mail, Square } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
// SWITCHED TO DIFY SERVICE
import { streamChatResponse, CONNECTION_ERROR_FLAG, stopGeneration } from '@/services/difyService';
import { ChatMessage } from '@/types';
import QRCode from 'react-qr-code';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Business: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInfoExpanded, setIsInfoExpanded] = useState(false); 
  const [qrError, setQrError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMsgText = t('business.initialMsg');
  const quickActions = t('business.quickActions') as string[];

  // Initialize chat
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { id: 'init', role: 'model', text: initialMsgText, timestamp: Date.now() }
      ]);
    }
  }, [initialMsgText]);

  // Auto-expand info on desktop, collapse on mobile initially
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 768) {
            setIsInfoExpanded(true);
        } else {
            setIsInfoExpanded(false);
        }
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isInfoExpanded]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    if (window.innerWidth < 768) {
        setIsInfoExpanded(false);
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    const botMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '', timestamp: Date.now() }]);

    // Call Dify Service
    await streamChatResponse(
      updatedMessages,
      userMsg.text,
      (fullText) => {
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId ? { ...msg, text: fullText } : msg
        ));
      },
      'business'
    );

    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  // 停止生成
  const handleStop = () => {
    stopGeneration();
    setIsTyping(false);
  };

  const renderMessageContent = (msg: ChatMessage) => {
    if (msg.text === CONNECTION_ERROR_FLAG && msg.role === 'model') {
        return (
            <div className="flex flex-col gap-4 min-w-[240px]">
                <div className="flex items-center gap-2 text-red-400 font-bold border-b border-red-500/20 pb-2">
                    <AlertCircle size={20} />
                    <span>{language === 'zh-CN' ? '连接超时' : 'Connection Timeout'}</span>
                </div>
                <p className="text-txt-muted text-sm">
                  {language === 'zh-CN' 
                      ? '看来我的商务助理还在休息。您可以扫描下方二维码或通过电话直接联系我。' 
                      : 'My AI assistant seems to be offline. You can contact me directly via QR code or phone.'}
                </p>
                
                {/* Contact Info Card */}
                <div className="bg-glass/10 rounded-xl p-4 space-y-4">
                    <div className="flex items-center gap-3 text-txt-main">
                        <div className="p-2 bg-green-500/20 text-green-500 rounded-lg"><Phone size={18} /></div>
                        <span className="font-mono text-lg font-bold">153-3714-5797</span>
                    </div>
                    <div className="flex items-center gap-3 text-txt-main">
                        <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"><Mail size={18} /></div>
                        <span className="font-mono text-sm break-all">lsl1113479669@163.com</span>
                    </div>
                    
                    {/* QR Code Placeholder */}
                    <div className="flex flex-col items-center justify-center pt-4 border-t border-glass/10">
                         <div className="bg-white p-3 rounded-xl mb-2 shadow-lg w-full max-w-[160px] overflow-hidden">
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
                                  size={140}
                                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                  viewBox={`0 0 256 256`}
                                />
                              )}
                          </div>
                        <span className="text-xs text-txt-muted font-bold">
                            {language === 'zh-CN' ? '扫码添加微信' : 'Scan to add WeChat'}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    
    // Regular text rendering with Markdown
    return (
      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // 表格样式
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
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{children}</a>
            ),
            // 加粗
            strong: ({ children }) => <strong className="font-bold text-txt-main">{children}</strong>,
            // 标题
            h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-3">{children}</h1>,
            h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-sm font-bold mb-1 mt-2">{children}</h3>,
            // 引用块
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-primary/50 pl-3 my-2 text-txt-muted italic">{children}</blockquote>
            ),
          }}
        >
          {msg.text}
        </ReactMarkdown>
        {/* 流式输出时显示闪烁光标 */}
        {isTyping && messages[messages.length - 1]?.id === msg.id && msg.role === 'model' && (
          <span className="inline-block w-2 h-4 bg-primary/80 ml-0.5 animate-pulse" />
        )}
      </div>
    );
  };

  return (
    <div className="h-full overflow-hidden flex flex-col md:flex-row relative">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Chat Section */}
      <div className="flex-1 flex flex-col h-full relative z-10">
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-glass/10 flex justify-between items-center bg-surface/50 backdrop-blur-md">
              <div>
                  <h2 className="text-xl md:text-2xl font-bold text-txt-main flex items-center gap-2">
                    {t('business.title')} 
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-mono border border-primary/20">BETA</span>
                  </h2>
                  <p className="text-sm text-txt-muted hidden md:block">{t('business.subtitle')}</p>
              </div>
              
              <button 
                onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                className="md:hidden p-2 bg-glass/10 rounded-lg text-txt-main"
              >
                  {isInfoExpanded ? <ChevronUp size={20} /> : <Info size={20} />}
              </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
              {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-gradient-to-br from-secondary to-purple-600' : 'bg-surface border border-glass/10'}`}>
                          {msg.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-primary" />}
                      </div>
                      
                      <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                          msg.role === 'user' 
                          ? 'bg-glass/10 border border-glass/5 text-txt-main rounded-tr-none' 
                          : 'bg-surface border border-glass/10 text-txt-main rounded-tl-none'
                      }`}>
                          {renderMessageContent(msg)}
                      </div>
                  </motion.div>
              ))}
              
              {isTyping && (
                  <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface border border-glass/10 flex items-center justify-center flex-shrink-0">
                          <Bot size={20} className="text-primary" />
                      </div>
                      <div className="bg-surface border border-glass/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-1">
                          <span className="w-2 h-2 bg-txt-muted rounded-full animate-bounce" />
                          <span className="w-2 h-2 bg-txt-muted rounded-full animate-bounce delay-100" />
                          <span className="w-2 h-2 bg-txt-muted rounded-full animate-bounce delay-200" />
                      </div>
                  </div>
              )}
              <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (Horizontal Scroll) */}
          {!isTyping && (
            <div className="px-4 pb-2">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {quickActions.map((action, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSend(action)}
                            className="whitespace-nowrap px-4 py-2 bg-glass/5 hover:bg-glass/10 border border-glass/10 rounded-full text-sm text-txt-muted hover:text-primary transition-colors"
                        >
                            {action}
                        </button>
                    ))}
                </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-surface/50 backdrop-blur-md border-t border-glass/10">
              <div className="relative max-w-4xl mx-auto flex items-center gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('business.inputPlaceholder')}
                    className="flex-1 bg-surface border border-glass/10 rounded-xl px-5 py-4 text-txt-main placeholder-txt-muted focus:outline-none focus:border-primary transition-colors shadow-inner"
                    disabled={isTyping}
                  />
                  {isTyping ? (
                    <button
                      onClick={handleStop}
                      className="p-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 hover:scale-105"
                      title={language === 'zh-CN' ? '停止生成' : 'Stop'}
                    >
                      <Square size={20} fill="currentColor" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSend(input)}
                      disabled={!input.trim()}
                      className="p-4 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20 hover:scale-105"
                    >
                      <Send size={20} />
                    </button>
                  )}
              </div>
          </div>
      </div>

      {/* Side Info Panel */}
      <AnimatePresence>
          {isInfoExpanded && (
              <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: window.innerWidth < 768 ? '100%' : '320px', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="bg-surface/95 backdrop-blur-xl border-l border-glass/10 absolute md:relative inset-0 md:inset-auto z-20 md:z-auto overflow-hidden flex flex-col"
              >
                  <div className="p-6 border-b border-glass/10 flex justify-between items-center">
                      <h3 className="font-bold text-lg text-txt-main">{t('business.aiTitle')}</h3>
                      <button onClick={() => setIsInfoExpanded(false)} className="md:hidden p-2 text-txt-muted"><ChevronRight /></button>
                  </div>
                  
                  <div className="p-6 space-y-8 overflow-y-auto flex-1">
                      {/* Avatar */}
                      <div className="flex flex-col items-center">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1 shadow-xl mb-4 relative group">
                              <img src="/ai_agent.jpg" alt="AI Agent" className="w-full h-full rounded-full object-cover" />
                              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-surface rounded-full"></div>
                          </div>
                          <h4 className="font-bold text-txt-main">Alex AI</h4>
                          <p className="text-sm text-txt-muted">Business Agent</p>
                      </div>
                      
                      <div className="bg-glass/5 p-4 rounded-xl border border-glass/10">
                          <p className="text-sm text-txt-muted leading-relaxed">
                              {t('business.aiDesc')}
                          </p>
                      </div>

                      <div className="space-y-4">
                          <h4 className="font-bold text-sm text-txt-muted uppercase tracking-wider">Contact Info</h4>
                          <div className="space-y-3">
                              <a href="mailto:lsl1113479669@163.com" className="flex items-center gap-3 p-3 bg-glass/5 hover:bg-glass/10 rounded-xl transition-colors">
                                  <Mail size={18} className="text-primary" />
                                  <span className="text-sm text-txt-main break-all">lsl1113479669@163.com</span>
                              </a>
                              <a href="tel:15337145797" className="flex items-center gap-3 p-3 bg-glass/5 hover:bg-glass/10 rounded-xl transition-colors">
                                  <Phone size={18} className="text-secondary" />
                                  <span className="text-sm text-txt-main">153-3714-5797</span>
                              </a>
                          </div>
                      </div>

                       {/* QR Code in Sidebar */}
                       <div className="flex flex-col items-center pt-4 border-t border-glass/10">
                            <div className="bg-white p-2 rounded-lg mb-2 w-full max-w-[140px] overflow-hidden">
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
                                      size={100}
                                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                      viewBox={`0 0 256 256`}
                                    />
                                )}
                            </div>
                            <span className="text-xs text-txt-muted text-center">WeChat / 微信</span>
                      </div>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default Business;