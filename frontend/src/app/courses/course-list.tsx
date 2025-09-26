"use client";

import { useState, useEffect } from "react";
import { Course, apiClient } from "@/lib/api-client";
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
import { BookOpen, Search, RefreshCw, AlertCircle } from "lucide-react";

export function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("All Courses");
  const [syncing, setSyncing] = useState(false);

  const fetchCourses = async (sync: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      // Use direct LMS fetching instead of database
      const data = await apiClient.getCoursesFromLms();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const syncCourses = async () => {
    try {
      setSyncing(true);
      setError(null);
      // Use direct LMS fetching for sync as well
      const data = await apiClient.getCoursesFromLms();
      setCourses(data);
    } catch (err) {
      console.error("Error syncing courses:", err);
      setError(err instanceof Error ? err.message : "Failed to sync courses");
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
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
      course.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSemester =
      selectedSemester === "All Courses" ||
      course.semester === selectedSemester;

    return matchesSearchTerm && matchesSemester;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Courses</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={syncCourses} disabled={syncing}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${syncing ? "animate-spin" : ""}`}
            />
            {syncing ? "Syncing..." : "Sync from LMS"}
          </Button>
          <Button>
            <BookOpen className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
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

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <div>
            <p className="text-red-800 font-medium">Error loading courses</p>
            <p className="text-red-600 text-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchCourses()}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

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
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedSemester !== "All Courses"
              ? "Try adjusting your search or filter."
              : "Get started by syncing courses from your LMS or adding your first course."}
          </p>
          {!searchTerm && selectedSemester === "All Courses" && (
            <Button onClick={syncCourses} disabled={syncing}>
              <RefreshCw
                className={`h-4 w-4 mr-2 ${syncing ? "animate-spin" : ""}`}
              />
              {syncing ? "Syncing..." : "Sync from LMS"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
