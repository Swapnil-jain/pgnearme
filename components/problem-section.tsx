"use client"

import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import { Camera, Star, DollarSign, Phone, Sun, List } from "lucide-react"

export function ProblemSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const problems = useMemo(() => [
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Outdated or fake photos",
      description: "Listings on Google Maps or other platforms often show misleading images",
      color: "from-purple-500 to-indigo-600",
      details: [
        "Photos from years ago that don't reflect current conditions",
        "Stock images used instead of actual PG photos",
        "Selective angles that hide important details",
      ],
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Misleading reviews",
      description: "Can't trust reviews from past tenants that might be biased or outdated",
      color: "from-fuchsia-500 to-purple-600",
      details: [
        "Fake reviews posted by PG owners",
        "Old reviews that don't reflect current conditions",
        "No way to verify review authenticity",
      ],
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "No clear pricing",
      description: "Hidden costs and unclear pricing structures lead to surprises later",
      color: "from-violet-500 to-purple-600",
      details: [
        "Additional charges not mentioned upfront",
        "Different prices quoted in person vs online",
        "No transparency in deposit and maintenance fees",
      ],
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Endless phone calls",
      description: "Constant calls and messages with brokers who often ghost you",
      color: "from-pink-500 to-fuchsia-600",
      details: [
        "Brokers not responding after initial contact",
        "Multiple brokers for the same property",
        "No direct communication with PG owners",
      ],
    },
    {
      icon: <Sun className="h-8 w-8" />,
      title: "Wasted visits",
      description: "Physically visiting PGs in the hot sun just to check basic details",
      color: "from-blue-500 to-violet-600",
      details: [
        "Traveling long distances for unsuitable PGs",
        "No virtual tours or detailed information online",
        "Time wasted on properties that don't match requirements",
      ],
    },
    {
      icon: <List className="h-8 w-8" />,
      title: "No consolidated list",
      description: "No single trustworthy source of PG information online",
      color: "from-indigo-500 to-purple-600",
      details: [
        "Scattered information across multiple platforms",
        "No standardized format for PG listings",
        "Difficulty in comparing different PGs",
      ],
    },
  ], [])

  const handleTabClick = useCallback((index: number) => {
    setActiveTab(index)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="problem" className="py-12 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600 will-change-transform"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5MzNFRkYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoNHYxaC00di0xem0wLTJoMXY0aC0xdi00em0tNSAyaDR2MWgtNHYtMXptMCAyaDF2LTRoLTF2NHpNMjQgMzBoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNSAyaDR2MWgtNHYtMXptMCAyaDF2LTRoLTF2NHptLTUtOGg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6bS01IDJoNHYxaC00di0xem0wIDJoMXYtNGgtMXY0em0tNSAyaDR2MWgtNHYtMXptMCAyaDF2LTRoLTF2NHptLTUtOGg0djFoLTR2LTF6bTAgMmgxdi00aC0xdjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 will-change-opacity"></div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section title */}
          <div
            className={`mb-8 md:mb-16 transition-all duration-1000 ${
              isInView ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4 md:mb-6">
              The PG Hunt <span className="text-pink-400">Problem</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>

          {/* Laptop mockup - Mobile optimized */}
          <div className="relative mx-auto w-full max-w-4xl">
            {/* Laptop base */}
            <div className="relative bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
              {/* Screen */}
              <div className="relative aspect-[4/3] md:aspect-video bg-gradient-to-br from-purple-900 to-pink-900 overflow-hidden">
                {/* Browser chrome */}
                <div className="absolute top-0 left-0 right-0 h-6 md:h-8 bg-gray-900 flex items-center px-3 md:px-4">
                  <div className="flex space-x-1 md:space-x-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 mx-2 md:mx-4 h-4 md:h-6 bg-gray-800 rounded-full flex items-center px-2 md:px-3">
                    <span className="text-gray-400 text-[10px] md:text-xs">pgnear.me/problems</span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 pt-6 md:pt-8">
                  <div className="h-full flex">
                    {/* Sidebar - Hidden on mobile */}
                    <div className="hidden md:block w-16 bg-gray-800/50 border-r border-gray-700 flex flex-col items-center py-4 pl-2">
                      {problems.map((problem, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleTabClick(idx)}
                          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-500 ease-in-out ${
                            activeTab === idx
                              ? `bg-gradient-to-br ${problem.color} text-white shadow-lg scale-110`
                              : "bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-gray-300 hover:scale-105"
                          }`}
                        >
                          {problem.icon}
                        </button>
                      ))}
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-3 md:p-6 overflow-y-auto">
                      <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                        <div
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${problems[activeTab].color} flex items-center justify-center text-white transition-all duration-500 ease-in-out transform`}
                        >
                          {problems[activeTab].icon}
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white">{problems[activeTab].title}</h3>
                          <p className="text-purple-200 text-sm md:text-base">{problems[activeTab].description}</p>
                        </div>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        {problems[activeTab].details.map((detail, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-purple-400"></div>
                            </div>
                            <p className="text-white/90 text-sm md:text-base">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keyboard area */}
              <div className="h-3 md:h-4 bg-gray-900"></div>
              <div className="h-6 md:h-8 bg-gray-800 rounded-b-lg"></div>
            </div>

            {/* Laptop stand */}
            <div className="mx-auto w-24 md:w-32 h-3 md:h-4 bg-gray-900 rounded-b-lg"></div>
          </div>

          {/* Bottom tabs - Mobile optimized */}
          <div
            className={`mt-8 md:mt-12 flex flex-nowrap justify-start md:justify-center gap-1 md:gap-2 overflow-x-auto pb-4 transition-opacity duration-1000 delay-500 ${
              isInView ? "opacity-100" : "opacity-0"
            }`}
          >
            {problems.map((problem, idx) => (
              <button
                key={idx}
                onClick={() => handleTabClick(idx)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all duration-300 flex items-center text-xs md:text-sm lg:text-base whitespace-nowrap ${
                  activeTab === idx
                    ? `bg-gradient-to-r ${problem.color} text-white shadow-lg shadow-purple-500/20`
                    : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
                }`}
              >
                <span className="mr-1.5 md:mr-2 block text-base md:text-lg">{problem.icon}</span>
                {problem.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

