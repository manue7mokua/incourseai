"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: Date;
  view: "month" | "week" | "day";
  onViewChange: (view: "month" | "week" | "day") => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function CalendarHeader({
  currentDate,
  view,
  onViewChange,
  onPrevious,
  onNext,
  onToday,
}: CalendarHeaderProps) {
  const formatDate = () => {
    if (view === "month") {
      return currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } else if (view === "week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${startOfWeek.toLocaleDateString("en-US", {
          month: "long",
        })} ${startOfWeek.getDate()} - ${endOfWeek.getDate()}, ${endOfWeek.getFullYear()}`;
      } else if (startOfWeek.getFullYear() === endOfWeek.getFullYear()) {
        return `${startOfWeek.toLocaleDateString("en-US", {
          month: "short",
        })} ${startOfWeek.getDate()} - ${endOfWeek.toLocaleDateString("en-US", {
          month: "short",
        })} ${endOfWeek.getDate()}, ${endOfWeek.getFullYear()}`;
      } else {
        return `${startOfWeek.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })} - ${endOfWeek.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`;
      }
    } else {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevious}
          className="hover:bg-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          className="hover:bg-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold ml-2">{formatDate()}</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToday}
          className="hover:bg-accent"
        >
          Today
        </Button>
        <Tabs
          defaultValue={view}
          onValueChange={(value) =>
            onViewChange(value as "month" | "week" | "day")
          }
        >
          <TabsList className="bg-muted">
            <TabsTrigger value="month" className="data-[state=active]:bg-white">
              Month
            </TabsTrigger>
            <TabsTrigger value="week" className="data-[state=active]:bg-white">
              Week
            </TabsTrigger>
            <TabsTrigger value="day" className="data-[state=active]:bg-white">
              Day
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
