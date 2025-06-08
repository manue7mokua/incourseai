import { BookOpen, FileText, Layers } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Module, ModuleItem } from "@/lib/types/course";

export function ReadingTile({ reading, courseID, module }: { reading: ModuleItem, courseID: string, module: Module }) {
  return (
    <div
      className="flex flex-row gap-2 justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
      key={reading.id}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center ">
          <div className="flex items-center gap-4">
            <div className="rounded-full p-2 bg-blue-100 text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">{reading.name}</p>
              <p className="text-sm text-muted-foreground">
                {reading.type} • {module.name} pages
              </p>
            </div>
          </div>
        </div>
        {/* <CardContent className="pb-2">
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
        </CardContent> */}
      </div>
      <div className="flex items-center gap-2 justify-end">
        {/* <p className="text-sm text-muted-foreground mr-2">{reading.lastRead}</p> */}
        <Link href={`/courses/${courseID}/files/${reading.lmsContentId}`}>
          <Button size="sm">
            Continue Reading
          </Button>
        </Link>
      </div>
    </div>
  );
}
