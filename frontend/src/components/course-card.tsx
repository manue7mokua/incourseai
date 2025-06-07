import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { Course } from "@/lib/types/course";

function calculateSemesterProgress(semester: string | null, year: string | null): number {
  if (!semester || !year) return 0;
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // JavaScript months are 0-based
  
  // If the course is from a different year, return 100 for past semesters or 0 for future semesters
  if (parseInt(year) !== currentYear) {
    if (semester === 'Spring' && parseInt(year) < currentYear) return 100;
    if (semester === 'Fall' && parseInt(year) < currentYear) return 100;
    return 0;
  }

  if (semester === 'Spring') {
    // Spring semester: January (1) to May (5)
    if (currentMonth < 1) return 0;
    if (currentMonth > 5) return 100;
    return ((currentMonth - 1) / 4) * 100;
  } else if (semester === 'Fall') {
    // Fall semester: August (8) to December (12)
    if (currentMonth < 8) return 0;
    if (currentMonth > 12) return 100;
    return ((currentMonth - 8) / 4) * 100;
  }
  
  return 0;
}

export function CourseCard({ course }: { course: Course }) {
  const progress = calculateSemesterProgress(course.semester, course.year);
  
  return (
    <Link href={`/courses/${course.lmsProvider}-${course.lmsId}`}>
      <Card className="h-full overflow-hidden card-hover pb-0 justify-between">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`text-white p-2 rounded-lg bg-blue-500`}>
              <BookOpen className="h-5 w-5" />
            </div>
            <Badge variant="outline">{course.year} {course.semester}</Badge>
          </div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
            {course.name}
          </h3>
          {course.code && <p className="text-sm font-medium text-blue-600">{course.code}</p>}
          <br />
          <Progress value={progress} className="h-1 mb-2" />
        </CardContent>
        <CardFooter className="bg-muted/50 px-6 py-3 text-sm [.border-t]:pt-3">
          Continue Learning
        </CardFooter>
      </Card>
    </Link>
  );
}
