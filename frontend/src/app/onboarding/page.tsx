import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to InCourse!</CardTitle>
          <CardDescription>
            Let's get you set up with your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="interests">
                  What are you interested in learning?
                </Label>
                <Input
                  id="interests"
                  placeholder="e.g., Computer Science, Mathematics, Physics"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goals">What are your learning goals?</Label>
                <Input
                  id="goals"
                  placeholder="e.g., Master programming, Learn calculus"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time-commitment">
                  How much time can you commit per week?
                </Label>
                <Input
                  id="time-commitment"
                  placeholder="e.g., 10 hours"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="experience">
                  What's your current experience level?
                </Label>
                <Input
                  id="experience"
                  placeholder="e.g., Beginner, Intermediate, Advanced"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Complete Setup
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-muted-foreground">
            You can always update these preferences later in your profile
            settings
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
