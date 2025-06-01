import { Navbar } from "@/components/navbar";
import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, FileText, Layers, Search } from "lucide-react";

// Course data matching the CourseCard interface
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
  {
    id: "math220",
    name: "MATH 220: Calculus I",
    instructor: "Prof. Garcia",
    progress: 55,
    lastActivity: "Problem Set 7",
    color: "bg-orange-500",
    icon: BookOpen,
  },
  {
    id: "hist105",
    name: "HIST 105: World History",
    instructor: "Dr. Chen",
    progress: 85,
    lastActivity: "Essay on Ancient Civilizations",
    color: "bg-red-500",
    icon: FileText,
  },
  {
    id: "bio150",
    name: "BIO 150: Introduction to Biology",
    instructor: "Dr. Martinez",
    progress: 72,
    lastActivity: "Lab Report on Cell Structure",
    color: "bg-teal-500",
    icon: Layers,
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Navbar />
      <main className="container mx-auto py-6 px-4 md:px-6">
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
              />
            </div>
            <Button>
              <BookOpen className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

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
