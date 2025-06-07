import { Navbar } from "@/components/navbar";
import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, FileText, Layers, Search } from "lucide-react";
import { Course } from "@/lib/types/course";
import { CourseList } from "./course-list";

export default async function CoursesPage() {
  const courses: Course[] = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/courses').then(res => res.json()) as Course[];

  // Generate semester options for the last 6 semesters
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentSemester = currentMonth >= 7 ? 'Fall' : 'Spring';
  
  const semesterOptions = [];
  let year = currentYear;
  let semester = currentSemester;
  
  for (let i = 0; i < 6; i++) {
    semesterOptions.push(`${semester} ${year}`);
    if (semester === 'Fall') {
      semester = 'Spring';
    } else {
      semester = 'Fall';
      year--;
    }
  }
  semesterOptions.push('All Courses');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Navbar />
      <main className="container mx-auto py-6 px-4 md:px-6">
        <CourseList initialCourses={courses} />

        {/* Empty State for when no courses */}
        {courses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No courses yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Get started by adding your first course
            </p>
            <Button>
              <BookOpen className="h-4 w-4 mr-2" />
              Add Your First Course
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
