"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Home as HomeIcon,
  Clock,
  FileText,
  Layers,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { NudgeCard } from "@/components/nudge-card";

export default function DashboardPage() {
  const [tab, setTab] = useState("home");

  // Sample course data
  const courses = [
    {
      id: "cs101",
      name: "CS 101: Introduction to Computer Science",
      instructor: "Dr. Smith",
      progress: 65,
      lastActivity: "Lecture 8 Summary",
      color: "bg-blue-500",
      icon: BookOpen,
    },
    {
      id: "econ201",
      name: "ECON 201: Macroeconomics",
      instructor: "Prof. Johnson",
      progress: 42,
      lastActivity: "Quiz on Supply and Demand",
      color: "bg-green-500",
      icon: Layers,
    },
    {
      id: "psych110",
      name: "PSYCH 110: Introduction to Psychology",
      instructor: "Dr. Williams",
      progress: 78,
      lastActivity: "Flashcards on Cognitive Biases",
      color: "bg-purple-500",
      icon: FileText,
    },
  ];

  // Sample activity data
  const recentActivity = [
    {
      id: 1,
      course: "CS 101",
      activity: "Completed quiz on Data Structures",
      time: "2 hours ago",
      score: "85%",
      type: "quiz",
    },
    {
      id: 2,
      course: "ECON 201",
      activity: "Read summary of Lecture 5: Fiscal Policy",
      time: "Yesterday",
      type: "summary",
    },
    {
      id: 3,
      course: "PSYCH 110",
      activity: "Practiced flashcards on Research Methods",
      time: "2 days ago",
      retention: "High",
      type: "flashcards",
    },
  ];

  // Sample nudges
  const nudges = [
    {
      id: 1,
      course: "CS 101",
      message: "Time to review Arrays and Linked Lists",
      dueDate: "Quiz in 2 days",
      priority: "high",
    },
    {
      id: 2,
      course: "ECON 201",
      message: "New lecture summary available",
      dueDate: "Posted yesterday",
      priority: "medium",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-orange-50 to-pink-50 overflow-hidden">
      <Navbar />
      {/* Floating Dock Switcher */}
      <div className="sticky top-[64px] z-40 flex justify-center w-full pointer-events-none">
        <div className="pointer-events-auto bg-muted rounded-full shadow-lg flex items-center gap-2 px-2 py-1 mt-4 mb-6 transition-all">
          <button
            className={`flex items-center gap-2 px-5 py-2 rounded-full transition-colors text-base md:text-lg font-medium ${
              tab === "home"
                ? "bg-white shadow text-primary"
                : "hover:bg-white/70 text-muted-foreground"
            }`}
            onClick={() => setTab("home")}
            aria-current={tab === "home"}
          >
            <HomeIcon
              className={`h-5 w-5 transition-colors ${
                tab === "home" ? "text-primary" : "text-muted-foreground"
              }`}
            />
            Recents
          </button>
          <button
            className={`flex items-center gap-2 px-5 py-2 rounded-full transition-colors text-base md:text-lg font-medium ${
              tab === "classes"
                ? "bg-white shadow text-primary"
                : "hover:bg-white/70 text-muted-foreground"
            }`}
            onClick={() => setTab("classes")}
            aria-current={tab === "classes"}
          >
            <BookOpen
              className={`h-5 w-5 transition-colors ${
                tab === "classes" ? "text-primary" : "text-muted-foreground"
              }`}
            />
            Classes
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-start px-2 md:px-6 pb-6">
        {tab === "home" ? (
          <div
            className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2"
            style={{ maxHeight: "60vh" }}
          >
            {/* Recent Activity */}
            <div className="w-full max-h-[60vh] overflow-y-auto rounded-xl bg-white/80 shadow-sm">
              <div className="flex justify-between items-center mb-2 md:mb-4 px-4 pt-4">
                <h2 className="text-lg md:text-xl font-semibold">
                  Recent Activity
                </h2>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <Card className="shadow-none border-none bg-transparent">
                <CardHeader className="pb-2 md:pb-3 px-4">
                  <Tabs defaultValue="all">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                      <TabsTrigger value="summaries">Summaries</TabsTrigger>
                      <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div
                          className={`rounded-full p-2 mr-4 ${
                            activity.type === "quiz"
                              ? "bg-blue-100 text-blue-600"
                              : activity.type === "summary"
                              ? "bg-green-100 text-green-600"
                              : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {activity.type === "quiz" ? (
                            <Layers className="h-5 w-5" />
                          ) : activity.type === "summary" ? (
                            <FileText className="h-5 w-5" />
                          ) : (
                            <BookOpen className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm md:text-base">
                                {activity.activity}
                              </p>
                              <p className="text-xs md:text-sm text-muted-foreground">
                                {activity.course} • {activity.time}
                              </p>
                            </div>
                            {activity.score && (
                              <Badge variant="outline" className="ml-2">
                                {activity.score}
                              </Badge>
                            )}
                            {activity.retention && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                              >
                                {activity.retention} Retention
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 p-3">
                  <div className="flex justify-between items-center w-full text-xs md:text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Updated just now
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Refresh
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Smart Nudges */}
            <div className="w-full max-h-[60vh] overflow-y-auto rounded-xl bg-white/80 shadow-sm">
              <div className="flex justify-between items-center mb-2 md:mb-4 px-4 pt-4">
                <h2 className="text-lg md:text-xl font-semibold">
                  Smart Nudges
                </h2>
              </div>
              <div className="space-y-4 px-4 pb-4">
                {nudges.length > 0 ? (
                  nudges.map((nudge) => (
                    <NudgeCard key={nudge.id} nudge={nudge} />
                  ))
                ) : (
                  <Card className="shadow-md">
                    <CardContent className="p-6 text-center text-muted-foreground">
                      No nudges at this time.
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full mt-2">
            <div className="flex justify-between items-center mb-6 px-1">
              <h2 className="text-lg md:text-xl font-semibold">Your Courses</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="flex overflow-x-auto whitespace-nowrap gap-x-6 scrollbar-hide w-full pt-6 pb-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="relative bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300 min-w-[300px] w-[320px] h-[70vh] min-h-[500px] flex-shrink-0 flex flex-col justify-between h-full p-5 mb-2 group"
                >
                  {/* Accent Icon/Color */}
                  <div className="absolute -top-4 left-5 flex items-center z-10">
                    <div
                      className={`rounded-xl p-3 ${course.color} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    >
                      <course.icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Top Section - Course Info */}
                  <div className="pt-8 flex flex-col gap-y-4">
                    <h3 className="font-bold text-lg leading-tight whitespace-normal break-words text-wrap">
                      {course.name}
                    </h3>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground flex items-center gap-2 overflow-hidden">
                        <span
                          role="img"
                          aria-label="Instructor"
                          className="text-base flex-shrink-0"
                        >
                          👨‍🏫
                        </span>
                        <span className="truncate">{course.instructor}</span>
                      </p>
                      <p className="text-sm text-muted-foreground flex items-start gap-2 overflow-hidden">
                        <span
                          role="img"
                          aria-label="Last activity"
                          className="text-base flex-shrink-0 mt-0.5"
                        >
                          🕓
                        </span>
                        <span className="whitespace-normal break-words text-wrap leading-relaxed">
                          {course.lastActivity}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Middle Section - Progress */}
                  <div className="flex-1 flex flex-col justify-center py-6">
                    <div className="text-center space-y-4">
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                          Course Progress
                        </h4>
                        <div className="text-4xl font-bold text-primary">
                          {course.progress}%
                        </div>
                      </div>

                      {/* Enhanced Progress Bar */}
                      <div className="space-y-3 mt-4">
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-3 rounded-full transition-all duration-500 ${course.color
                              .replace("bg-", "bg-gradient-to-r from-")
                              .replace(
                                "-500",
                                "-400 to-" + course.color.split("-")[1] + "-600"
                              )}`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {Math.round((course.progress / 100) * 12)} of 12
                          modules completed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section - Action */}
                  <div className="space-y-4">
                    <div className="flex flex-col gap-y-3">
                      <Button
                        size="lg"
                        className="w-full h-12 text-base font-medium shadow-sm hover:shadow-md transition-all"
                      >
                        Continue Learning
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-sm hover:bg-accent/50 transition-colors"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
