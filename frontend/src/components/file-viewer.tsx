"use client"

import type React from "react"

import { useCallback, useState, useEffect, useRef } from "react"
import { useResizeObserver } from "@wojtekmaj/react-hooks"
import { pdfjs, Document, Page } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

import type { PDFDocumentProxy } from "pdfjs-dist"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ZoomIn, ZoomOut, Download, FileText, Loader2 } from "lucide-react"
import { AnnotationPopup } from "./annotation-popup"
import { AnnotationDisplay } from "./annotation-display"
import { nanoid } from "@/lib/utils"

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString()

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
}

const resizeObserverOptions = {}
const maxWidth = 800

type PDFFile = string | File | null

export type Annotation = {
  id: string
  pageNumber: number
  type: "highlight" | "note"
  content?: string
  position: {
    top: number
    left: number
    width: number
    height: number
  }
  color: string
  createdAt: Date
}

export default function PDFViewer({ fileID }: { fileID: string }) {
  const [file] = useState<PDFFile>("/object.pdf")
  const [numPages, setNumPages] = useState<number>()
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageInput, setPageInput] = useState("1")
  const [zoom, setZoom] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const textLayerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  // Annotation states
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [selection, setSelection] = useState<{
    range: Range | null
    rect: DOMRect | null
    pageNumber: number | null
  }>({ range: null, rect: null, pageNumber: null })
  const [showAnnotationPopup, setShowAnnotationPopup] = useState(false)
  const [editingAnnotation, setEditingAnnotation] = useState<Annotation | null>(null)

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries
    if (entry) {
      setContainerWidth(entry.contentRect.width)
    }
  }, [])

  useResizeObserver(containerRef, resizeObserverOptions, onResize)

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages)
    setIsLoading(false)
  }

  function onDocumentLoadError(): void {
    setIsLoading(false)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.3))
  }

  const handleDownload = () => {
    if (file) {
      const link = document.createElement("a")
      link.href = typeof file === "string" ? file : URL.createObjectURL(file)
      link.download = typeof file === "string" ? "document.pdf" : file.name
      link.click()
    }
  }

  const resetZoom = () => {
    setZoom(1)
  }

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPageInput(value)
  }

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const pageNum = Number.parseInt(pageInput)
    if (pageNum >= 1 && pageNum <= (numPages || 1)) {
      navigateToPage(pageNum)
    } else {
      setPageInput(currentPage.toString())
    }
  }

  const navigateToPage = (pageNum: number) => {
    const pageElement = pageRefs.current[pageNum]
    if (pageElement && scrollContainerRef.current) {
      pageElement.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Handle text selection for annotations
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      const selection = window.getSelection()

      if (!selection || selection.isCollapsed) {
        // No text selected, hide popup after a small delay (to allow clicking popup)
        setTimeout(() => {
          if (!document.querySelector(".annotation-popup:hover")) {
            setShowAnnotationPopup(false)
          }
        }, 100)
        return
      }

      // Find which page the selection is on
      let pageNumber = null
      let textLayerElement = null

      for (let i = 1; i <= (numPages || 0); i++) {
        const textLayer = textLayerRefs.current[i]
        if (textLayer && textLayer.contains(selection.anchorNode)) {
          pageNumber = i
          textLayerElement = textLayer
          break
        }
      }

      if (pageNumber && textLayerElement) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()

        // Only show popup if we have a valid selection with size
        if (rect.width > 0 && rect.height > 0) {
          setSelection({
            range,
            rect,
            pageNumber,
          })
          setShowAnnotationPopup(true)
        }
      }
    }

    document.addEventListener("mouseup", handleMouseUp)
    return () => document.removeEventListener("mouseup", handleMouseUp)
  }, [numPages])

  // Create a highlight annotation
  const handleHighlight = (color = "rgba(255, 255, 0, 0.3)") => {
    if (!selection.range || !selection.rect || !selection.pageNumber) return

    const pageElement = pageRefs.current[selection.pageNumber]
    if (!pageElement) return

    const pageRect = pageElement.getBoundingClientRect()

    // Calculate position relative to the page
    const position = {
      top: selection.rect.top - pageRect.top,
      left: selection.rect.left - pageRect.left,
      width: selection.rect.width,
      height: selection.rect.height,
    }

    // Create new annotation
    const newAnnotation: Annotation = {
      id: nanoid(),
      pageNumber: selection.pageNumber,
      type: "highlight",
      position,
      color,
      createdAt: new Date(),
    }

    setAnnotations([...annotations, newAnnotation])
    setShowAnnotationPopup(false)
    window.getSelection()?.removeAllRanges()
  }

  // Create a note annotation
  const handleAddNote = () => {
    if (!selection.range || !selection.rect || !selection.pageNumber) return

    const pageElement = pageRefs.current[selection.pageNumber]
    if (!pageElement) return

    const pageRect = pageElement.getBoundingClientRect()

    // Calculate position relative to the page
    const position = {
      top: selection.rect.top - pageRect.top,
      left: selection.rect.left - pageRect.left,
      width: selection.rect.width,
      height: selection.rect.height,
    }

    // Create new annotation
    const newAnnotation: Annotation = {
      id: nanoid(),
      pageNumber: selection.pageNumber,
      type: "note",
      content: "",
      position,
      color: "rgba(255, 217, 102, 0.7)",
      createdAt: new Date(),
    }

    setAnnotations([...annotations, newAnnotation])
    setEditingAnnotation(newAnnotation)
    setShowAnnotationPopup(false)
    window.getSelection()?.removeAllRanges()
  }

  // Update annotation content
  const updateAnnotation = (id: string, content: string) => {
    setAnnotations(annotations.map((ann) => (ann.id === id ? { ...ann, content } : ann)))
    setEditingAnnotation(null)
  }

  // Delete annotation
  const deleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter((ann) => ann.id !== id))
    if (editingAnnotation?.id === id) {
      setEditingAnnotation(null)
    }
  }

  // Track current page based on scroll position
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer || !numPages) return

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop
      const containerHeight = scrollContainer.clientHeight

      // Find which page is most visible
      let mostVisiblePage = 1
      let maxVisibleArea = 0

      for (let i = 1; i <= numPages; i++) {
        const pageElement = pageRefs.current[i]
        if (pageElement) {
          const rect = pageElement.getBoundingClientRect()
          const containerRect = scrollContainer.getBoundingClientRect()

          const visibleTop = Math.max(rect.top, containerRect.top)
          const visibleBottom = Math.min(rect.bottom, containerRect.bottom)
          const visibleArea = Math.max(0, visibleBottom - visibleTop)

          if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea
            mostVisiblePage = i
          }
        }
      }

      if (mostVisiblePage !== currentPage) {
        setCurrentPage(mostVisiblePage)
        setPageInput(mostVisiblePage.toString())
      }
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [numPages, currentPage])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="max-w-6xl mx-auto flex-1 flex flex-col">
        {/* Header */}
        <Card className="my-4 flex-shrink-0">
          <CardContent className="py-4">
            {/* Controls */}
            {numPages && (
              <div className="flex flex-wrap items-center gap-4 justify-center">
                {/* Page Navigation */}
                <form
                  onSubmit={handlePageInputSubmit}
                  className="flex items-center gap-2 bg-white rounded-lg border p-2"
                >
                  <span className="text-sm text-gray-600">Page</span>
                  <Input
                    type="number"
                    min="1"
                    max={numPages}
                    value={pageInput}
                    onChange={handlePageInputChange}
                    className="w-16 h-8 text-center text-sm"
                  />
                  <span className="text-sm text-gray-600">of {numPages}</span>
                </form>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-white rounded-lg border p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.3}
                    className="h-8 w-8 p-0"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <button
                    onClick={resetZoom}
                    className="px-3 py-1 text-sm font-medium min-w-[60px] hover:bg-gray-100 rounded transition-colors"
                  >
                    {Math.round(zoom * 100)}%
                  </button>
                  <Button variant="ghost" size="sm" onClick={handleZoomIn} disabled={zoom >= 3} className="h-8 w-8 p-0">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>

                {/* Download */}
                <Button variant="outline" size="sm" onClick={handleDownload} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* PDF Document */}
        <Card className="flex-1 overflow-hidden py-0 justify-between">
          <CardContent className="p-0 h-[85vh]">
            <div ref={scrollContainerRef} className="h-full overflow-y-auto bg-gray-100 flex flex-col items-center">
              <div ref={setContainerRef} className="w-full flex flex-col items-center py-4">
                {isLoading && (
                  <div className="flex items-center gap-2 text-gray-600 py-8">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading PDF...
                  </div>
                )}

                {file ? (
                  <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    options={options}
                    loading={
                      <div className="flex items-center gap-2 text-gray-600 py-8">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading document...
                      </div>
                    }
                  >
                    {numPages &&
                      Array.from({ length: numPages }, (_, index) => {
                        const pageNumber = index + 1
                        return (
                          <div
                            key={`page_${pageNumber}`}
                            ref={(el) => {
                              pageRefs.current[pageNumber] = el
                            }}
                            className="mb-4 shadow-lg bg-white relative"
                          >
                            <Page
                              pageNumber={pageNumber}
                              width={containerWidth ? Math.min(containerWidth - 64, maxWidth) * zoom : maxWidth * zoom}
                              loading={
                                <div className="flex items-center justify-center h-96 bg-gray-50">
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Loading page {pageNumber}...
                                  </div>
                                </div>
                              }
                              onLoadSuccess={(page) => {
                                // Get reference to the text layer after it's rendered
                                setTimeout(() => {
                                  const textLayer = pageRefs.current[pageNumber]?.querySelector(
                                    ".react-pdf__Page__textContent",
                                  )
                                  if (textLayer) {
                                    textLayerRefs.current[pageNumber] = textLayer as HTMLDivElement
                                  }
                                }, 100)
                              }}
                            />

                            {/* Render annotations for this page */}
                            {annotations
                              .filter((ann) => ann.pageNumber === pageNumber)
                              .map((annotation) => (
                                <AnnotationDisplay
                                  key={annotation.id}
                                  annotation={annotation}
                                  zoom={zoom}
                                  onDelete={() => deleteAnnotation(annotation.id)}
                                  onEdit={() => setEditingAnnotation(annotation)}
                                  isEditing={editingAnnotation?.id === annotation.id}
                                  onUpdate={(content) => updateAnnotation(annotation.id, content)}
                                />
                              ))}
                          </div>
                        )
                      })}
                  </Document>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">No PDF loaded</p>
                    <p className="text-gray-400 text-sm">PDF document will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Annotation Popup */}
      {showAnnotationPopup && selection.rect && (
        <AnnotationPopup
          rect={selection.rect}
          onHighlight={handleHighlight}
          onAddNote={handleAddNote}
          onClose={() => setShowAnnotationPopup(false)}
        />
      )}
    </div>
  )
}
