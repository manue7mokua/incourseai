import { cn } from "@/lib/utils";

interface CalendarDayProps {
  currentDate: Date;
  events: Array<{
    id: string;
    title: string;
    date: Date;
    endDate: Date;
    courseId: string;
    type: string;
  }>;
  getCourseColor: (courseId: string) => string;
}

export function CalendarDay({
  currentDate,
  events,
  getCourseColor,
}: CalendarDayProps) {
  // Hours to display (7 AM to 9 PM)
  const hours = [];
  for (let i = 7; i <= 21; i++) {
    hours.push(i);
  }

  // Check if the current date is today
  const isToday = () => {
    const today = new Date();
    return (
      currentDate.getDate() === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  // Get events for a specific hour
  const getEventsForHour = (hour: number) => {
    return events.filter(
      (event) =>
        event.date.getDate() === currentDate.getDate() &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear() &&
        event.date.getHours() === hour
    );
  };

  // Get all events for the day
  const getDayEvents = () => {
    return events.filter(
      (event) =>
        event.date.getDate() === currentDate.getDate() &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <div className="w-full">
      {/* Day header */}
      <div
        className={cn(
          "text-center py-6 font-medium border-b bg-muted/30",
          isToday() && "bg-primary/10"
        )}
      >
        <div className="text-sm text-muted-foreground">
          {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
        </div>
        <div
          className={cn("text-3xl font-bold mt-2", isToday() && "text-primary")}
        >
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {currentDate.toLocaleDateString("en-US", { year: "numeric" })}
        </div>
      </div>

      {/* Time slots */}
      <div className="divide-y">
        {hours.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-12 min-h-[100px] hover:bg-accent/10 transition-colors"
          >
            {/* Time column */}
            <div className="col-span-2 py-4 px-4 text-sm text-muted-foreground border-r bg-muted/20 flex flex-col items-center">
              <div className="font-semibold">
                {hour === 12
                  ? "12 PM"
                  : hour > 12
                  ? `${hour - 12} PM`
                  : `${hour} AM`}
              </div>
              <div className="text-xs mt-1 opacity-70">
                {String(hour).padStart(2, "0")}:00
              </div>
            </div>

            {/* Events column */}
            <div className="col-span-10 p-4">
              <div className="space-y-3">
                {getEventsForHour(hour).length > 0 ? (
                  getEventsForHour(hour).map((event) => (
                    <div
                      key={event.id}
                      className={`p-4 rounded-lg ${getCourseColor(
                        event.courseId
                      )} text-white shadow-md hover:shadow-lg transition-all cursor-pointer`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-lg">
                          {event.title}
                        </div>
                        <div className="text-sm opacity-90 bg-white/20 px-2 py-1 rounded">
                          {event.type.charAt(0).toUpperCase() +
                            event.type.slice(1)}
                        </div>
                      </div>
                      <div className="text-sm opacity-90">
                        <span className="font-medium">
                          {event.date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {" - "}
                          {event.endDate.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-16 text-muted-foreground text-sm opacity-50">
                    <div className="text-center">
                      <div className="w-2 h-2 bg-muted rounded-full mx-auto mb-2"></div>
                      Available
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Empty state for whole day */}
        {getDayEvents().length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
            <p className="text-lg font-medium mb-2">No events scheduled</p>
            <p className="text-sm">
              This day is completely free for you to plan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
