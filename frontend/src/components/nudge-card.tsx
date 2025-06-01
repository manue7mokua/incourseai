import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Clock, X } from "lucide-react";

interface NudgeCardProps {
  nudge: {
    id: number;
    course: string;
    message: string;
    dueDate: string;
    priority: "high" | "medium" | "low";
  };
}

export function NudgeCard({ nudge }: NudgeCardProps) {
  const getPriorityStyles = () => {
    switch (nudge.priority) {
      case "high":
        return "bg-red-50 border-red-200";
      case "medium":
        return "bg-amber-50 border-amber-200";
      case "low":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-muted border-border";
    }
  };

  return (
    <Card className={`border ${getPriorityStyles()}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div
            className={`rounded-full p-2 ${
              nudge.priority === "high"
                ? "bg-red-100 text-red-600"
                : nudge.priority === "medium"
                ? "bg-amber-100 text-amber-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            <Bell className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{nudge.message}</p>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {nudge.course} • {nudge.dueDate}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm">Review Now</Button>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
