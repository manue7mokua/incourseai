"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { CalendarHeader } from "@/components/calendar-header";
import { CalendarMonth } from "@/components/calendar-month";
import { CalendarWeek } from "@/components/calendar-week";
import { CalendarDay } from "@/components/calendar-day";
import { CalendarEvent } from "@/components/calendar-event";
import { CalendarSidebar } from "@/components/calendar-sidebar";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [showSidebar, setShowSidebar] = useState(true);

  // Sample courses data
  const courses = [
    {
      id: "cs101",
      name: "CS 101: Introduction to Computer Science",
      color: "bg-blue-500",
    },
    {
      id: "econ201",
      name: "ECON 201: Macroeconomics",
      color: "bg-green-500",
    },
    {
      id: "psych110",
      name: "PSYCH 110: Introduction to Psychology",
      color: "bg-purple-500",
    },
  ];

  // Sample events data
  const events = [
    {
      id: "1",
      title: "CS 101 Lecture",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        15,
        10,
        0
      ),
      endDate: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        15,
        11,
        30
      ),
      courseId: "cs101",
      type: "lecture",
    },
    {
      id: "2",
      title: "ECON 201 Quiz",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        16,
        14,
        0
      ),
      endDate: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        16,
        15,
        0
      ),
      courseId: "econ201",
      type: "quiz",
    },
    {
      id: "3",
      title: "PSYCH 110 Study Session",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        17,
        16,
        0
      ),
      endDate: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        17,
        18,
        0
      ),
      courseId: "psych110",
      type: "study",
    },
    {
      id: "4",
      title: "CS 101 Assignment Due",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        18,
        23,
        59
      ),
      endDate: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        18,
        23,
        59
      ),
      courseId: "cs101",
      type: "assignment",
    },
    {
      id: "5",
      title: "ECON 201 Lecture",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        15,
        13,
        0
      ),
      endDate: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        15,
        14,
        30
      ),
      courseId: "econ201",
      type: "lecture",
    },
    {
      id: "6",
      title: "AI-Suggested Study Time",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        15,
        0
      ),
      endDate: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        17,
        0
      ),
      courseId: "cs101",
      type: "ai-suggestion",
    },
    {
      id: "7",
      title: "PSYCH 110 Reading",
      date: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1,
        10,
        0
      ),
      endDate: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1,
        11,
        30
      ),
      courseId: "psych110",
      type: "reading",
    },
  ];

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getCourseColor = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.color : "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Navbar />

      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Calendar
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your schedule and study sessions
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSidebar(!showSidebar)}
              className="hover:bg-accent transition-colors"
            >
              {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
            </Button>
            <Button
              size="sm"
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Calendar */}
          <div className="flex-1">
            <Card className="mb-8 shadow-md border-border/50">
              <CardHeader className="pb-4">
                <CalendarHeader
                  currentDate={currentDate}
                  view={view}
                  onViewChange={setView}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onToday={handleToday}
                />
              </CardHeader>
              <CardContent className="p-0">
                {view === "month" && (
                  <CalendarMonth
                    currentDate={currentDate}
                    events={events}
                    getCourseColor={getCourseColor}
                  />
                )}
                {view === "week" && (
                  <CalendarWeek
                    currentDate={currentDate}
                    events={events}
                    getCourseColor={getCourseColor}
                  />
                )}
                {view === "day" && (
                  <CalendarDay
                    currentDate={currentDate}
                    events={events}
                    getCourseColor={getCourseColor}
                  />
                )}
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card className="shadow-md border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Today&apos;s Schedule</CardTitle>
                <CardDescription className="text-base">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events
                    .filter(
                      (event) =>
                        event.date.getDate() === new Date().getDate() &&
                        event.date.getMonth() === new Date().getMonth() &&
                        event.date.getFullYear() === new Date().getFullYear()
                    )
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((event) => (
                      <CalendarEvent
                        key={event.id}
                        event={event}
                        getCourseColor={getCourseColor}
                      />
                    ))}
                  {events.filter(
                    (event) =>
                      event.date.getDate() === new Date().getDate() &&
                      event.date.getMonth() === new Date().getMonth() &&
                      event.date.getFullYear() === new Date().getFullYear()
                  ).length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl">📅</span>
                      </div>
                      <p className="text-lg font-medium mb-2">
                        No events scheduled for today
                      </p>
                      <p className="text-sm">
                        Your day is free to plan as you wish
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          {showSidebar && (
            <div className="w-full lg:w-80">
              <CalendarSidebar courses={courses} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
