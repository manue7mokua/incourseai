"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, RotateCcw, HelpCircle } from "lucide-react"
import Link from "next/link"

interface Flashcard {
  id: number
  front: string
  back: string
  hint?: string
}

interface FlashcardViewProps {
  title: string
  cards: Flashcard[]
  courseID: string
}

export function FlashcardView({ title, cards, courseID }: FlashcardViewProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [reviewedCards, setReviewedCards] = useState<Record<number, "easy" | "hard" | null>>({})
  const [showHint, setShowHint] = useState(false)

  const currentCard = cards[currentCardIndex]
  const progress = ((currentCardIndex + 1) / cards.length) * 100

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setFlipped(false)
      setShowHint(false)
    }
  }

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setFlipped(false)
      setShowHint(false)
    }
  }

  const handleFlip = () => {
    setFlipped(!flipped)
  }

  const handleReset = () => {
    setCurrentCardIndex(0)
    setFlipped(false)
    setShowHint(false)
  }

  const handleHint = () => {
    setShowHint(true)
  }

  const markCard = (difficulty: "easy" | "hard") => {
    setReviewedCards({
      ...reviewedCards,
      [currentCard.id]: difficulty,
    })
    handleNext()
  }

  const easyCount = Object.values(reviewedCards).filter((v) => v === "easy").length
  const hardCount = Object.values(reviewedCards).filter((v) => v === "hard").length
  const reviewedCount = Object.keys(reviewedCards).length

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={`/courses/${courseID}`}>
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back to Decks
              </Button>
            </Link>
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              All Cards
            </Button>
            <Button variant="ghost" size="sm">
              Hard Cards
            </Button>
            <Button variant="ghost" size="sm">
              Easy Cards
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-muted-foreground">
            Card {currentCardIndex + 1} of {cards.length}
          </div>
          <div className="text-muted-foreground">
            {reviewedCount} reviewed ({easyCount} easy, {hardCount} hard)
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div className="bg-black h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="border rounded-lg p-12 min-h-[300px] flex items-center justify-center cursor-pointer"
          onClick={handleFlip}
        >
          <div className="text-center">
            <div className="absolute top-4 left-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Front
              </Button>
            </div>
            <h3 className="text-2xl font-medium">{flipped ? currentCard.back : currentCard.front}</h3>
            {showHint && currentCard.hint && !flipped && (
              <div className="mt-6 p-4 bg-muted rounded-md">
                <p className="text-muted-foreground">Hint: {currentCard.hint}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="default" size="lg" onClick={handleFlip} className="px-8">
            Flip Card
          </Button>
        </div>

        {flipped && (
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
              onClick={() => markCard("hard")}
            >
              Hard
            </Button>
            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-50"
              onClick={() => markCard("easy")}
            >
              Easy
            </Button>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentCardIndex === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>

            <Button variant="outline" onClick={handleHint} disabled={!currentCard.hint || showHint}>
              <HelpCircle className="mr-2 h-4 w-4" /> Hint
            </Button>
          </div>

          <Button onClick={handleNext} disabled={currentCardIndex === cards.length - 1}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
