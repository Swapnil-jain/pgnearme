"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, MapPin, ArrowLeft, CheckCircle, Home, Search, Calendar, Check, Sun } from "lucide-react"
import { SurveySection } from "@/components/survey-section"
import { z } from "zod"

// Email validation schema
const emailSchema = z.string().email("Please enter a valid email address")

interface SurveyData {
  age: string;
  findMethod: string;
  frustration: string;
  payForSchedule: string;
}

interface HeroSectionProps {
  onEmailSubmit: (email: string) => Promise<{ success: boolean; message?: string }>;
  onSurveyComplete: (surveyData: SurveyData) => void;
}

export function HeroSection({ onEmailSubmit, onSurveyComplete }: HeroSectionProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [showSurvey, setShowSurvey] = useState(false)
  const [surveyCompleted, setSurveyCompleted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Validate email
      const validatedEmail = emailSchema.parse(email)
      
      const result = await onEmailSubmit(validatedEmail)
      if (result.success) {
        setShowSurvey(true)
      } else {
        setError(result.message || "Something went wrong. Please try again.")
        setShowSurvey(false)
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
      setShowSurvey(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSurveyComplete = (surveyData: SurveyData) => {
    setSurveyCompleted(true)
    onSurveyComplete(surveyData)
  }

  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Find",
      description: "Browse verified PGs with real photos and reviews",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Schedule",
      description: "Book visits directly with owners, no middlemen",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: <Sun className="h-8 w-8" />,
      title: "Save Time",
      description: "Ever visited dozens of PGs in the hot weather, only to find disappointment ?",
      color: "from-purple-600 to-pink-600",
    },
  ]

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden py-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5MzNFRkYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoNHYxaC00di0xem0wLTJoMXY0aC0xdi00em0tNSAyaDR2MWgtNHYtMXptMCAyaDF2LTRoLTF2NHpNMjQgMzBoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNSAyaDR2MWgtNHYtMXptMCAyaDF2LTRoLTF2NHptLTUtOGg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6bS01IDJoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNSAyaDR2MWgtNHYtMXptMCAyaDF2LTRoLTF2NHptLTUtOGg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

      {/* Animated figures */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating house */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 animate-float-slow">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-lg blur-xl"></div>
            <Home className="h-16 w-16 text-white/30" />
          </div>
        </div>
        {/* Floating checkmark */}
        <div className="absolute top-1/3 right-1/4 w-12 h-12 animate-float-slow" style={{ animationDelay: "1s" }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl"></div>
            <Check className="h-12 w-12 text-white/30" />
          </div>
        </div>
        {/* Floating calendar */}
        <div className="absolute bottom-1/4 left-1/3 w-14 h-14 animate-float-slow" style={{ animationDelay: "2s" }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-lg blur-xl"></div>
            <Calendar className="h-14 w-14 text-white/30" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center">
          {!showSurvey ? (
            <>
              {/* Headline */}
              <div className="w-full max-w-4xl mb-8 md:mb-24">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center leading-tight">
                  <span className="block text-white/90 mb-2 md:mb-6 animate-slide-in-right whitespace-nowrap">
                    Stop wasting
                  </span>
                  <span className="block text-white/90 mb-2 md:mb-6 animate-slide-in-right whitespace-nowrap" style={{ animationDelay: "0.2s" }}>
                    weekends
                  </span>
                  <span className="block text-white/90 animate-slide-in-right whitespace-nowrap" style={{ animationDelay: "0.4s" }}>
                    hunting PGs
                  </span>
                </h1>
              </div>

              {/* Steps */}
              <div className="w-full max-w-4xl mx-auto mb-8 md:mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`relative p-4 md:p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 transition-all duration-500 ${
                        index === activeStep ? "scale-105" : "scale-95"
                      }`}
                    >
                      <div className="flex items-center mb-2 md:mb-4">
                        <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br ${step.color} mr-3 md:mr-4`}>
                          {step.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-base md:text-lg text-white/80">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email form */}
              <div
                ref={formRef}
                className="w-full max-w-md mx-auto px-4 md:px-0"
              >
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 md:h-16 rounded-lg border-purple-200 bg-white/80 backdrop-blur-sm focus:ring-purple-500 focus:border-purple-500 pr-12 text-lg md:text-xl"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400">
                        <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                    </div>
                    {error && <p className="mt-1 text-sm md:text-base text-pink-300">{error}</p>}
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 md:h-16 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 relative overflow-hidden group text-lg md:text-xl"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 group-hover:scale-105 transition-transform duration-500"></span>
                    <span className="absolute -inset-px bg-gradient-to-r from-pink-300 to-purple-300 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></span>
                    <span className="relative flex items-center justify-center">
                      That Sounds Like Me
                      <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  <p className="text-md md:text-lg text-white/70 text-center mt-2 whitespace-nowrap">
                    We won't spam. Promise.
                  </p>
                </form>
              </div>

              {/* Scroll indicator - disappears on scroll */}
              <div
                className={`mt-16 transition-all duration-500 ${
                  scrolled ? "opacity-0" : "opacity-100 animate-bounce-slow"
                }`}
              >
                <div className="flex flex-col items-center">
                  <p className="text-white/80 mb-2">Scroll to explore</p>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 5V19M12 19L5 12M12 19L19 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white/80"
                    />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full transition-all duration-500 ease-in-out animate-fade-in-up">
              {surveyCompleted ? (
                <div className="bg-white/90 rounded-xl p-10 backdrop-blur-sm shadow-xl max-w-2xl mx-auto text-center">
                  <div className="flex justify-center mb-6 animate-bounce-slow">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 blur-md rounded-full"></div>
                      <div className="relative bg-white rounded-full p-4">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                      </div>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-purple-900 mb-4">Thank You!</h2>
                  <p className="text-lg text-purple-800/70 mb-8">
                    Your feedback is incredibly valuable.
                  </p>
                  <Button
                    onClick={() => {
                      setShowSurvey(false)
                      setSurveyCompleted(false)
                      setEmail("")
                    }}
                    className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 group-hover:scale-105 transition-transform duration-500"></span>
                    <span className="absolute -inset-px bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></span>
                    <span className="relative flex items-center">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Return to Home
                    </span>
                  </Button>
                </div>
              ) : (
                <SurveySection 
                  email={email} 
                  onComplete={handleSurveyComplete} 
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-purple-300/20 to-pink-300/20 blur-xl"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-gradient-to-tl from-pink-300/20 to-purple-300/20 blur-xl"></div>
    </section>
  )
}

