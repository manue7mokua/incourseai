import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ChevronLeft, Clock, Download, Play, Plus, ThumbsUp, Brain, FlaskConical } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { SummaryViewer } from "@/components/summary-viewer"
import { ModuleList } from "@/components/module-list"
import { Course, Module } from "@/lib/types/course"

export default async function CoursePage({
  params,
}: {
  params: { courseID: string }
}) {
  const courseID = (await params).courseID;

  const course = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseID}`).then(res => res.json()) as Course;
  const modules = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseID}/modules`).then(res => res.json()) as Module[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Navbar />
      <div className="container mx-auto py-6 px-4 md:px-6">
        {/* Course Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/courses">
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <Badge className="bg-blue-500 text-white">{course.code}</Badge>
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{course.name}</h1>
              <p className="text-muted-foreground">
                {course.year} • {course.semester}
              </p>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 gap-6">
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            </TabsList>
            <TabsContent value="notes">
              <div className="grid grid-cols-1 gap-6">
                <Card className="pb-0 justify-between">
                  <CardContent>
                    <SummaryViewer
                      title="Course Overview"
                      content={`This course covers the fundamental principles and concepts of ${course.name}. Throughout the semester, we will explore theoretical foundations and practical applications, with a focus on developing a strong understanding of core concepts.

The course is structured around four main modules:
1. Introduction and Basic Principles
2. Theoretical Frameworks
3. Practical Applications
4. Advanced Topics and Future Directions

By the end of this course, you will have developed a comprehensive understanding of the subject matter and be able to apply these concepts to real-world scenarios.`}
                    />
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 p-3 [.border-t]:pt-3">
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
                <Card>
                  <CardHeader>
                    <CardTitle>Course Materials</CardTitle>
                    <CardDescription>Access your course materials and resources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ModuleList modules={modules} courseID={courseID} />
                  </CardContent>
                  <CardFooter className="border-t">
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Material
                    </Button>
                  </CardFooter>
                </Card>
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
                            <Link href={`/courses/${courseID}/quiz/${"cs101"}`}>
                              <Button size="sm">{quiz.completed ? "Review" : "Start Quiz"}</Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t">
                    <Link href={`/courses/${courseID}/generate-quiz`} className="w-full">
                      <Button className="w-full">
                        <FlaskConical className="mr-2 h-4 w-4" />
                        Generate New Quiz
                      </Button>
                    </Link>
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
                            <Link href={`/courses/${courseID}/flashcards/${deck.id}`}>
                              <Button size="sm">Practice</Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t">
                    <Link href={`/courses/${courseID}/create-flashcards`} className="w-full">
                      <Button className="w-full">
                        <Brain className="mr-2 h-4 w-4" />
                        Create New Deck
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
