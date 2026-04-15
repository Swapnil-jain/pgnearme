"use client"

import { useState, useEffect } from "react"
import { ProblemSection } from "./problem-section"
import { BenefitsSection } from "./benefits-section"
import { Footer } from "./footer"
import { Header } from "./header"
import { DecorativeShapes } from "./decorative-shapes"
import { SurveyResults } from "./survey-results"
import { MapPin, Info } from "lucide-react"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-100 via-pink-50 to-purple-100 overflow-hidden relative">
      <DecorativeShapes />
      <Header />
      <main className="flex-grow relative z-10">
        {/* Closure Notice Hero */}
        <section className="min-h-[60vh] flex flex-col justify-center relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5MzNFRkYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoNHYxaC00di0xem0wLTJoMXY0aC0xdi00em0tNSAyaDR2MWgtNHYtMXptMCAyaDF2LTRoLTF2NHpNMjQgMzBoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNSAyaDR2MWgtNHYtMXptMCAyaDF2LTRoLTF2NHptLTUtOGg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6bS01IDJoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNSAyaDR2MWgtNHYtMXptMCAyaDF2LTRoLTF2NHptLTUtOGg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6 md:mb-8">
                <MapPin className="h-8 w-8 md:h-10 md:w-10 text-white/90" />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white/90 mb-6 md:mb-8">
                PGNear.me
              </h1>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8 mb-6 md:mb-8 max-w-xl">
                <div className="flex items-start gap-3 mb-3">
                  <Info className="h-5 w-5 text-pink-300 flex-shrink-0 mt-0.5" />
                  <p className="text-lg md:text-xl text-white/90 text-left font-medium">
                    PGNear.me has been closed due to internal reasons.
                  </p>
                </div>
                <p className="text-base md:text-lg text-white/70 text-left ml-8">
                  Our survey has been completed and we collected responses from 725 people. Thank you to everyone who participated!
                </p>
              </div>

              <p className="text-lg md:text-xl text-white/60">
                Scroll down to see the survey findings.
              </p>

              <div className="mt-8 animate-bounce-slow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5V19M12 19L5 12M12 19L19 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/60"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Survey Results */}
        <SurveyResults />

        {/* Keep existing sections for context */}
        <ProblemSection />
        <BenefitsSection />
      </main>
      <Footer />
    </div>
  )
}
