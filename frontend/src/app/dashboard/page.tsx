"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, FileText, Layers } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { NudgeCard } from "@/components/nudge-card";

export default function DashboardPage() {
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
    {
      id: 4,
      course: "MATH 220",
      activity: "Submitted Problem Set 7",
      time: "3 days ago",
      score: "92%",
      type: "assignment",
    },
    {
      id: 5,
      course: "BIO 150",
      activity: "Completed Lab Report on Cell Structure",
      time: "1 week ago",
      score: "88%",
      type: "lab",
    },
  ];

  // Sample nudges
  const nudges = [
    {
      id: 1,
      course: "CS 101",
      message: "Time to review Arrays and Linked Lists",
      dueDate: "Quiz in 2 days",
      priority: "high" as const,
    },
    {
      id: 2,
      course: "ECON 201",
      message: "New lecture summary available",
      dueDate: "Posted yesterday",
      priority: "medium" as const,
    },
    {
      id: 3,
      course: "MATH 220",
      message: "Problem Set 8 is now available",
      dueDate: "Due in 5 days",
      priority: "medium" as const,
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-orange-50 to-pink-50">
      <Navbar />

      {/* Header Section */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Good morning, Iman!
          </h1>
          <p className="text-lg text-muted-foreground">
            Here&apos;s what&apos;s happening with your learning today
          </p>
        </div>

        {/* Main Content - Side by Side Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-xl mx-auto">
          {/* Recent Activity */}
          <div className="w-full">
            <Card className="shadow-sm border-border/50 h-fit">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <Tabs defaultValue="all" className="mt-4">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                    <TabsTrigger value="summaries">Summaries</TabsTrigger>
                    <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y max-h-[60vh] overflow-y-auto">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start p-4 hover:bg-accent/50 transition-colors"
                    >
                      <div
                        className={`rounded-full p-2 mr-4 ${
                          activity.type === "quiz" ||
                          activity.type === "assignment"
                            ? "bg-blue-100 text-blue-600"
                            : activity.type === "summary"
                            ? "bg-green-100 text-green-600"
                            : activity.type === "lab"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {activity.type === "quiz" ||
                        activity.type === "assignment" ? (
                          <Layers className="h-5 w-5" />
                        ) : activity.type === "summary" ? (
                          <FileText className="h-5 w-5" />
                        ) : activity.type === "lab" ? (
                          <BookOpen className="h-5 w-5" />
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
          <div className="w-full">
            <Card className="shadow-sm border-border/50 h-fit">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Smart Nudges</h2>
                  <Button variant="ghost" size="sm">
                    Mark All Read
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Your personalized learning recommendations
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {nudges.length > 0 ? (
                  nudges.map((nudge) => (
                    <NudgeCard key={nudge.id} nudge={nudge} />
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <BookOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-sm">No nudges at this time.</p>
                    <p className="text-xs mt-1">
                      Keep learning to get personalized recommendations!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
