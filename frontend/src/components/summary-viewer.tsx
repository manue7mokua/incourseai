"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, Highlighter } from "lucide-react"

interface SummaryViewerProps {
  title: string
  content: string
}

export function SummaryViewer({ title, content }: SummaryViewerProps) {
  const [copied, setCopied] = useState(false)
  const [highlightMode, setHighlightMode] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleHighlightMode = () => {
    setHighlightMode(!highlightMode)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-lg">{title}</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleHighlightMode}
            className={highlightMode ? "bg-yellow-100 text-yellow-700" : ""}
          >
            <Highlighter className="h-4 w-4 mr-2" />
            {highlightMode ? "Exit Highlight" : "Highlight"}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
      <div className={`prose max-w-none text-sm ${highlightMode ? "cursor-text bg-yellow-50" : ""}`}>
        {content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}
