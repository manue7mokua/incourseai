'use client';

import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Search } from "lucide-react";
import { Course } from "@/lib/types/course";
import { useState, useMemo } from "react";

interface CourseListProps {
  initialCourses: Course[];
}

export function CourseList({ initialCourses }: CourseListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("All Courses");

  // Generate semester options for the last 6 semesters
  const semesterOptions = useMemo(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentSemester = currentMonth >= 7 ? 'Fall' : 'Spring';
    
    const options = [];
    let year = currentYear;
    let semester = currentSemester;
    
    for (let i = 0; i < 6; i++) {
      options.push(`${semester} ${year}`);
      if (semester === 'Fall') {
        semester = 'Spring';
      } else {
        semester = 'Fall';
        year--;
      }
    }
    options.push('All Courses');
    return options;
  }, []);

  // Filter courses based on search query and selected semester
  const filteredCourses = useMemo(() => {
    return initialCourses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedSemester === 'All Courses') {
        return matchesSearch;
      }

      const [semester, year] = selectedSemester.split(' ');
      const matchesSemester = course.semester === semester && course.year === year;
      
      return matchesSearch && matchesSemester;
    });
  }, [initialCourses, searchQuery, selectedSemester]);

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Your Courses
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Browse your enrolled classes and keep learning
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses..."
              className="pl-10 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              {semesterOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>
            <BookOpen className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={`${course.id}-${course.lmsId}`} course={course} />
        ))}
      </div>

      {/* Empty State for when no courses */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No courses found
          </h2>
          <p className="text-muted-foreground mb-6">
            {searchQuery || selectedSemester !== 'All Courses' 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first course'}
          </p>
          <Button>
            <BookOpen className="h-4 w-4 mr-2" />
            Add Your First Course
          </Button>
        </div>
      )}
    </>
  );
} 