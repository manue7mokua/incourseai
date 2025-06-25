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
import { FcGoogle } from "react-icons/fc";

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

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) setError(error.message);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
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
            <CardContent className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 text-sm"
                >
                  {error}
                </motion.div>
              )}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <FcGoogle className="h-5 w-5" />
                {loading ? "Signing in..." : "Sign in with Google"}
              </Button>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="magic">Magic Link</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form onSubmit={handleSignIn}>
                    <div className="grid gap-4">
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
