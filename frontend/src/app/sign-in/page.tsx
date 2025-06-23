"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Clock, FileText, Layers, Bell } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!magicLinkSent) {
      setLoading(true);
      setError(null);
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });

        if (error) {
          setError(error.message);
        } else {
          setMagicLinkSent(true);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      setError(null);
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.verifyOtp({
          email,
          token,
          type: "email",
        });

        if (error) {
          setError(error.message);
        } else if (session) {
          router.push("/dashboard");
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSocialSignIn = () => {
    // Here you would normally handle social authentication
    // For now, we'll just redirect to dashboard
    router.push("/dashboard");
  };

  // Static sample data for dashboard preview
  const sampleActivity = [
    {
      id: 1,
      course: "CS 101",
      activity: "Completed quiz on Data Structures",
      time: "2 hours ago",
      score: "85%",
      type: "quiz",
    },
    {
      id: 2,
      course: "ECON 201",
      activity: "Read summary of Lecture 5",
      time: "Yesterday",
      type: "summary",
    },
    {
      id: 3,
      course: "PSYCH 110",
      activity: "Practiced flashcards",
      time: "2 days ago",
      retention: "High",
      type: "flashcards",
    },
  ];

  const sampleNudges = [
    {
      id: 1,
      course: "CS 101",
      message: "Time to review Arrays and Linked Lists",
      dueDate: "Quiz in 2 days",
      priority: "high",
    },
    {
      id: 2,
      course: "ECON 201",
      message: "New lecture summary available",
      dueDate: "Posted yesterday",
      priority: "medium",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column - Simplified Dashboard Preview */}
      <div className="flex-1 bg-gradient-to-br from-orange-50 to-pink-50 p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-2xl"
        >
          {/* Dashboard Preview Container */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Browser Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-500 ml-4 font-medium">
                incourseai.com/dashboard
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mb-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Good morning, Iman!
                </h3>
                <p className="text-gray-600">
                  Here&apos;s what&apos;s happening with your learning today
                </p>
              </motion.div>

              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="bg-white border border-gray-100 rounded-xl p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold">Recent Activity</h4>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-3">
                    {sampleActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className={`rounded-full p-1.5 ${
                            activity.type === "quiz"
                              ? "bg-blue-100 text-blue-600"
                              : activity.type === "summary"
                              ? "bg-green-100 text-green-600"
                              : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {activity.type === "quiz" ? (
                            <Layers className="h-3 w-3" />
                          ) : activity.type === "summary" ? (
                            <FileText className="h-3 w-3" />
                          ) : (
                            <BookOpen className="h-3 w-3" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {activity.activity}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.course} • {activity.time}
                          </p>
                          {activity.score && (
                            <Badge variant="outline" className="text-xs mt-1">
                              {activity.score}
                            </Badge>
                          )}
                          {activity.retention && (
                            <Badge
                              variant="outline"
                              className="text-xs mt-1 bg-green-50 text-green-700 border-green-200"
                            >
                              {activity.retention} Retention
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Smart Nudges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="bg-white border border-gray-100 rounded-xl p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold">Smart Nudges</h4>
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-3">
                    {sampleNudges.map((nudge, index) => (
                      <motion.div
                        key={nudge.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
                        className="bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-100 rounded-lg p-3"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {nudge.message}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {nudge.course}
                            </p>
                          </div>
                          <Badge
                            className={`text-xs ${
                              nudge.priority === "high"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : "bg-orange-100 text-orange-700 border-orange-200"
                            }`}
                          >
                            {nudge.dueDate}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          className="w-full text-xs h-7 bg-primary hover:bg-primary/90"
                        >
                          Take Action
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your InCourse account to continue learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="magic">Magic Link</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form onSubmit={handleSignIn}>
                    <div className="grid gap-4">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 text-sm"
                        >
                          {error}
                        </motion.div>
                      )}
                      <div className="grid gap-2">
                        <Label htmlFor="email">School Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="firstname.lastname@college.edu"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <Link
                            href="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? "Signing In..." : "Sign In"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="magic">
                  <form onSubmit={handleMagicLink}>
                    <div className="grid gap-4">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 text-sm"
                        >
                          {error}
                        </motion.div>
                      )}
                      {magicLinkSent && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-green-50 text-green-700 p-3 rounded-lg border border-green-200 text-sm"
                        >
                          Check your email for the magic link or enter the
                          6-digit code below.
                        </motion.div>
                      )}
                      <div className="grid gap-2">
                        <Label htmlFor="magic-email">School Email</Label>
                        <Input
                          id="magic-email"
                          type="email"
                          placeholder="firstname.lastname@college.edu"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={loading || magicLinkSent}
                        />
                      </div>
                      {magicLinkSent && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="grid gap-2 overflow-hidden"
                        >
                          <Label htmlFor="magic-otp">One-Time Code</Label>
                          <Input
                            id="magic-otp"
                            type="text"
                            placeholder="123456"
                            required
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            disabled={loading}
                          />
                        </motion.div>
                      )}
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading
                          ? "..."
                          : magicLinkSent
                          ? "Sign In with Code"
                          : "Send Magic Link"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialSignIn()}
                  type="button"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialSignIn()}
                  type="button"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"
                      fill="#F25022"
                    />
                  </svg>
                  Microsoft
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="text-sm text-center text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
