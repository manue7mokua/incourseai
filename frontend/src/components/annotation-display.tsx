"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Check, Pencil, Trash2 } from "lucide-react"
import type { Annotation } from "./pdf-viewer"

interface AnnotationDisplayProps {
  annotation: Annotation
  zoom: number
  onDelete: () => void
  onEdit: () => void
  isEditing: boolean
  onUpdate: (content: string) => void
}

export function AnnotationDisplay({ annotation, zoom, onDelete, onEdit, isEditing, onUpdate }: AnnotationDisplayProps) {
  const [noteContent, setNoteContent] = useState(annotation.content || "")
  const noteRef = useRef<HTMLDivElement>(null)

  // Update content when annotation changes
  useEffect(() => {
    setNoteContent(annotation.content || "")
  }, [annotation])

  // Handle saving the note
  const handleSave = () => {
    onUpdate(noteContent)
  }

  // Position and style based on annotation type
  const style = {
    position: "absolute" as const,
    top: annotation.position.top * zoom,
    left: annotation.position.left * zoom,
    width: annotation.position.width * zoom,
    height: annotation.position.height * zoom,
    backgroundColor: annotation.type === "highlight" ? annotation.color : "transparent",
    zIndex: annotation.type === "highlight" ? 10 : 20,
  }

  // For highlights, just show the colored overlay
  if (annotation.type === "highlight") {
    return (
      <div style={style} className="annotation-highlight group">
        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 right-0 bg-white rounded-md shadow-md border border-gray-200 p-1 flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onDelete} title="Delete highlight">
            <Trash2 className="h-3 w-3 text-gray-500" />
          </Button>
        </div>
      </div>
    )
  }

  // For notes, show the note icon and popup
  return (
    <>
      {/* Note marker */}
      <div style={style} className="annotation-note cursor-pointer">
        <div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-400 border-2 border-white shadow-md flex items-center justify-center"
          onClick={onEdit}
        >
          <Pencil className="h-3 w-3 text-white" />
        </div>
      </div>

      {/* Note popup when editing */}
      {isEditing && (
        <div
          ref={noteRef}
          className="absolute z-30 bg-white rounded-lg shadow-lg border border-gray-200 p-3 w-64"
          style={{
            top: (annotation.position.top + annotation.position.height + 10) * zoom,
            left: annotation.position.left * zoom,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Note</h4>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleSave} title="Save">
                <Check className="h-3 w-3 text-green-500" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onDelete} title="Delete">
                <Trash2 className="h-3 w-3 text-red-500" />
              </Button>
            </div>
          </div>
          <Textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Add your note here..."
            className="min-h-[100px] text-sm"
            autoFocus
          />
        </div>
      )}
    </>
  )
}
