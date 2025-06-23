"use client";

import { useState, useEffect } from "react";
import { Course } from "@/lib/types/course";
import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Search } from "lucide-react";

export function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("All Courses");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  // Generate semester options for the last 6 semesters
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentSemester = currentMonth >= 7 ? "Fall" : "Spring";

  const semesterOptions = [];
  let year = currentYear;
  let semester = currentSemester;

  for (let i = 0; i < 6; i++) {
    semesterOptions.push(`${semester} ${year}`);
    if (semester === "Fall") {
      semester = "Spring";
    } else {
      semester = "Fall";
      year--;
    }
  }
  semesterOptions.push("All Courses");

  const filteredCourses = courses.filter((course) => {
    const matchesSearchTerm =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSemester =
      selectedSemester === "All Courses" ||
      course.term?.name === selectedSemester;

    return matchesSearchTerm && matchesSemester;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Courses</h1>
        <Button>
          <BookOpen className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by semester" />
          </SelectTrigger>
          <SelectContent>
            {semesterOptions.map((semester) => (
              <SelectItem key={semester} value={semester}>
                {semester}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-gray-200 h-64 animate-pulse"
            />
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No courses found
          </h2>
          <p className="text-muted-foreground">
            {searchTerm || selectedSemester !== "All Courses"
              ? "Try adjusting your search or filter."
              : "Get started by adding your first course."}
          </p>
        </div>
      )}
    </div>
  );
}
