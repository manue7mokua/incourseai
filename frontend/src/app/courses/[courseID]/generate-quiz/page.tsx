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

export default function GenerateQuizPage({ params }: { params: { courseID: string } }) {
  const router = useRouter()
  const courseID = params.courseID
  const [isGenerating, setIsGenerating] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [questionCount, setQuestionCount] = useState(5)
  const [difficulty, setDifficulty] = useState("medium")

  const handleGenerate = () => {
    setIsGenerating(true)

    // In a real app, this would call an API to generate a quiz
    // For now, simulate a delay and redirect to the quiz page
    setTimeout(() => {
      setIsGenerating(false)
      router.push(`/courses/${courseID}/quiz`)
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
            <CardTitle className="text-2xl">Generate Quiz</CardTitle>
            <CardDescription>Create an AI-generated quiz based on your course materials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Quiz Title</Label>
              <Input
                id="title"
                placeholder="e.g., Data Structures Midterm Review"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Source Content (optional)</Label>
              <Textarea
                id="content"
                placeholder="Paste lecture notes, textbook excerpts, or other content to base the quiz on..."
                className="min-h-[150px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Leave blank to generate questions based on the course materials.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="question-count">Number of Questions: {questionCount}</Label>
              <Slider
                id="question-count"
                defaultValue={[5]}
                min={3}
                max={15}
                step={1}
                onValueChange={(value) => setQuestionCount(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>3</span>
                <span>15</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleGenerate} disabled={isGenerating || !title}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Quiz...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Generate Quiz
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
