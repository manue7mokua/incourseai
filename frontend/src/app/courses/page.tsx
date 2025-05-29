import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    instructor: "Dr. Jane Smith",
    progress: 75,
  },
  {
    id: 2,
    title: "Advanced Mathematics",
    instructor: "Prof. John Doe",
    progress: 45,
  },
  {
    id: 3,
    title: "Data Structures and Algorithms",
    instructor: "Dr. Mike Johnson",
    progress: 30,
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Courses</h1>
          <Button>Add New Course</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Instructor: {course.instructor}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Progress: {course.progress}%
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
