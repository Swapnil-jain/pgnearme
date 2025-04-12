"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "./hero-section"
import { ProblemSection } from "./problem-section"
import { BenefitsSection } from "./benefits-section"
import { Footer } from "./footer"
import { Header } from "./header"
import { DecorativeShapes } from "./decorative-shapes"

export default function LandingPage() {
  const [showSurvey, setShowSurvey] = useState(false)
  const [email, setEmail] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEmailSubmit = async (submittedEmail: string) => {
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: submittedEmail }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setEmail(submittedEmail)
        setShowSurvey(true)
        return { success: true }
      } else {
        return { 
          success: false, 
          message: result.error || 'Failed to save email'
        }
      }
    } catch (error) {
      //console.error('Error submitting email:', error)
      return { 
        success: false, 
        message: 'An error occurred while saving your email'
      }
    }
  }

  const handleSurveyComplete = async (surveyData: any) => {
    try {
      const response = await fetch('/api/email/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email,
          surveyData: surveyData
        }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setShowSurvey(false)
        setEmail("")
        return { success: true }
      } else {
        return { 
          success: false, 
          message: result.error || 'Failed to save survey'
        }
      }
    } catch (error) {
      //console.error('Error submitting survey:', error)
      return { 
        success: false, 
        message: 'An error occurred while saving your survey'
      }
    }
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

