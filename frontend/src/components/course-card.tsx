import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    name: string;
    instructor: string;
    progress: number;
    lastActivity: string;
    color: string;
    icon: LucideIcon;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="h-full overflow-hidden card-hover pb-0 justify-between">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`${course.color} text-white p-2 rounded-lg`}>
              <course.icon className="h-5 w-5" />
            </div>
            <Badge variant="outline">{course.progress}%</Badge>
          </div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
            {course.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {course.instructor}
          </p>
          <Progress value={course.progress} className="h-1 mb-2" />
          <p className="text-xs text-muted-foreground">
            Last activity: {course.lastActivity}
          </p>
        </CardContent>
        <CardFooter className="bg-muted/50 px-6 py-3 text-sm [.border-t]:pt-3">
          Continue Learning
        </CardFooter>
      </Card>
    </Link>
  );
}
