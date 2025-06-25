"use client";
import { CourseList } from "./course-list";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Navbar } from "@/components/navbar";

function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Navbar />
      <main className="container mx-auto py-6 px-4 md:px-6">
        <CourseList />
      </main>
    </div>
  );
}

export default function WrappedCoursesPage() {
  return (
    <ProtectedRoute>
      <CoursesPage />
    </ProtectedRoute>
  );
}
