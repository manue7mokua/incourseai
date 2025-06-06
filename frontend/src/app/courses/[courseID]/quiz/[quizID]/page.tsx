"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { QuizView } from "@/components/quiz-view"
import { Navbar } from "@/components/navbar"

// Sample quiz data - in a real app, this would be fetched from an API
const sampleQuizzes = {
  cs101: {
    title: "Data Structures: Arrays and Linked Lists",
    questions: [
      {
        id: 1,
        question: "Which of the following data structures allows for constant-time access to elements by index?",
        options: ["Linked List", "Array", "Binary Search Tree", "Hash Table"],
        correctAnswer: "Array",
      },
      {
        id: 2,
        question: "What is the time complexity of inserting an element at the beginning of a linked list?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: "O(1)",
      },
      {
        id: 3,
        question: "What is the space complexity of an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        correctAnswer: "O(n)",
      },
      {
        id: 4,
        question: "Which data structure is more efficient for frequent insertions and deletions?",
        options: ["Array", "Linked List", "Both are equally efficient", "Depends on the implementation"],
        correctAnswer: "Linked List",
      },
      {
        id: 5,
        question: "What is a disadvantage of using linked lists?",
        options: [
          "Random access is not allowed",
          "Extra memory space for pointers",
          "Difficult to reverse traverse",
          "All of the above",
        ],
        correctAnswer: "All of the above",
      },
    ],
  },
  econ201: {
    title: "Macroeconomics Fundamentals",
    questions: [
      {
        id: 1,
        question: "What does GDP stand for?",
        options: [
          "Gross Domestic Product",
          "General Domestic Production",
          "Global Development Process",
          "Government Domestic Policy",
        ],
        correctAnswer: "Gross Domestic Product",
      },
      {
        id: 2,
        question: "Which of the following is NOT a component of aggregate demand?",
        options: ["Consumption", "Investment", "Government Spending", "Wages"],
        correctAnswer: "Wages",
      },
      // More questions would be added here
    ],
  },
  psych110: {
    title: "Introduction to Psychology",
    questions: [
      {
        id: 1,
        question: "Who is considered the father of psychoanalysis?",
        options: ["B.F. Skinner", "Carl Jung", "Sigmund Freud", "Ivan Pavlov"],
        correctAnswer: "Sigmund Freud",
      },
      {
        id: 2,
        question: "Which psychological perspective emphasizes observable behavior?",
        options: ["Psychoanalytic", "Humanistic", "Cognitive", "Behaviorist"],
        correctAnswer: "Behaviorist",
      },
      // More questions would be added here
    ],
  },
}

export default function QuizPage({ params }: { params: { courseID: string } }) {
  const router = useRouter()
  const courseID = "cs101"
  const [quizData, setQuizData] = useState<any>(null)

  useEffect(() => {
    // In a real app, fetch quiz data from an API
    // For now, use our sample data
    if (sampleQuizzes[courseID as keyof typeof sampleQuizzes]) {
      setQuizData(sampleQuizzes[courseID as keyof typeof sampleQuizzes])
    } else {
      // If no quiz data for this course, redirect back to course page
      router.push(`/courses/${courseID}`)
    }
  }, [courseID, router])

  const handleQuizComplete = (score: number) => {
    console.log(`Quiz completed with score: ${score}%`)
    // In a real app, save this score to the database
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <Navbar />
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">Loading quiz...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <QuizView
          title={quizData.title}
          questions={quizData.questions}
          onComplete={handleQuizComplete}
          courseID={courseID}
        />
      </div>
    </div>
  )
}
