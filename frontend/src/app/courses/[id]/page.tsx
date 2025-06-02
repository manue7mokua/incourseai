import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  ChevronLeft,
  Clock,
  Download,
  FileText,
  Layers,
  Play,
  Plus,
  ThumbsUp,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SummaryViewer } from "@/components/summary-viewer"

export default async function CoursePage({ params }: { params: { id: string } }) {
  const courseID = await params.id

  // Sample course data - in a real app, fetch this based on params.id
  const course = {
    id: courseID,
    name:
      courseID === "cs101"
        ? "CS 101: Introduction to Computer Science"
        : courseID === "econ201"
          ? "ECON 201: Macroeconomics"
          : "PSYCH 110: Introduction to Psychology",
    instructor: courseID === "cs101" ? "Dr. Smith" : courseID === "econ201" ? "Prof. Johnson" : "Dr. Williams",
    progress: courseID === "cs101" ? 65 : courseID === "econ201" ? 42 : 78,
    description:
      "This course provides a comprehensive introduction to the fundamental concepts and principles of the subject.",
    nextDeadline: "Problem Set 3 due in 2 days",
    color: courseID === "cs101" ? "bg-blue-500" : courseID === "econ201" ? "bg-green-500" : "bg-purple-500",
  }

  // Sample lecture data
  const lectures = [
    {
      id: "lecture1",
      title: "Introduction to the Course",
      date: "Sep 5, 2023",
      duration: "50 min",
      hasNotes: true,
      hasSummary: true,
      hasQuiz: true,
    },
    {
      id: "lecture2",
      title: "Core Concepts and Terminology",
      date: "Sep 7, 2023",
      duration: "55 min",
      hasNotes: true,
      hasSummary: true,
      hasQuiz: true,
    },
    {
      id: "lecture3",
      title: "Practical Applications",
      date: "Sep 12, 2023",
      duration: "50 min",
      hasNotes: true,
      hasSummary: true,
      hasQuiz: false,
    },
    {
      id: "lecture4",
      title: "Advanced Topics",
      date: "Sep 14, 2023",
      duration: "60 min",
      hasNotes: true,
      hasSummary: false,
      hasQuiz: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Navbar />
      <div className="container mx-auto py-6 px-4 md:px-6">
        {/* Course Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <Badge className={course.color}>{course.id.toUpperCase()}</Badge>
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{course.name}</h1>
              <p className="text-muted-foreground">
                {course.instructor} • {course.nextDeadline}
              </p>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 gap-6">
          <Tabs defaultValue="summaries" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="summaries">Summaries</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="zen">Zen Mode</TabsTrigger>
            </TabsList>

            <TabsContent value="summaries">
              <div className="grid gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Course Overview</CardTitle>
                    <CardDescription>AI-generated summary of the entire course</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SummaryViewer
                      title="Course Overview"
                      content={`This course covers the fundamental principles and concepts of ${course.name.split(":")[1].trim()}. Throughout the semester, we will explore theoretical foundations and practical applications, with a focus on developing a strong understanding of core concepts.

The course is structured around four main modules:
1. Introduction and Basic Principles
2. Theoretical Frameworks
3. Practical Applications
4. Advanced Topics and Future Directions

By the end of this course, you will have developed a comprehensive understanding of the subject matter and be able to apply these concepts to real-world scenarios.`}
                    />
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 p-3">
                    <div className="flex justify-between items-center w-full text-sm">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Generated 2 days ago</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          Helpful
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>

                <h2 className="text-xl font-semibold mt-4 mb-2">Lecture Summaries</h2>
                <div className="grid gap-4">
                  {lectures.map((lecture) => (
                    <Card key={lecture.id} className="card-hover">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-lg">{lecture.title}</CardTitle>
                          <Badge variant="outline">{lecture.date}</Badge>
                        </div>
                        <CardDescription>{lecture.duration}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex gap-2">
                          {lecture.hasSummary && (
                            <Badge variant="secondary">
                              <FileText className="mr-1 h-3 w-3" />
                              Summary
                            </Badge>
                          )}
                          {lecture.hasQuiz && (
                            <Badge variant="secondary">
                              <Layers className="mr-1 h-3 w-3" />
                              Quiz
                            </Badge>
                          )}
                          {lecture.hasNotes && (
                            <Badge variant="secondary">
                              <BookOpen className="mr-1 h-3 w-3" />
                              Notes
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="ghost" size="sm" className="ml-auto">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="quizzes">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Quizzes</CardTitle>
                    <CardDescription>Test your knowledge with AI-generated quizzes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {[
                        {
                          id: "quiz1",
                          title: "Fundamentals Quiz",
                          questions: 10,
                          completed: true,
                          score: "85%",
                          date: "Sep 10, 2023",
                        },
                        {
                          id: "quiz2",
                          title: "Core Concepts",
                          questions: 15,
                          completed: true,
                          score: "92%",
                          date: "Sep 15, 2023",
                        },
                        {
                          id: "quiz3",
                          title: "Advanced Topics",
                          questions: 12,
                          completed: false,
                          date: "Not started",
                        },
                      ].map((quiz) => (
                        <div
                          key={quiz.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`rounded-full p-2 ${
                                quiz.completed ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {quiz.completed ? <ThumbsUp className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                            </div>
                            <div>
                              <p className="font-medium">{quiz.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {quiz.questions} questions • {quiz.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {quiz.completed && (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                                {quiz.score}
                              </Badge>
                            )}
                            <Button size="sm">{quiz.completed ? "Review" : "Start Quiz"}</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t">
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Generate New Quiz
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="flashcards">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Flashcard Decks</CardTitle>
                    <CardDescription>Practice with spaced repetition flashcards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {[
                        {
                          id: "deck1",
                          title: "Key Terminology",
                          cards: 24,
                          mastered: 18,
                          lastPracticed: "Yesterday",
                        },
                        {
                          id: "deck2",
                          title: "Core Concepts",
                          cards: 32,
                          mastered: 15,
                          lastPracticed: "3 days ago",
                        },
                        {
                          id: "deck3",
                          title: "Formulas & Equations",
                          cards: 16,
                          mastered: 8,
                          lastPracticed: "1 week ago",
                        },
                      ].map((deck) => (
                        <div
                          key={deck.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="rounded-full p-2 bg-purple-100 text-purple-600">
                              <BookOpen className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">{deck.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {deck.cards} cards • {deck.mastered} mastered
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground mr-2">Last practiced: {deck.lastPracticed}</p>
                            <Button size="sm">Practice</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t">
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Deck
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="zen">
              <Card>
                <CardHeader>
                  <CardTitle>Zen Reading Mode</CardTitle>
                  <CardDescription>Distraction-free reading experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {[
                      {
                        id: "reading1",
                        title: "Chapter 1: Introduction",
                        type: "Textbook",
                        pages: 24,
                        lastRead: "Page 18",
                      },
                      {
                        id: "reading2",
                        title: "Research Paper: Recent Advances",
                        type: "PDF",
                        pages: 12,
                        lastRead: "Not started",
                      },
                      {
                        id: "reading3",
                        title: "Lecture Notes: Week 3",
                        type: "Notes",
                        pages: 8,
                        lastRead: "Completed",
                      },
                    ].map((reading) => (
                      <div
                        key={reading.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="rounded-full p-2 bg-blue-100 text-blue-600">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{reading.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {reading.type} • {reading.pages} pages
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground mr-2">{reading.lastRead}</p>
                          <Button size="sm">{reading.lastRead === "Completed" ? "Review" : "Continue Reading"}</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Reading
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
