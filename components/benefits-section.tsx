"use client"

import { useEffect, useState, useRef, useMemo, useCallback } from "react"
import { CheckCircle, MessageCircle, Layers, Filter, Shield } from "lucide-react"

export function BenefitsSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const benefits = useMemo(() => [
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Verified PG listings",
      description: "All listings include real photos and accurate information",
      color: "from-purple-500 to-pink-500",
      details: [
        "Every photo is timestamped and verified",
        "360° room tours available for premium listings",
        "Amenities checklist verified by our team",
      ],
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Direct communication",
      description: "Talk directly with PG owners — no brokers or middlemen",
      color: "from-pink-500 to-purple-500",
      details: [
        "Instant messaging with PG owners",
        "Schedule visits directly through the app",
        "No commission or hidden fees",
      ],
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Transparent details",
      description: "Clear rent, rules, and amenities information upfront",
      color: "from-purple-600 to-pink-500",
      details: ["Detailed breakdown of all costs", "House rules clearly listed", "Meal schedules and sample menus"],
    },
    {
      icon: <Filter className="h-8 w-8" />,
      title: "Advanced filtering",
      description: "Filter by gender, meals, AC, location, and more",
      color: "from-pink-600 to-purple-500",
      details: [
        "Search by commute time to your workplace",
        "Filter by amenities that matter to you",
        "Sort by verified ratings and reviews",
      ],
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "On-ground verification",
      description: "Optional verification by our team for complete peace of mind",
      color: "from-purple-500 to-pink-600",
      details: [
        "In-person visits by our verification team",
        "Detailed reports with pros and cons",
        "Background checks on PG management",
      ],
    },
  ], [])

  const handleTabClick = useCallback((index: number) => {
    setActiveTab(index)
    
    setTimeout(() => {
      if (tabsRef.current && tabRefs.current[index]) {
        const container = tabsRef.current
        const tab = tabRefs.current[index]
        
        if (!tab) return
        
        // Calculate scroll position to center the tab
        const containerRect = container.getBoundingClientRect()
        const tabRect = tab.getBoundingClientRect()
        
        // Account for container's current scroll position
        const scrollLeft = tab.offsetLeft - (containerRect.width / 2) + (tabRect.width / 2)
        
        // Clamp scroll position to valid range to prevent overscrolling
        const maxScroll = container.scrollWidth - containerRect.width
        const clampedScroll = Math.max(0, Math.min(scrollLeft, maxScroll))
        
        container.scrollTo({
          left: clampedScroll,
          behavior: 'smooth'
        })
      }
    }, 50)
  }, [])
  
  // Initialize tab refs when benefits change
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, benefits.length)
  }, [benefits])

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
    <section id="benefits" ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100">
      {/* Floating shapes - Optimized */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-purple-400/5 to-pink-400/5 blur-xl transition-all duration-1000 delay-200 transform ${
            isInView ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-10 -translate-y-10"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tl from-pink-400/5 to-purple-400/5 blur-xl transition-all duration-1000 delay-400 transform ${
            isInView ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-10 translate-y-10"
          }`}
        ></div>

        {/* Decorative elements - Optimized */}
        <div
          className={`absolute top-20 right-20 w-40 h-40 transition-all duration-1000 delay-500 transform ${
            isInView ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-45 scale-50"
          }`}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
            <path
              fill="#9333EA"
              d="M41.9,-71.3C53.5,-64.6,61.8,-52.1,68.2,-38.9C74.6,-25.7,79.1,-12.8,79.3,0.1C79.5,13.1,75.3,26.1,68.4,37.8C61.5,49.5,51.8,59.8,40,66.5C28.2,73.2,14.1,76.3,0.2,76C-13.7,75.7,-27.4,72.1,-39.6,65.5C-51.8,58.9,-62.5,49.3,-69.7,37.3C-76.9,25.3,-80.6,10.7,-80.1,-3.8C-79.6,-18.3,-74.9,-32.7,-66.4,-44.9C-57.9,-57.1,-45.6,-67.1,-32.4,-72.6C-19.2,-78.1,-5.1,-79.1,8.1,-77.1C21.3,-75.1,42.6,-70.1,41.9,-71.3Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div
          className={`absolute bottom-20 left-20 w-40 h-40 transition-all duration-1000 delay-600 transform ${
            isInView ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-50"
          }`}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
            <path
              fill="#EC4899"
              d="M45.3,-76.2C59.9,-69.5,73.5,-59.2,81.1,-45.3C88.7,-31.5,90.3,-14.3,88.9,2.3C87.5,18.9,83.1,34.8,74.4,48.5C65.7,62.2,52.7,73.6,38,79.8C23.3,86,6.9,87,-9.2,84.7C-25.3,82.4,-41.1,76.8,-54.8,67.5C-68.5,58.2,-80.1,45.2,-85.7,30C-91.3,14.8,-90.9,-2.6,-86.2,-18.8C-81.5,-35,-72.5,-49.9,-60,-61.4C-47.5,-72.9,-31.5,-81,-15.2,-83.1C1.1,-85.2,17.5,-81.3,30.7,-78.2C43.9,-75.1,54,-75.8,45.3,-76.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section title */}
          <div
            className={`mb-16 transition-opacity duration-1000 ${
              isInView ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent text-center mb-6">
              How We <span className="text-purple-900">Help</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>

          {/* Interactive tabs */}
          <div className="relative">
            {/* 3D Phone mockup - Optimized */}
            <div
              className={`relative mx-auto w-[280px] h-[580px] md:w-[320px] md:h-[650px] transition-all duration-1000 delay-200 ${
                isInView ? "opacity-100 transform perspective-1000 rotateY-0 rotateX-0" : "opacity-0 transform perspective-1000 rotateY-3 rotateX-5"
              }`}
            >
              {/* Phone frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[40px] shadow-xl">
                {/* Screen */}
                <div className="absolute inset-2 rounded-[32px] bg-gradient-to-br from-purple-900 to-pink-900 overflow-hidden">
                  {/* Status bar */}
                  <div className="h-6 bg-black/20 flex items-center justify-between px-4">
                    <span className="text-white text-xs">9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-white/80"></div>
                      <div className="w-3 h-3 rounded-full bg-white/80"></div>
                      <div className="w-3 h-3 rounded-full bg-white/80"></div>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-bold text-lg">PGNear.me</h3>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* App content */}
                  <div className="p-4">
                    {/* Feature content based on active tab */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 h-[450px] overflow-y-auto">
                      <div className="flex items-center space-x-3 mb-4">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${benefits[activeTab].color} flex items-center justify-center text-white transition-all duration-500 ease-in-out transform`}
                        >
                          {benefits[activeTab].icon}
                        </div>
                        <h4 className="text-white font-bold">{benefits[activeTab].title}</h4>
                      </div>

                      <p className="text-white/80 text-sm mb-6">{benefits[activeTab].description}</p>

                      {/* Feature details */}
                      <div className="space-y-4">
                        {benefits[activeTab].details.map((detail, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <div className="w-5 h-5 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                              <CheckCircle className="h-3 w-3 text-white" />
                            </div>
                            <p className="text-white/90 text-sm">{detail}</p>
                          </div>
                        ))}
                      </div>

                      {/* Mock UI elements based on active tab */}
                      {activeTab === 0 && (
                        <div className="mt-6 space-y-3">
                          <div className="bg-white/10 rounded-lg p-3 flex items-center">
                            <div className="w-12 h-12 bg-purple-500/30 rounded-md mr-3"></div>
                            <div>
                              <div className="h-2 w-24 bg-white/40 rounded-full mb-2"></div>
                              <div className="h-2 w-16 bg-white/20 rounded-full"></div>
                            </div>
                            <div className="ml-auto">
                              <div className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">Verified</div>
                            </div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3 flex items-center">
                            <div className="w-12 h-12 bg-pink-500/30 rounded-md mr-3"></div>
                            <div>
                              <div className="h-2 w-20 bg-white/40 rounded-full mb-2"></div>
                              <div className="h-2 w-14 bg-white/20 rounded-full"></div>
                            </div>
                            <div className="ml-auto">
                              <div className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">Verified</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 1 && (
                        <div className="mt-6 bg-white/10 rounded-lg p-3">
                          <div className="flex justify-between mb-3">
                            <div className="h-2 w-20 bg-white/40 rounded-full"></div>
                            <div className="h-2 w-10 bg-white/20 rounded-full"></div>
                          </div>
                          <div className="space-y-2">
                            <div className="bg-purple-500/20 rounded-lg p-2 ml-auto max-w-[80%]">
                              <div className="h-2 w-full bg-white/20 rounded-full mb-1"></div>
                              <div className="h-2 w-3/4 bg-white/20 rounded-full"></div>
                            </div>
                            <div className="bg-pink-500/20 rounded-lg p-2 max-w-[80%]">
                              <div className="h-2 w-full bg-white/20 rounded-full mb-1"></div>
                              <div className="h-2 w-1/2 bg-white/20 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 2 && (
                        <div className="mt-6 space-y-3">
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="flex justify-between mb-2">
                              <div className="h-2 w-16 bg-white/40 rounded-full"></div>
                              <div className="h-2 w-12 bg-white/60 rounded-full"></div>
                            </div>
                            <div className="h-2 w-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="flex justify-between mb-2">
                              <div className="h-2 w-20 bg-white/40 rounded-full"></div>
                              <div className="h-2 w-10 bg-white/60 rounded-full"></div>
                            </div>
                            <div className="h-2 w-3/4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                          </div>
                        </div>
                      )}

                      {activeTab === 3 && (
                        <div className="mt-6 space-y-3">
                          <div className="flex space-x-2 mb-3">
                            <div className="px-2 py-1 bg-purple-500/30 rounded-full">
                              <div className="h-2 w-10 bg-white/60 rounded-full"></div>
                            </div>
                            <div className="px-2 py-1 bg-pink-500/30 rounded-full">
                              <div className="h-2 w-8 bg-white/60 rounded-full"></div>
                            </div>
                            <div className="px-2 py-1 bg-purple-500/30 rounded-full">
                              <div className="h-2 w-12 bg-white/60 rounded-full"></div>
                            </div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-2 flex items-center">
                            <div className="w-8 h-8 bg-purple-500/30 rounded-md mr-2"></div>
                            <div className="flex-1">
                              <div className="h-2 w-3/4 bg-white/40 rounded-full mb-1"></div>
                              <div className="h-2 w-1/2 bg-white/20 rounded-full"></div>
                            </div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-2 flex items-center">
                            <div className="w-8 h-8 bg-pink-500/30 rounded-md mr-2"></div>
                            <div className="flex-1">
                              <div className="h-2 w-2/3 bg-white/40 rounded-full mb-1"></div>
                              <div className="h-2 w-1/3 bg-white/20 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 4 && (
                        <div className="mt-6 space-y-3">
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="flex items-center mb-2">
                              <div className="w-6 h-6 bg-green-500/30 rounded-full mr-2 flex items-center justify-center">
                                <CheckCircle className="h-3 w-3 text-green-300" />
                              </div>
                              <div className="h-2 w-32 bg-white/40 rounded-full"></div>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full mb-1"></div>
                            <div className="h-2 w-5/6 bg-white/10 rounded-full"></div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="flex items-center mb-2">
                              <div className="w-6 h-6 bg-green-500/30 rounded-full mr-2 flex items-center justify-center">
                                <CheckCircle className="h-3 w-3 text-green-300" />
                              </div>
                              <div className="h-2 w-28 bg-white/40 rounded-full"></div>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full mb-1"></div>
                            <div className="h-2 w-4/6 bg-white/10 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom navigation */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/30 backdrop-blur-sm flex items-center justify-around px-4">
                    {benefits.map((benefit, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTabClick(idx)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out transform ${
                          activeTab === idx 
                            ? `bg-gradient-to-br ${benefit.color} text-white shadow-lg scale-110` 
                            : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/80 hover:scale-105"
                        }`}
                      >
                        {benefit.icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-2xl"></div>
              </div>

              {/* Reflections */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-pink-500/10 to-transparent rounded-tr-[40px] pointer-events-none"></div>
            </div>

            {/* Feature tabs */}
            <div
              ref={tabsRef}
              className={`mt-12 flex flex-nowrap justify-start md:justify-center gap-1 md:gap-2 overflow-x-auto pb-4 transition-opacity duration-1000 delay-500 ${
                isInView ? "opacity-100" : "opacity-0"
              } hide-scrollbar`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {benefits.map((benefit, idx) => (
                <button
                  key={idx}
                  ref={el => { tabRefs.current[idx] = el }}
                  onClick={() => handleTabClick(idx)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all duration-300 flex items-center text-xs md:text-sm lg:text-base whitespace-nowrap ${
                    activeTab === idx
                      ? `bg-gradient-to-r ${benefit.color} text-white shadow-lg shadow-purple-500/20`
                      : "bg-white/80 backdrop-blur-sm text-purple-900 hover:bg-white"
                  }`}
                >
                  <span className="mr-1.5 md:mr-2 block text-base md:text-lg">{benefit.icon}</span>
                  {benefit.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

