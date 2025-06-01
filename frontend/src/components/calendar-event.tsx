import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileText,
  Layers,
  Sparkles,
  Users,
  Clock,
} from "lucide-react";

interface CalendarEventProps {
  event: {
    id: string;
    title: string;
    date: Date;
    endDate: Date;
    courseId: string;
    type: string;
  };
  getCourseColor: (courseId: string) => string;
}

export function CalendarEvent({ event, getCourseColor }: CalendarEventProps) {
  const getEventIcon = () => {
    switch (event.type) {
      case "lecture":
        return <BookOpen className="h-4 w-4" />;
      case "quiz":
        return <Layers className="h-4 w-4" />;
      case "assignment":
        return <FileText className="h-4 w-4" />;
      case "ai-suggestion":
        return <Sparkles className="h-4 w-4" />;
      case "study":
        return <Users className="h-4 w-4" />;
      case "reading":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getEventTypeName = () => {
    switch (event.type) {
      case "lecture":
        return "Lecture";
      case "quiz":
        return "Quiz";
      case "assignment":
        return "Assignment";
      case "study":
        return "Study Session";
      case "ai-suggestion":
        return "AI Suggestion";
      case "reading":
        return "Reading";
      default:
        return "Event";
    }
  };

  const getBadgeVariant = () => {
    switch (event.type) {
      case "quiz":
      case "assignment":
        return "destructive";
      case "ai-suggestion":
        return "default";
      default:
        return "secondary";
    }
  };

  const formatDuration = () => {
    const duration = event.endDate.getTime() - event.date.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return "Quick";
    }
  };

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:bg-accent/30 hover:border-border transition-all duration-200 cursor-pointer group">
      <div
        className={`rounded-full p-2.5 ${getCourseColor(
          event.courseId
        )} text-white shadow-sm group-hover:shadow-md transition-shadow`}
      >
        {getEventIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {event.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-muted-foreground">
                {event.date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {event.endDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {formatDuration()}
              </span>
            </div>
          </div>
          <Badge variant={getBadgeVariant()} className="ml-2 shrink-0">
            {getEventTypeName()}
          </Badge>
        </div>
        {event.type === "ai-suggestion" && (
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            <span>AI-recommended based on your learning patterns</span>
          </div>
        )}
      </div>
    </div>
  );
}
