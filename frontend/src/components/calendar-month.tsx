import { cn } from "@/lib/utils";

interface CalendarMonthProps {
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

export function CalendarMonth({
  currentDate,
  events,
  getCourseColor,
}: CalendarMonthProps) {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const today = new Date();

  // Generate days for the calendar grid
  const days = [];
  const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }

  // Add cells for days in the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({ day, isCurrentMonth: true });
  }

  // Add empty cells for days after the last day of the month
  const remainingCells = totalCells - days.length;
  for (let i = 0; i < remainingCells; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }

  // Group days into weeks
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Get events for a specific day
  const getEventsForDay = (day: number | null) => {
    if (!day) return [];
    return events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  // Check if a day is today
  const isToday = (day: number | null) => {
    if (!day) return false;
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="w-full">
      {/* Calendar header - days of week */}
      <div className="grid grid-cols-7 text-center font-medium text-sm py-3 border-b bg-muted/30">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="px-1 text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-1 divide-y">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 min-h-[120px]">
            {week.map(({ day, isCurrentMonth }, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={cn(
                  "border-r last:border-r-0 p-2 h-full hover:bg-accent/20 transition-colors",
                  !isCurrentMonth && "bg-muted/20 text-muted-foreground"
                )}
              >
                {day !== null && (
                  <div className="h-full">
                    <div
                      className={cn(
                        "flex justify-center items-center h-8 w-8 mb-2 text-sm font-medium transition-colors",
                        isToday(day) &&
                          "bg-primary text-primary-foreground rounded-full shadow-sm",
                        !isToday(day) &&
                          isCurrentMonth &&
                          "hover:bg-accent rounded-full"
                      )}
                    >
                      {day}
                    </div>
                    <div className="space-y-1">
                      {getEventsForDay(day)
                        .slice(0, 3)
                        .map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs truncate px-2 py-1 rounded-md ${getCourseColor(
                              event.courseId
                            )} text-white shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                          >
                            <span className="font-medium">
                              {event.date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>{" "}
                            {event.title}
                          </div>
                        ))}
                      {getEventsForDay(day).length > 3 && (
                        <div className="text-xs text-center text-muted-foreground mt-1 px-1 py-0.5 bg-muted/50 rounded">
                          +{getEventsForDay(day).length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
