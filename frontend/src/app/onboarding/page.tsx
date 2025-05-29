"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Lock,
} from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0); // -1 for back, 1 for forward
  const totalSteps = 3;

  const nextStep = () => {
    setDirection(1);
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Navigate to dashboard when completed
      window.location.href = "/dashboard";
    }
  };

  const prevStep = () => {
    setDirection(-1);
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Animation variants for step transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Animation variants for step content
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-8"
        >
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            InCourse
          </h1>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step > index + 1
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : step === index + 1
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > index + 1 ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </motion.div>
                <span
                  className={`text-sm mt-2 ${
                    step >= index + 1 ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {index === 0
                    ? "Connect LMS"
                    : index === 1
                    ? "Select Courses"
                    : "Learning Preferences"}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full"
            >
              <Card className="w-full shadow-lg border-none">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <CardHeader>
                        <motion.div variants={itemVariants}>
                          <CardTitle className="text-2xl font-bold">
                            Connect your learning platform
                          </CardTitle>
                          <CardDescription>
                            InCourse integrates with your LMS to access your
                            course materials
                          </CardDescription>
                        </motion.div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <motion.div variants={itemVariants}>
                          <Tabs defaultValue="oauth" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="oauth">OAuth</TabsTrigger>
                              <TabsTrigger value="api">API Token</TabsTrigger>
                            </TabsList>
                            <TabsContent value="oauth" className="space-y-4">
                              <div className="flex items-center justify-center p-6 border rounded-lg bg-gray-50">
                                <Button className="w-full max-w-sm">
                                  <svg
                                    className="mr-2 h-4 w-4"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"
                                      fill="#F25022"
                                    />
                                  </svg>
                                  Connect with Canvas
                                </Button>
                              </div>
                            </TabsContent>
                            <TabsContent value="api" className="space-y-4">
                              <div className="grid gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="canvas-url">Canvas URL</Label>
                                  <Input
                                    id="canvas-url"
                                    placeholder="https://canvas.university.edu"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="api-token">API Token</Label>
                                  <Input id="api-token" type="password" />
                                  <p className="text-sm text-muted-foreground">
                                    You can find your API token in Canvas under
                                    Account &gt; Settings &gt; Approved
                                    Integrations
                                  </p>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <div className="flex items-start space-x-2 p-4 bg-gray-50 rounded-lg">
                            <Lock className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                Privacy & Security
                              </p>
                              <p className="text-sm text-muted-foreground">
                                We only access the course materials you
                                explicitly share. Your data is encrypted and
                                never shared with third parties.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </CardContent>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <CardHeader>
                        <motion.div variants={itemVariants}>
                          <CardTitle className="text-2xl font-bold">
                            Select your courses
                          </CardTitle>
                          <CardDescription>
                            Choose which courses you want to use with InCourse
                          </CardDescription>
                        </motion.div>
                      </CardHeader>
                      <CardContent>
                        <motion.div
                          variants={itemVariants}
                          className="space-y-4"
                        >
                          {[
                            {
                              id: "course1",
                              name: "CS 101: Introduction to Computer Science",
                              instructor: "Dr. Smith",
                              term: "Fall 2023",
                            },
                            {
                              id: "course2",
                              name: "ECON 201: Macroeconomics",
                              instructor: "Prof. Johnson",
                              term: "Fall 2023",
                            },
                            {
                              id: "course3",
                              name: "PSYCH 110: Introduction to Psychology",
                              instructor: "Dr. Williams",
                              term: "Fall 2023",
                            },
                            {
                              id: "course4",
                              name: "MATH 220: Calculus I",
                              instructor: "Prof. Garcia",
                              term: "Fall 2023",
                            },
                          ].map((course) => (
                            <motion.div
                              key={course.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              whileHover={{ scale: 1.02 }}
                              className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                            >
                              <Checkbox
                                id={course.id}
                                defaultChecked={course.id !== "course4"}
                              />
                              <div className="grid gap-1.5">
                                <Label
                                  htmlFor={course.id}
                                  className="font-medium"
                                >
                                  {course.name}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {course.instructor} • {course.term}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </CardContent>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <CardHeader>
                        <motion.div variants={itemVariants}>
                          <CardTitle className="text-2xl font-bold">
                            Learning preferences
                          </CardTitle>
                          <CardDescription>
                            Customize how you want to learn with InCourse
                          </CardDescription>
                        </motion.div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <motion.div
                          variants={itemVariants}
                          className="space-y-3"
                        >
                          <Label>Preferred learning mode</Label>
                          <RadioGroup defaultValue="balanced">
                            {[
                              {
                                id: "quiz",
                                title: "Quiz-focused",
                                description:
                                  "Emphasize quizzes and active recall for better retention",
                              },
                              {
                                id: "flashcard",
                                title: "Flashcard-focused",
                                description:
                                  "Focus on spaced repetition with flashcards",
                              },
                              {
                                id: "balanced",
                                title: "Balanced",
                                description:
                                  "Mix of summaries, quizzes, and flashcards",
                              },
                            ].map((mode) => (
                              <motion.div
                                key={mode.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.02 }}
                                className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                              >
                                <RadioGroupItem value={mode.id} id={mode.id} />
                                <div className="grid gap-1.5">
                                  <Label
                                    htmlFor={mode.id}
                                    className="font-medium"
                                  >
                                    {mode.title}
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    {mode.description}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </RadioGroup>
                        </motion.div>
                        <motion.div
                          variants={itemVariants}
                          className="space-y-3"
                        >
                          <Label>Notification preferences</Label>
                          <div className="space-y-2">
                            {[
                              {
                                id: "nudge-review",
                                label: "Nudge me to review material",
                              },
                              {
                                id: "nudge-quiz",
                                label: "Remind me to take quizzes",
                              },
                              {
                                id: "sync-calendar",
                                label: "Sync with my calendar",
                              },
                            ].map((pref) => (
                              <motion.div
                                key={pref.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox id={pref.id} defaultChecked />
                                <Label htmlFor={pref.id}>{pref.label}</Label>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>

                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="hover:bg-gray-100"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  >
                    {step === totalSteps ? "Finish" : "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
