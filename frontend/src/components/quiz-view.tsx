"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup } from "@/components/ui/radio-group"
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"
import Link from "next/link"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

interface QuizViewProps {
  title: string
  questions: QuizQuestion[]
  onComplete?: (score: number) => void
  courseID: string
}

export function QuizView({ title, questions, onComplete, courseID }: QuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [checkedAnswer, setCheckedAnswer] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: value,
    })
    setCheckedAnswer(false)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setCheckedAnswer(false)
    } else {
      // Calculate score and show results
      const score = calculateScore()
      if (onComplete) onComplete(score)
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setCheckedAnswer(false)
    }
  }

  const handleCheckAnswer = () => {
    setCheckedAnswer(true)
  }

  const calculateScore = () => {
    let correctCount = 0
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++
      }
    })
    return (correctCount / questions.length) * 100
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{title} - Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold mb-4">Your Score: {score.toFixed(0)}%</h2>
            <p className="text-muted-foreground mb-6">
              You answered {Math.round((score / 100) * questions.length)} out of {questions.length} questions correctly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setCurrentQuestionIndex(0)
                  setSelectedAnswers({})
                  setShowResults(false)
                }}
              >
                Retry Quiz
              </Button>
              <Link href={`/courses/${courseID}`}>
                <Button variant="outline">Return to Course</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="flex justify-between items-center mt-2">
          <div className="text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="text-muted-foreground">{Math.round(progress)}% Complete</div>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div className="bg-black h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium">
              {currentQuestionIndex + 1}
            </div>
            <h3 className="text-xl font-medium">{currentQuestion.question}</h3>
          </div>

          <RadioGroup
            value={selectedAnswers[currentQuestion.id] || ""}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion.id] === option
              const isCorrect = checkedAnswer && option === currentQuestion.correctAnswer
              const isWrong = checkedAnswer && isSelected && option !== currentQuestion.correctAnswer

              let optionClassName = "flex items-center rounded-lg border p-4 cursor-pointer transition-colors"

              if (isSelected && !checkedAnswer) {
                optionClassName += " bg-accent"
              } else if (isCorrect) {
                optionClassName += " bg-green-50 border-green-500"
              } else if (isWrong) {
                optionClassName += " bg-red-50 border-red-500"
              }

              return (
                <div
                  key={index}
                  className={optionClassName}
                  onClick={() => !checkedAnswer && handleAnswerSelect(option)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-primary bg-primary text-white" : "border-gray-300"}`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </div>
              )
            })}
          </RadioGroup>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <Button
            variant="outline"
            onClick={handleCheckAnswer}
            disabled={!selectedAnswers[currentQuestion.id] || checkedAnswer}
          >
            <HelpCircle className="mr-2 h-4 w-4" /> Check Answer
          </Button>

          <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestion.id]}>
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}{" "}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
