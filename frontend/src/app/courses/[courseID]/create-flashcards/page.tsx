"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Navbar } from "@/components/navbar"
import { Brain, ChevronLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function CreateFlashcardsPage({ params }: { params: { courseID: string } }) {
  const router = useRouter()
  const courseID = params.courseID
  const [isGenerating, setIsGenerating] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [cardCount, setCardCount] = useState(10)
  const [cardType, setCardType] = useState("term-definition")

  const handleGenerate = () => {
    setIsGenerating(true)

    // In a real app, this would call an API to generate flashcards
    // For now, simulate a delay and redirect to the flashcards page
    setTimeout(() => {
      setIsGenerating(false)
      router.push(`/courses/${courseID}/flashcards/deck1`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Navbar />
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="mb-6">
          <Link href={`/courses/${courseID}`}>
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Course
            </Button>
          </Link>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Create Flashcard Deck</CardTitle>
            <CardDescription>Generate AI-powered flashcards to help you study effectively</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Deck Title</Label>
              <Input
                id="title"
                placeholder="e.g., Key Terminology for Midterm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Source Content (optional)</Label>
              <Textarea
                id="content"
                placeholder="Paste lecture notes, textbook excerpts, or other content to extract flashcards from..."
                className="min-h-[150px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Leave blank to generate flashcards based on the course materials.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-count">Number of Cards: {cardCount}</Label>
              <Slider
                id="card-count"
                defaultValue={[10]}
                min={5}
                max={30}
                step={1}
                onValueChange={(value) => setCardCount(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5</span>
                <span>30</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-type">Card Type</Label>
              <Select value={cardType} onValueChange={setCardType}>
                <SelectTrigger id="card-type">
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="term-definition">Term & Definition</SelectItem>
                  <SelectItem value="question-answer">Question & Answer</SelectItem>
                  <SelectItem value="concept-example">Concept & Example</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleGenerate} disabled={isGenerating || !title}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Flashcards...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Create Flashcard Deck
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
