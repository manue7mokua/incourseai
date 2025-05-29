import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Active Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">
                Courses in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Due this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">7 days</p>
              <p className="text-sm text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
