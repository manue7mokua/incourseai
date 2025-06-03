"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Lightbulb, Send, X } from "lucide-react"
import type { ContextItem } from "./pdf-viewer"

interface ChatPanelProps {
  activeTab: "chat" | "suggestions"
  setActiveTab: (tab: "chat" | "suggestions") => void
  contextItems: ContextItem[]
  selectedContextItem: ContextItem | null
  onRemoveContextItem: (id: string) => void
}

export function ChatPanel({
  activeTab,
  setActiveTab,
  contextItems,
  selectedContextItem,
  onRemoveContextItem,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string; timestamp: Date }[]>([
    {
      role: "assistant",
      content: "Hi there! I'm your AI learning assistant. How can I help you with this document?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestions = [
    "Summarize this document for me",
    "What are the key points in this document?",
    "Explain the concepts in simpler terms",
    "What are the main arguments presented?",
    "Find contradictions in this text",
    "How does this relate to [topic]?",
    "Generate questions about this content",
    "Compare this with standard practices",
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const newMessages = [
      ...messages,
      {
        role: "user" as const,
        content: inputValue,
        timestamp: new Date(),
      },
    ]

    setMessages(newMessages)
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `I'll help you with "${inputValue}". This is a simulated response.`,
          timestamp: new Date(),
        },
      ])
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    setActiveTab("chat")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="w-[30vw] bg-white border border-gray-200 flex flex-col m-10 rounded-xl overflow-hidden shadow-sm">
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "chat" | "suggestions")}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-none border-b">
          <TabsTrigger value="chat" className="flex items-center gap-2 data-[state=active]:bg-white">
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2 data-[state=active]:bg-white">
            <Lightbulb className="h-4 w-4" />
            Suggestions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.role === "assistant" ? "pr-8" : "pl-8"}`}>
                <div
                  className={`p-3 rounded-lg ${
                    message.role === "assistant"
                      ? "bg-gray-100 rounded-tr-none"
                      : "bg-blue-500 text-white rounded-tl-none ml-auto"
                  }`}
                >
                  {message.content}
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${message.role === "assistant" ? "" : "text-right"}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Context item display */}
          {selectedContextItem && (
            <div className="px-4 pt-2">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 pr-8 relative">
                <div className="text-xs text-blue-600 font-medium mb-1">From page {selectedContextItem.pageNumber}</div>
                <p className="text-sm text-gray-700 line-clamp-2">{selectedContextItem.text}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 absolute top-1 right-1"
                  onClick={() => onRemoveContextItem(selectedContextItem.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Ask a question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="suggestions" className="flex-1 p-4 m-0 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Try asking about:</h3>
          <div className="grid gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto py-3 px-4 text-left"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
