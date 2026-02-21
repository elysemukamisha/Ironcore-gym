import React, { useState, useEffect, useRef } from 'react';
import { Mic, X, Send, StopCircle, MessageSquare, Minimize2 } from 'lucide-react';
import { generateGymResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const VoiceChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi! I'm the IronCore AI assistant. I can help with pricing, hours, and booking. How can I help you today?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
        setIsListening(false);
        setStatusMessage('');
      };

      recognitionRef.current.onerror = (event: any) => {
        if (event.error === 'no-speech') {
          setStatusMessage('No speech detected. Please try again.');
        } else {
          console.error('Speech recognition error', event.error);
          setStatusMessage('Error accessing microphone.');
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      // Stop any current speaking
      synthRef.current.cancel();
      setStatusMessage('');
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start recognition:", err);
        setStatusMessage("Could not start microphone.");
      }
    }
  };

  const speakText = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel(); // Stop previous
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      synthRef.current.speak(utterance);
    }
  };

  const handleUserMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text
    };
    
    // Optimistic update
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    try {
      // Get AI Response
      // Pass the *existing* history (messages) plus the new text
      const responseText = await generateGymResponse(messages, text);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: responseText
      };
      
      setMessages(prev => [...prev, aiMsg]);
      speakText(responseText);
    } catch (error) {
      console.error("Error getting response", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserMessage(inputText);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-gradient-to-r from-iron-red to-iron-redHover hover:from-red-500 hover:to-red-700 text-white px-6 py-4 rounded-full shadow-lg transition-all transform hover:scale-105"
      >
        <span className="text-xl">🎤</span>
        <span className="font-bold">AI Support</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[90vw] md:w-[380px] bg-iron-dark border-2 border-iron-red rounded-xl shadow-2xl flex flex-col max-h-[600px] h-[500px] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-black border-b border-iron-gray">
        <div className="flex items-center gap-2 text-iron-red font-bold text-lg">
          <MessageSquare className="w-5 h-5" />
          <h3>IronCore Assistant</h3>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-iron-light hover:text-white transition-colors"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-iron-dark no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === 'user'
                  ? 'bg-iron-red text-white rounded-br-none'
                  : 'bg-iron-gray text-iron-light rounded-bl-none'
              }`}
            >
              <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-iron-gray text-iron-light rounded-lg p-3 rounded-bl-none flex items-center gap-2">
              <span className="w-2 h-2 bg-iron-red rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-iron-red rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-iron-red rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black border-t border-iron-gray space-y-3">
        {/* Voice Status */}
        <div className="flex flex-col items-center gap-2">
          {statusMessage && (
            <span className="text-xs text-red-400 animate-pulse">{statusMessage}</span>
          )}
          <button
            onClick={toggleListening}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              isListening
                ? 'bg-red-900 text-white animate-pulse border border-red-500'
                : 'bg-iron-gray text-iron-light hover:bg-iron-red hover:text-white'
            }`}
          >
            {isListening ? (
              <>
                <StopCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Listening...</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span className="text-sm font-medium">Tap to Speak</span>
              </>
            )}
          </button>
        </div>

        {/* Text Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 bg-iron-gray text-white border border-iron-gray focus:border-iron-red rounded-lg px-3 py-2 text-sm outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isProcessing}
            className="bg-iron-red text-white p-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
