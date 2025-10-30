import React from 'react';
import { Message, Sender } from '../types';
import UserIcon from './icons/UserIcon';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  const wrapperClasses = isUser ? 'flex justify-end' : 'flex justify-start';
  const messageClasses = isUser
    ? 'bg-indigo-600 text-white rounded-br-none'
    : 'bg-slate-700 text-gray-200 rounded-bl-none';

  const Avatar = () => {
    if (isUser) {
      return (
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-indigo-500 ml-4">
          <UserIcon className="w-6 h-6 text-white" />
        </div>
      );
    }
    return (
      <img
        src="https://drive.google.com/uc?export=view&id=958b7617-50c9-49ea-866d-7cdd425a5296"
        alt="Nadia, MindVibe Assistant"
        className="w-10 h-10 rounded-full flex-shrink-0 mr-4"
      />
    );
  };

  return (
    <div className={`${wrapperClasses} items-start`}>
      {!isUser && <Avatar />}
      <div className="flex flex-col">
        <div
          className={`max-w-lg rounded-lg p-4 shadow-md ${messageClasses}`}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>
      </div>
      {isUser && <Avatar />}
    </div>
  );
};

export default ChatMessage;