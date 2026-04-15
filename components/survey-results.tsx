"use client"

import { useEffect, useState, useRef } from "react"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid,
} from "recharts"
import { Users, ClipboardCheck, TrendingUp, Frown, Search, IndianRupee, Zap, ArrowRight } from "lucide-react"
import {
  surveyStats, ageData, findMethodData,
  frustrationData, payForScheduleData, signupTimeline,
} from "@/lib/survey-data"

// Animated counter card
function StatCard({ icon, label, value, suffix, highlight }: {
  icon: React.ReactNode; label: string; value: number; suffix?: string; highlight?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true)
        let start = 0
        const duration = 1400
        const step = (timestamp: number) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * value))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div ref={ref} className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-purple-100/50 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-4 shadow-lg shadow-purple-500/20">
          {icon}
        </div>
        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-1">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-sm text-purple-800/50 font-medium">{label}</div>
        {highlight && (
          <div className="mt-3 text-xs bg-purple-50 text-purple-700 rounded-full px-3 py-1 inline-block font-medium">
            {highlight}
          </div>
        )}
      </div>
    </div>
  )
}

// Insight callout
function InsightCallout({ icon, text, color = "purple" }: { icon: React.ReactNode; text: string; color?: string }) {
  const bg = color === "pink" ? "from-pink-500/10 to-purple-500/10" : "from-purple-500/10 to-pink-500/10"
  const border = color === "pink" ? "border-pink-200/50" : "border-purple-200/50"
  const iconBg = color === "pink" ? "bg-pink-100" : "bg-purple-100"
  const iconColor = color === "pink" ? "text-pink-600" : "text-purple-600"

  return (
    <div className={`flex items-start gap-3 bg-gradient-to-r ${bg} rounded-xl p-4 border ${border}`}>
      <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <p className="text-sm md:text-base text-purple-900/80 leading-relaxed">{text}</p>
    </div>
  )
}

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-8 text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-purple-900 mb-2">
        {children}
      </h3>
      {subtitle && <p className="text-purple-800/50 text-sm md:text-base max-w-lg mx-auto">{subtitle}</p>}
    </div>
  )
}

function ChartCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 shadow-lg border border-purple-100/50 ${className}`}>
      {children}
    </div>
  )
}

const COLORS = ["#a855f7", "#ec4899", "#7c3aed", "#f472b6", "#9333ea"]
const PIE_COLORS_AGE = ["#c084fc", "#a855f7", "#9333ea", "#7e22ce"]
const PIE_COLORS_PAY = ["#a855f7", "#ec4899", "#7c3aed"]

// Compact percentage label rendered inside/near slices
function renderPercentLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  if (percent < 0.04) return null
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

// Legend rendered below the pie chart
function PieLegend({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-1.5 text-sm text-purple-900/70">
          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
          <span>{d.label}</span>
          <span className="text-purple-500 font-semibold">({((d.value / total) * 100).toFixed(0)}%)</span>
        </div>
      ))}
    </div>
  )
}

export function SurveyResults() {
  return (
    <section id="results" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-pink-50/50 to-purple-100"></div>

      {/* Subtle decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-purple-500 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
              Real Data from Real People
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4">
            Survey Findings
          </h2>
          <p className="text-purple-800/50 text-lg md:text-xl max-w-2xl mx-auto">
            What 725 people told us about the PG hunting experience across India.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-6"></div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-20">
          <StatCard
            icon={<Users className="h-7 w-7" />}
            label="People Signed Up"
            value={surveyStats.totalSignups}
            highlight="Apr - Aug 2025"
          />
          <StatCard
            icon={<ClipboardCheck className="h-7 w-7" />}
            label="Surveys Completed"
            value={surveyStats.totalSurveys}
            highlight="5-question survey"
          />
          <StatCard
            icon={<TrendingUp className="h-7 w-7" />}
            label="Completion Rate"
            value={surveyStats.completionRate}
            suffix="%"
            highlight="Industry avg: ~30%"
          />
        </div>

        {/* Signup timeline */}
        <div className="mb-16 md:mb-20 relative z-[1]">
          <SectionTitle subtitle="Most signups came in the first 72 hours — classic launch spike">
            Signup Momentum
          </SectionTitle>
          <ChartCard>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={signupTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9333ea" }} />
                <YAxis tick={{ fontSize: 12, fill: "#9333ea" }} />
                <Tooltip
                  contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e9d5ff", borderRadius: "12px", boxShadow: "0 4px 20px rgba(147,51,234,0.1)" }}
                  labelStyle={{ color: "#7e22ce", fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="value" name="Signups" stroke="#a855f7" strokeWidth={3} fill="url(#colorSignups)" dot={{ fill: "#a855f7", r: 4 }} activeDot={{ r: 6, fill: "#7c3aed" }} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <InsightCallout
                icon={<Zap className="h-4 w-4" />}
                text="436 of 725 signups (60%) came within the first 3 days. Long-tail signups continued for 4 months, indicating sustained organic interest."
              />
            </div>
          </ChartCard>
        </div>

        {/* Two-column: Age + Pay */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20 relative z-[2]">
          {/* Age distribution */}
          <div>
            <SectionTitle subtitle="Who is looking for PGs?">
              Age of Respondents
            </SectionTitle>
            <ChartCard className="">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={ageData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={4}
                    label={renderPercentLabel}
                    labelLine={false}
                  >
                    {ageData.map((entry, idx) => (
                      <Cell key={idx} fill={PIE_COLORS_AGE[idx]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e9d5ff", borderRadius: "12px" }}
                    formatter={(value: number) => [`${value} people`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <PieLegend data={ageData} />
              <div className="mt-4">
                <InsightCallout
                  icon={<Users className="h-4 w-4" />}
                  text="90% of respondents are aged 18-30, with the 18-24 bracket making up 56% alone. PG hunting is overwhelmingly a young-adult problem."
                />
              </div>
            </ChartCard>
          </div>

          {/* Pay for schedule */}
          <div>
            <SectionTitle subtitle="Would you pay Rs.99 to instantly schedule a PG visit?">
              Willingness to Pay
            </SectionTitle>
            <ChartCard className="">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={payForScheduleData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={4}
                    label={renderPercentLabel}
                    labelLine={false}
                  >
                    {payForScheduleData.map((entry, idx) => (
                      <Cell key={idx} fill={PIE_COLORS_PAY[idx]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e9d5ff", borderRadius: "12px" }}
                    formatter={(value: number) => [`${value} people`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <PieLegend data={payForScheduleData} />
              <div className="mt-4">
                <InsightCallout
                  icon={<IndianRupee className="h-4 w-4" />}
                  text="61% said 'Yes' or 'Maybe' — showing real demand for a paid scheduling feature. The 'Maybe' segment (45%) represents a conversion opportunity with the right nudge."
                  color="pink"
                />
              </div>
            </ChartCard>
          </div>
        </div>

        {/* Frustration — the hero chart */}
        <div className="mb-16 md:mb-20 relative z-[3]">
          <SectionTitle subtitle="What makes PG hunting so painful? The top 5 frustrations are remarkably close.">
            <span className="inline-flex items-center gap-2">
              <Frown className="h-8 w-8 text-pink-500" />
              The Pain Points
            </span>
          </SectionTitle>
          <ChartCard>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={frustrationData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: "#9333ea" }} />
                <YAxis
                  type="category"
                  dataKey="label"
                  tick={{ fontSize: 12, fill: "#6b21a8" }}
                  width={170}
                />
                <Tooltip
                  contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e9d5ff", borderRadius: "12px", boxShadow: "0 4px 20px rgba(147,51,234,0.1)" }}
                  labelStyle={{ color: "#7e22ce", fontWeight: 600 }}
                  formatter={(value: number) => [`${value} responses (${((value / 539) * 100).toFixed(0)}%)`, ""]}
                />
                <Bar dataKey="value" name="Responses" radius={[0, 8, 8, 0]} barSize={32}>
                  {frustrationData.map((_entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              <InsightCallout
                icon={<Frown className="h-4 w-4" />}
                text="The top 4 frustrations are within 11 votes of each other (111-122). This isn't one problem — it's a systemic failure across reviews, listings, info, and physical effort."
                color="pink"
              />
              <InsightCallout
                icon={<ArrowRight className="h-4 w-4" />}
                text="'Fake/Unavailable Reviews' edged out as #1 — trust is the single biggest gap. People don't just want listings, they want reliable listings."
              />
            </div>
          </ChartCard>
        </div>

        {/* Find method */}
        <div className="mb-16 md:mb-20 relative z-[4]">
          <SectionTitle subtitle="How did respondents discover their last PG accommodation?">
            <span className="inline-flex items-center gap-2">
              <Search className="h-8 w-8 text-purple-500" />
              Discovery Methods
            </span>
          </SectionTitle>
          <ChartCard>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={findMethodData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: "#9333ea" }} />
                <YAxis
                  type="category"
                  dataKey="label"
                  tick={{ fontSize: 12, fill: "#6b21a8" }}
                  width={190}
                />
                <Tooltip
                  contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e9d5ff", borderRadius: "12px", boxShadow: "0 4px 20px rgba(147,51,234,0.1)" }}
                  labelStyle={{ color: "#7e22ce", fontWeight: 600 }}
                  formatter={(value: number) => [`${value} responses (${((value / 539) * 100).toFixed(0)}%)`, ""]}
                />
                <Bar dataKey="value" name="Responses" radius={[0, 8, 8, 0]} barSize={32}>
                  {findMethodData.map((_entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <InsightCallout
                icon={<Search className="h-4 w-4" />}
                text="39% haven't lived in a PG yet — they're first-timers entering an unfamiliar market. The second biggest group (25%) found PGs through friends, not platforms. This signals a massive discovery gap."
              />
            </div>
          </ChartCard>
        </div>

        {/* Key takeaways */}
        <div className="relative z-[5]">
          <SectionTitle subtitle="What this data means for anyone building in this space">
            Key Takeaways
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <ChartCard className="relative h-full">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-900 mb-1">Core demographic: 18-24</h4>
                    <p className="text-sm text-purple-800/60 leading-relaxed">
                      56% of all respondents. Students and early professionals are the primary audience. Design for mobile-first, price-sensitive users.
                    </p>
                  </div>
                </div>
              </ChartCard>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <ChartCard className="relative h-full">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Frown className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-900 mb-1">Trust is the #1 problem</h4>
                    <p className="text-sm text-purple-800/60 leading-relaxed">
                      Fake reviews and photos dominate complaints. Whoever solves verification wins this market. It&apos;s not about more listings — it&apos;s about trustworthy ones.
                    </p>
                  </div>
                </div>
              </ChartCard>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <ChartCard className="relative h-full">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <IndianRupee className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-900 mb-1">Demand for paid scheduling</h4>
                    <p className="text-sm text-purple-800/60 leading-relaxed">
                      61% open to paying for instant visit scheduling. Even at just Rs.99, this validates a transactional model — not just an ad-supported one.
                    </p>
                  </div>
                </div>
              </ChartCard>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <ChartCard className="relative h-full">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Search className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-900 mb-1">Discovery is broken</h4>
                    <p className="text-sm text-purple-800/60 leading-relaxed">
                      39% are first-time PG seekers. 25% rely on word-of-mouth. Only 17% use Google. There&apos;s no dominant platform — the market is wide open.
                    </p>
                  </div>
                </div>
              </ChartCard>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <ChartCard className="relative h-full">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-900 mb-1">74% survey completion</h4>
                    <p className="text-sm text-purple-800/60 leading-relaxed">
                      Industry average for post-signup surveys is ~30%. Our 74% rate signals deep engagement — these people genuinely care about solving this problem.
                    </p>
                  </div>
                </div>
              </ChartCard>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <ChartCard className="relative h-full">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-900 mb-1">Evenly distributed pain</h4>
                    <p className="text-sm text-purple-800/60 leading-relaxed">
                      All 5 frustrations scored within 22% of each other. This isn&apos;t one fixable thing — it&apos;s an end-to-end experience problem requiring a holistic solution.
                    </p>
                  </div>
                </div>
              </ChartCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
