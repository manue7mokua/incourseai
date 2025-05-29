"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, Clock, Heart, Sparkles } from "lucide-react";
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

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column - Product Dashboard Visual */}
      <div className="flex-1 bg-gradient-to-br from-orange-50 to-pink-50 p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative max-w-lg mx-auto">
            {/* Browser Window Frame */}
            <motion.div
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Browser Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-500 ml-4 font-medium">
                  incourseai.com/actions
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Good morning, Jeff!
                    </h3>
                    <p className="text-sm text-gray-600 font-normal">
                      You have 5 assignments due this week
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">S</span>
                  </div>
                </div>

                {/* Courses */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Your Courses
                  </h4>

                  {/* Biology 101 */}
                  <motion.div
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100 hover:shadow-md transition-all duration-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-800">
                          Biology 101
                        </h5>
                        <p className="text-xs text-gray-600 font-normal">
                          2 assignments due
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">🧬</span>
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 text-green-700 rounded-md font-medium"
                      >
                        Lab Report
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 text-green-700 rounded-md font-medium"
                      >
                        Quiz Ch. 5
                      </Badge>
                    </div>
                  </motion.div>

                  {/* Calculus II */}
                  <motion.div
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all duration-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-800">
                          Calculus II
                        </h5>
                        <p className="text-xs text-gray-600 font-normal">
                          1 assignment due
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">∫</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-blue-100 text-blue-700 rounded-md font-medium"
                      >
                        Problem Set 7
                      </Badge>
                    </div>
                  </motion.div>

                  {/* World History */}
                  <motion.div
                    className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 hover:shadow-md transition-all duration-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-800">
                          World History
                        </h5>
                        <p className="text-xs text-gray-600 font-normal">
                          2 assignments due
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">🏛️</span>
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-purple-100 text-purple-700 rounded-md font-medium"
                      >
                        Essay Draft
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-purple-100 text-purple-700 rounded-md font-medium"
                      >
                        Reading Quiz
                      </Badge>
                    </div>
                  </motion.div>
                </div>

                {/* Zen Mode Block */}
                <motion.div
                  className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-4 border border-orange-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-800">
                        Zen Mode Session
                      </h5>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span className="font-normal">Today at 3:00 PM</span>
                        <span>•</span>
                        <span className="font-normal">90 minutes</span>
                      </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700 rounded-md text-xs font-medium">
                      Scheduled
                    </Badge>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-2xl flex items-center justify-center shadow-lg"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-300 rounded-xl flex items-center justify-center shadow-lg"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
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
                Sign in to your account to continue your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="magic">Magic Link</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="firstname.lastname@college.edu"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                      </div>
                      <Button type="submit" className="w-full">
                        Sign In
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="magic">
                  <form>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="magic-email">Email</Label>
                        <Input
                          id="magic-email"
                          type="email"
                          placeholder="firstname.lastname@college.edu"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Send Magic Link
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
                <Button variant="outline" className="w-full">
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
                <Button variant="outline" className="w-full">
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
