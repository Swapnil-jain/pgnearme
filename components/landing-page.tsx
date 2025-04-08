"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "./hero-section"
import { ProblemSection } from "./problem-section"
import { BenefitsSection } from "./benefits-section"
import { Footer } from "./footer"
import { Header } from "./header"
import { DecorativeShapes } from "./decorative-shapes"
import { saveEmail, updateSurveyStatus } from '@/lib/email-service'

export default function LandingPage() {
  const [showSurvey, setShowSurvey] = useState(false)
  const [email, setEmail] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEmailSubmit = async (submittedEmail: string) => {
    const result = await saveEmail(submittedEmail)
    if (result.success) {
      setEmail(submittedEmail)
      setShowSurvey(true)
    }
    return result
  }

  const handleSurveyComplete = async (surveyData: any) => {
    await updateSurveyStatus(email, surveyData)
    setShowSurvey(false)
    setEmail("")
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

