"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, MessageSquare, Send, Sparkles, X } from "lucide-react"

interface AIChatPanelProps {
  isOpen: boolean
  onClose: () => void
  courseId: string
}

export function AIChatPanel({ isOpen, onClose, courseId }: AIChatPanelProps) {
  const [messages, setMessages] = useState<
    Array<{
      id: string
      role: "user" | "assistant"
      content: string
      timestamp: Date
    }>
  >([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I'm your AI learning assistant. How can I help you with this course?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: `I'll help you understand that concept from ${courseId.toUpperCase()}. Let me explain it in a simple way...`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed top-0 right-0 w-[400px] h-full bg-background border-l shadow-lg flex flex-col z-40">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI Learning Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2 mb-0">
          <TabsTrigger value="chat" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex-1">
            <Lightbulb className="h-4 w-4 mr-2" />
            Suggestions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Ask a question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="flex-1 overflow-y-auto p-4 space-y-4 m-0">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Suggested Questions</h4>
            {[
              "Can you explain the key concepts from the last lecture?",
              "What are the most important points to remember for the exam?",
              "How does this topic relate to what we learned earlier?",
              "Can you create a quiz to test my understanding?",
            ].map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto py-2"
                onClick={() => {
                  setInputValue(question)
                }}
              >
                {question}
              </Button>
            ))}
          </div>

          <div className="space-y-4 pt-4">
            <h4 className="text-sm font-medium">Learning Tips</h4>
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex gap-2">
                <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm">
                  Try explaining the concepts you're learning in your own words. This technique, known as the Feynman
                  Method, helps identify gaps in your understanding.
                </p>
              </div>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex gap-2">
                <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm">
                  Research shows that spaced repetition is more effective than cramming. Review material at increasing
                  intervals to improve long-term retention.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
