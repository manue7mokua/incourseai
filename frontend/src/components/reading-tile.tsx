import { BookOpen, FileText, Layers } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ReadingProps {
  reading: {
    id: string;
    title: string;
    type: string;
    pages: number;
    lastRead: string;
    hasSummary: boolean;
    hasQuiz: boolean;
    hasNotes: boolean;
  };
  courseID: string
}

export function ReadingTile({ reading, courseID }: ReadingProps) {
  return (
    <div
      className="flex flex-row gap-2 justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
      key={reading.id}
    >
      <div className="flex flex-col gap-5">
        <div key={reading.id} className="flex items-center ">
          <div className="flex items-center gap-4">
            <div className="rounded-full p-2 bg-blue-100 text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">{reading.title}</p>
              <p className="text-sm text-muted-foreground">
                {reading.type} • {reading.pages} pages
              </p>
            </div>
          </div>
        </div>
        <CardContent className="pb-2">
          <div className="flex gap-2">
            {reading.hasSummary && (
              <Badge variant="secondary">
                <FileText className="mr-1 h-3 w-3" />
                Summary
              </Badge>
            )}
            {reading.hasQuiz && (
              <Badge variant="secondary">
                <Layers className="mr-1 h-3 w-3" />
                Quiz
              </Badge>
            )}
            {reading.hasNotes && (
              <Badge variant="secondary">
                <BookOpen className="mr-1 h-3 w-3" />
                Notes
              </Badge>
            )}
          </div>
        </CardContent>
      </div>
      <div className="flex items-center gap-2 justify-end">
        <p className="text-sm text-muted-foreground mr-2">{reading.lastRead}</p>
        <Link href={`/courses/${courseID}/files/${1}`}>
          <Button size="sm">
            {reading.lastRead === "Completed" ? "Review" : "Continue Reading"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
