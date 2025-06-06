"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FlashcardView } from "@/components/flashcard-view"
import { Navbar } from "@/components/navbar"

// Sample flashcard data - in a real app, this would be fetched from an API
const sampleFlashcardDecks = {
  deck1: {
    title: "Data Structures Fundamentals",
    cards: [
      {
        id: 1,
        front: "What is an array?",
        back: "A collection of elements identified by index or key, stored in contiguous memory locations.",
        hint: "Think about how elements are stored in memory",
      },
      {
        id: 2,
        front: "What is the time complexity of accessing an element in an array?",
        back: "O(1) - constant time",
        hint: "Consider direct memory access",
      },
      {
        id: 3,
        front: "What is a linked list?",
        back: "A linear data structure where elements are stored in nodes, and each node points to the next node in the sequence.",
        hint: "Think about connections between elements",
      },
      {
        id: 4,
        front: "What is the advantage of a doubly linked list over a singly linked list?",
        back: "A doubly linked list allows traversal in both directions and makes deletion operations easier.",
        hint: "Consider navigation capabilities",
      },
      {
        id: 5,
        front: "What is a stack data structure?",
        back: "A stack is a linear data structure that follows the Last In First Out (LIFO) principle.",
        hint: "Think about a stack of plates",
      },
    ],
  },
  deck2: {
    title: "Core Economics Concepts",
    cards: [
      {
        id: 1,
        front: "What is opportunity cost?",
        back: "The value of the next best alternative foregone when making a decision.",
        hint: "Think about what you give up",
      },
      {
        id: 2,
        front: "What is the law of demand?",
        back: "As the price of a good increases, the quantity demanded decreases, ceteris paribus.",
        hint: "Consider the relationship between price and quantity",
      },
      // More cards would be added here
    ],
  },
  deck3: {
    title: "Psychology Terminology",
    cards: [
      {
        id: 1,
        front: "What is classical conditioning?",
        back: "A learning process that occurs when two stimuli are repeatedly paired; a response that is at first elicited by the second stimulus is eventually elicited by the first stimulus alone.",
        hint: "Think about Pavlov's dogs",
      },
      {
        id: 2,
        front: "What is cognitive dissonance?",
        back: "The mental discomfort that results from holding two conflicting beliefs, values, or attitudes.",
        hint: "Consider psychological tension from contradictions",
      },
      // More cards would be added here
    ],
  },
}

export default function FlashcardPage({ params }: { params: { courseID: string; deckID: string } }) {
  const router = useRouter()
  const { courseID, deckID } = params
  const [deckData, setDeckData] = useState<any>(null)

  useEffect(() => {
    // In a real app, fetch flashcard data from an API
    // For now, use our sample data
    if (sampleFlashcardDecks[deckID as keyof typeof sampleFlashcardDecks]) {
      setDeckData(sampleFlashcardDecks[deckID as keyof typeof sampleFlashcardDecks])
    } else {
      // If no deck data for this ID, redirect back to course page
      router.push(`/courses/${courseID}`)
    }
  }, [deckID, courseID, router])

  if (!deckData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <Navbar />
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">Loading flashcards...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <FlashcardView title={deckData.title} cards={deckData.cards} courseID={courseID} />
      </div>
    </div>
  )
}
