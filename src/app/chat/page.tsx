
'use client'

import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Moon, Sun, Send } from 'lucide-react'

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I assist you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchBotResponse = async (userInput: string) => {
    try {
      const response = await axios.post('/api/response', {
        search: userInput,
      });
      return response.data.responseText;
    } catch (error) {
      console.error("Error fetching bot response:", error);
      return "Sorry, I couldn't fetch a response. Please try again.";
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      // Add user's message
      setMessages([...messages, { id: messages.length + 1, text: input, sender: 'user' }]);
      const userMessage = input;
      setInput('');

      // Fetch and display bot response
      const botResponse = await fetchBotResponse(userMessage);
      setMessages((prev) => [...prev, { id: prev.length + 1, text: botResponse, sender: 'bot' }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">M.B.E. Society&apos;s Chat Assistant</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>
      </header>
      <div className="flex-1 overflow-y-auto p-6 bg-gray-100 dark:bg-gray-700">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 shadow-md">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 dark:text-white"
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}