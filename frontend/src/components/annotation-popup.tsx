"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Highlighter, Pencil, X, MessageCircle } from "lucide-react"

interface AnnotationPopupProps {
  rect: DOMRect
  onHighlight: (color?: string) => void
  onAddNote: () => void
  onAddToContext: () => void
  onClose: () => void
}

export function AnnotationPopup({ rect, onHighlight, onAddNote, onAddToContext, onClose }: AnnotationPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  // Position the popup near the selection
  useEffect(() => {
    if (!popupRef.current) return

    const popup = popupRef.current
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft

    // Position above the selection
    let top = rect.top + scrollTop - popup.offsetHeight - 10
    const left = rect.left + scrollLeft + rect.width / 2 - popup.offsetWidth / 2

    // If popup would be off the top of the screen, position it below the selection
    if (top < scrollTop) {
      top = rect.bottom + scrollTop + 10
    }

    // Keep popup within viewport horizontally
    const rightEdge = left + popup.offsetWidth
    const viewportWidth = window.innerWidth

    let adjustedLeft = left
    if (adjustedLeft < 10) {
      adjustedLeft = 10
    } else if (rightEdge > viewportWidth - 10) {
      adjustedLeft = viewportWidth - popup.offsetWidth - 10
    }

    popup.style.top = `${top}px`
    popup.style.left = `${adjustedLeft}px`
  }, [rect])

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <div
      ref={popupRef}
      className="annotation-popup fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex items-center gap-2"
      style={{ position: "absolute" }}
    >
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-yellow-100"
        onClick={() => onHighlight("rgba(255, 255, 0, 0.3)")}
        title="Highlight"
      >
        <Highlighter className="h-4 w-4 text-yellow-500" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-blue-100"
        onClick={() => onHighlight("rgba(135, 206, 250, 0.3)")}
        title="Blue highlight"
      >
        <Highlighter className="h-4 w-4 text-blue-500" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-green-100"
        onClick={() => onHighlight("rgba(144, 238, 144, 0.3)")}
        title="Green highlight"
      >
        <Highlighter className="h-4 w-4 text-green-500" />
      </Button>

      <div className="w-px h-6 bg-gray-200 mx-1"></div>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-orange-100"
        onClick={onAddNote}
        title="Add note"
      >
        <Pencil className="h-4 w-4 text-orange-500" />
      </Button>

      <div className="w-px h-6 bg-gray-200 mx-1"></div>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-purple-100"
        onClick={onAddToContext}
        title="Ask AI about this"
      >
        <MessageCircle className="h-4 w-4 text-purple-600" />
      </Button>

      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100" onClick={onClose} title="Close">
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
