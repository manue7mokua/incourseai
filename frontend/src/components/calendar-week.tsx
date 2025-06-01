import { cn } from "@/lib/utils";

interface CalendarWeekProps {
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

export function CalendarWeek({
  currentDate,
  events,
  getCourseColor,
}: CalendarWeekProps) {
  // Get the start of the week (Sunday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  // Generate days for the week
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push(day);
  }

  // Hours to display (7 AM to 9 PM)
  const hours = [];
  for (let i = 7; i <= 21; i++) {
    hours.push(i);
  }

  // Check if a day is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Get events for a specific day and hour
  const getEventsForHourSlot = (day: Date, hour: number) => {
    return events.filter(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear() &&
        event.date.getHours() === hour
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Week header - days */}
        <div className="grid grid-cols-8 text-center font-medium border-b bg-muted/30">
          <div className="py-3 px-2 border-r"></div>
          {days.map((day, index) => (
            <div
              key={index}
              className={cn(
                "py-3 px-2 border-r last:border-r-0 transition-colors",
                isToday(day) && "bg-primary/10"
              )}
            >
              <div className="text-sm text-muted-foreground">
                {day.toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div
                className={cn(
                  "text-lg font-semibold mt-1",
                  isToday(day) && "text-primary"
                )}
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Time slots */}
        <div className="divide-y">
          {hours.map((hour) => (
            <div
              key={hour}
              className="grid grid-cols-8 min-h-[80px] hover:bg-accent/10 transition-colors"
            >
              {/* Time column */}
              <div className="py-3 px-3 text-sm text-muted-foreground border-r bg-muted/20">
                <div className="font-medium">
                  {hour === 12
                    ? "12 PM"
                    : hour > 12
                    ? `${hour - 12} PM`
                    : `${hour} AM`}
                </div>
              </div>

              {/* Day columns */}
              {days.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={cn(
                    "p-2 border-r last:border-r-0 transition-colors",
                    isToday(day) && "bg-primary/5"
                  )}
                >
                  <div className="space-y-1">
                    {getEventsForHourSlot(day, hour).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-2 rounded-md ${getCourseColor(
                          event.courseId
                        )} text-white shadow-sm hover:shadow-md transition-all cursor-pointer`}
                      >
                        <div className="font-medium mb-1">
                          {event.date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {" - "}
                          {event.endDate.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="truncate leading-tight">
                          {event.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
