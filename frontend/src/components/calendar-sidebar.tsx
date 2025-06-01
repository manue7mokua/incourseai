"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  FileText,
  Layers,
  Sparkles,
  Users,
  Clock,
  Calendar,
  CalendarDays,
  AlertTriangle,
  Settings,
  ExternalLink,
} from "lucide-react";

interface CalendarSidebarProps {
  courses: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

export function CalendarSidebar({ courses }: CalendarSidebarProps) {
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    courses.map((c) => c.id)
  );
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([
    "lecture",
    "quiz",
    "assignment",
    "study",
    "ai-suggestion",
    "reading",
  ]);
  const [integrations, setIntegrations] = useState({
    google: false,
    apple: false,
    outlook: false,
  });

  const eventTypes = [
    { id: "lecture", name: "Lectures", icon: BookOpen, color: "bg-blue-500" },
    { id: "quiz", name: "Quizzes", icon: Layers, color: "bg-red-500" },
    {
      id: "assignment",
      name: "Assignments",
      icon: FileText,
      color: "bg-orange-500",
    },
    { id: "study", name: "Study Sessions", icon: Users, color: "bg-green-500" },
    {
      id: "ai-suggestion",
      name: "AI Suggestions",
      icon: Sparkles,
      color: "bg-purple-500",
    },
    { id: "reading", name: "Reading", icon: BookOpen, color: "bg-indigo-500" },
  ];

  const upcomingDeadlines = [
    {
      id: "1",
      title: "CS 101 Final Project",
      course: "CS 101",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      priority: "high",
    },
    {
      id: "2",
      title: "ECON 201 Midterm",
      course: "ECON 201",
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      priority: "medium",
    },
    {
      id: "3",
      title: "PSYCH 110 Essay",
      course: "PSYCH 110",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      priority: "low",
    },
  ];

  const toggleCourse = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const toggleEventType = (eventType: string) => {
    setSelectedEventTypes((prev) =>
      prev.includes(eventType)
        ? prev.filter((type) => type !== eventType)
        : [...prev, eventType]
    );
  };

  const toggleIntegration = (service: string) => {
    setIntegrations((prev) => ({
      ...prev,
      [service]: !prev[service as keyof typeof prev],
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatTimeUntil = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    return `${days} days`;
  };

  return (
    <div className="space-y-6">
      {/* Course Filters */}
      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Courses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <Checkbox
                id={course.id}
                checked={selectedCourses.includes(course.id)}
                onCheckedChange={() => toggleCourse(course.id)}
                className="data-[state=checked]:bg-primary"
              />
              <div className="flex items-center gap-2 flex-1">
                <div className={`w-3 h-3 rounded-full ${course.color}`}></div>
                <label
                  htmlFor={course.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer truncate"
                >
                  {course.name.split(":")[0]}
                </label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Event Type Filters */}
      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Event Types
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {eventTypes.map((eventType) => (
            <div
              key={eventType.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <Checkbox
                id={eventType.id}
                checked={selectedEventTypes.includes(eventType.id)}
                onCheckedChange={() => toggleEventType(eventType.id)}
                className="data-[state=checked]:bg-primary"
              />
              <div className="flex items-center gap-2 flex-1">
                <div className={`p-1 rounded ${eventType.color} text-white`}>
                  <eventType.icon className="h-3 w-3" />
                </div>
                <label
                  htmlFor={eventType.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {eventType.name}
                </label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingDeadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="p-3 rounded-lg border border-border/50 hover:bg-accent/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="font-medium text-sm truncate">
                    {deadline.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {deadline.course}
                  </p>
                </div>
                <Badge
                  className={`text-xs ${getPriorityColor(deadline.priority)}`}
                >
                  {formatTimeUntil(deadline.dueDate)}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                Due{" "}
                {deadline.dueDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Calendar Integration */}
      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Sync Calendars
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { id: "google", name: "Google Calendar", icon: Calendar },
              { id: "apple", name: "Apple Calendar", icon: CalendarDays },
              { id: "outlook", name: "Outlook", icon: Calendar },
            ].map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <service.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{service.name}</span>
                </div>
                <Button
                  variant={
                    integrations[service.id as keyof typeof integrations]
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => toggleIntegration(service.id)}
                  className="h-8 px-3"
                >
                  {integrations[service.id as keyof typeof integrations] ? (
                    "Connected"
                  ) : (
                    <div className="flex items-center gap-1">
                      <span>Connect</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  )}
                </Button>
              </div>
            ))}
          </div>

          <Separator />

          <div className="text-xs text-muted-foreground text-center">
            Sync your academic schedule with external calendars for better
            organization
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
