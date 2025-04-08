"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "./hero-section"
import { ProblemSection } from "./problem-section"
import { BenefitsSection } from "./benefits-section"
import { Footer } from "./footer"
import { Header } from "./header"
import { DecorativeShapes } from "./decorative-shapes"
import { saveEmail, updateSurveyStatus } from '@/lib/email-service'

// Rate limiting configuration
const RATE_LIMIT = {
  maxAttempts: 3,
  timeWindow: 60 * 60 * 1000, // 1 hour in milliseconds
}

export default function LandingPage() {
  const [showSurvey, setShowSurvey] = useState(false)
  const [email, setEmail] = useState("")
  const [mounted, setMounted] = useState(false)
  const [submissionAttempts, setSubmissionAttempts] = useState<{ [key: string]: number }>({})
  const [lastSubmissionTime, setLastSubmissionTime] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  const isRateLimited = (email: string) => {
    const now = Date.now()
    const lastAttempt = lastSubmissionTime[email] || 0
    const attempts = submissionAttempts[email] || 0

    if (now - lastAttempt > RATE_LIMIT.timeWindow) {
      // Reset if time window has passed
      setSubmissionAttempts(prev => ({ ...prev, [email]: 0 }))
      return false
    }

    return attempts >= RATE_LIMIT.maxAttempts
  }

  const handleEmailSubmit = async (submittedEmail: string) => {
    if (isRateLimited(submittedEmail)) {
      return {
        success: false,
        message: "Too many attempts. Please try again later."
      }
    }

    const result = await saveEmail(submittedEmail)
    
    // Update rate limiting counters
    setSubmissionAttempts(prev => ({
      ...prev,
      [submittedEmail]: (prev[submittedEmail] || 0) + 1
    }))
    setLastSubmissionTime(prev => ({
      ...prev,
      [submittedEmail]: Date.now()
    }))

    if (result.success) {
      setEmail(submittedEmail)
      setShowSurvey(true)
    }
    return result
  }

  const handleSurveyComplete = async (surveyData: any) => {
    if (isRateLimited(email)) {
      return {
        success: false,
        message: "Too many attempts. Please try again later."
      }
    }

    const result = await updateSurveyStatus(email, surveyData)
    if (result.success) {
      setShowSurvey(false)
      setEmail("")
    }
    return result
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-100 via-pink-50 to-purple-100 overflow-hidden relative">
      <DecorativeShapes />
      <Header />
      <main className="flex-grow relative z-10">
        <HeroSection 
          onEmailSubmit={handleEmailSubmit} 
          onSurveyComplete={handleSurveyComplete}
        />
        {!showSurvey && (
          <>
            <ProblemSection />
            <BenefitsSection />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

