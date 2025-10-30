import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chat } from '@google/genai';
import { Message, Sender } from './types';
import { initChat, sendMessageStream } from './services/geminiService';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-message',
      text: "Assalam-o-Alaikum! I'm Nadia, your creative assistant from MindVibe Works. How may I help you today?",
      sender: Sender.BOT,
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    try {
      const chatInstance = initChat();
      setChat(chatInstance);
    } catch (e) {
      if (e instanceof Error) {
        setError(`Failed to initialize AI service: ${e.message}. Please check your API key.`);
      } else {
        setError("An unknown error occurred during initialization.");
      }
    }
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!chat || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: Sender.USER,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    const botMessageId = (Date.now() + 1).toString();
    const initialBotMessage: Message = {
      id: botMessageId,
      text: '',
      sender: Sender.BOT,
    };
    setMessages(prev => [...prev, initialBotMessage]);

    try {
      await sendMessageStream(chat, text, (chunk) => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botMessageId ? { ...msg, text: msg.text + chunk } : msg
          )
        );
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to get response: ${errorMessage}`);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMessageId ? { ...msg, text: `Sorry, something went wrong. Please try again. \n\n*Error: ${errorMessage}*` } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [chat, isLoading]);


  return (
    <div className="flex flex-col h-screen bg-slate-900 text-gray-100 font-sans">
      <header className="bg-slate-800/50 backdrop-blur-sm shadow-lg p-4 z-10 border-b border-slate-700">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <img
            src="https://drive.google.com/uc?export=view&id=958b7617-50c9-49ea-866d-7cdd425a5296"
            alt="Nadia, MindVibe Assistant"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold text-white">MindVibe Business Assistant</h1>
            <p className="text-sm text-indigo-300">Powered by MindVibe Works</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && messages[messages.length-1].sender === Sender.USER && (
             <div className="flex items-start space-x-4">
               <img
                  src="https://drive.google.com/uc?export=view&id=958b7617-50c9-49ea-866d-7cdd425a5296"
                  alt="Nadia is typing..."
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
               <div className="bg-gray-700 rounded-lg p-3 mt-1 flex items-center space-x-2">
                 <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                 <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                 <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-slate-800/70 backdrop-blur-sm p-4 border-t border-slate-700">
        <div className="max-w-4xl mx-auto">
          {error && <p className="text-red-400 text-sm mb-2 text-center">{error}</p>}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  );
};

export default App;