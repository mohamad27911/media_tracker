"use client"

import { useState } from "react"
import { Sparkles, RefreshCw, Star, Play, Book, Gamepad2, Music, Zap, TrendingUp } from "lucide-react"

interface MediaItem {
  id: string
  title: string
  type: "Movie" | "TV Show" | "Book" | "Game" | "Music"
  status: "owned" | "whishlist" | "completed" | "currently using"
  rating: number
  genre: string
  releaseDate: string
  notes: string
  dateAdded: string
}

interface AIRecommendationsProps {
  items: MediaItem[]
}

interface Recommendation {
  title: string
  reason?: string
}

export function AIRecommendations({ items }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get completed items with high ratings for better recommendations
  const getCompletedTitles = () => {
    return items
      .filter((item) => item.status === "completed" && item.rating >= 3)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10) // Use top 10 rated completed items
      .map((item) => `${item.title} (${item.type}, ${item.genre})`)
  }

  const getRecommendations = async () => {
    const completedTitles = getCompletedTitles()

    if (completedTitles.length === 0) {
      setError("Complete and rate some media first to get personalized recommendations!")
      return
    }

    setLoading(true)
    setError(null)
    setRecommendations([])

    const GEMINI_API_KEY = "AIzaSyDdnOG2-pomHKnNZHRvykwuKY1DqwtMPfA"
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`

    const prompt = `Based on these highly-rated completed media: ${completedTitles.join(", ")}. 

Suggest 5 similar movies, TV shows, books, games, or music albums. For each recommendation, provide:
1. The title
2. A brief reason why it matches their taste

Format each recommendation as:
Title: [Name]
Reason: [Brief explanation]

Separate each recommendation with "---"`

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error?.message || `API request failed with status ${res.status}`)
      }

      const data = await res.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text

      if (!text) {
        throw new Error("Received an empty response from the AI.")
      }

      // Parse the structured response
      const recommendationBlocks = text.split("---").filter((block: string) => block.trim())
      const parsedRecommendations = recommendationBlocks.map((block: string) => {
        const lines = block.trim().split("\n")
        const titleLine = lines.find((line: string) => line.startsWith("Title:"))
        const reasonLine = lines.find((line: string) => line.startsWith("Reason:"))

        return {
          title: titleLine ? titleLine.replace("Title:", "").trim() : block.trim(),
          reason: reasonLine ? reasonLine.replace("Reason:", "").trim() : undefined,
        }
      })

      setRecommendations(parsedRecommendations.slice(0, 5))
    } catch (err: any) {
      console.error(err)
      setError(err.message || "An unknown error occurred. Please check your API key.")
    } finally {
      setLoading(false)
    }
  }

  const getTypeIcon = (title: string) => {
    // Simple heuristic to determine type based on common patterns
    if (title.toLowerCase().includes("season") || title.toLowerCase().includes("series")) {
      return <Play className="w-4 h-4" />
    }
    if (title.toLowerCase().includes("book") || title.toLowerCase().includes("novel")) {
      return <Book className="w-4 h-4" />
    }
    if (title.toLowerCase().includes("game")) {
      return <Gamepad2 className="w-4 h-4" />
    }
    if (title.toLowerCase().includes("album") || title.toLowerCase().includes("song")) {
      return <Music className="w-4 h-4" />
    }
    return <Play className="w-4 h-4" />
  }

  const completedCount = items.filter((item) => item.status === "completed").length
  const avgRating =
    items.length > 0
      ? items.filter((item) => item.rating > 0).reduce((sum, item) => sum + item.rating, 0) /
        items.filter((item) => item.rating > 0).length
      : 0

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#29b093] to-[#1f67f1] dark:from-[#e0f11f] dark:to-[#b8d900] rounded-3xl p-8 mb-8 text-white dark:text-[#121212] shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/20 dark:bg-[#121212]/20 rounded-2xl">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">AI Recommendations</h2>
            <p className="text-lg opacity-90">Discover your next favorite based on your taste</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 dark:bg-[#121212]/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm opacity-80">Completed</span>
            </div>
            <div className="text-2xl font-bold">{completedCount}</div>
          </div>
          <div className="bg-white/10 dark:bg-[#121212]/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4" />
              <span className="text-sm opacity-80">Avg Rating</span>
            </div>
            <div className="text-2xl font-bold">{avgRating.toFixed(1)}★</div>
          </div>
          <div className="bg-white/10 dark:bg-[#121212]/10 rounded-xl p-4 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-sm opacity-80">Total Items</span>
            </div>
            <div className="text-2xl font-bold">{items.length}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-[#121212] rounded-3xl shadow-2xl border border-[#121212]/10 dark:border-[#e0f11f]/20 overflow-hidden">
        {/* Action Section */}
        <div className="p-8 border-b border-[#121212]/10 dark:border-[#e0f11f]/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#121212] dark:text-white mb-2">Get Personalized Suggestions</h3>
              <p className="text-[#121212]/70 dark:text-white/70">
                Based on your {completedCount} completed items with ratings
              </p>
            </div>
            <button
              onClick={getRecommendations}
              disabled={loading || completedCount === 0}
              className="flex items-center gap-3 bg-gradient-to-r from-[#29b093] to-[#1f67f1] dark:from-[#e0f11f] dark:to-[#b8d900] text-white dark:text-[#121212] px-6 py-3 rounded-xl font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121212] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span className="hidden sm:inline">Analyzing Your Taste...</span>
                  <span className="sm:hidden">Loading...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span className="hidden sm:inline">Get AI Recommendations</span>
                  <span className="sm:hidden">Get Suggestions</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="p-8">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <p className="text-red-700 dark:text-red-400 font-medium">{error}</p>
              </div>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-[#29b093] dark:text-[#e0f11f]" />
                <h4 className="text-lg font-bold text-[#121212] dark:text-white">Recommended for You</h4>
              </div>

              <div className="grid gap-4">
                {recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="group bg-gradient-to-r from-[#29b093]/5 to-[#1f67f1]/5 dark:from-[#e0f11f]/5 dark:to-[#b8d900]/5 border border-[#121212]/10 dark:border-[#e0f11f]/20 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-[#29b093]/10 dark:bg-[#e0f11f]/10 rounded-xl group-hover:bg-[#29b093]/20 dark:group-hover:bg-[#e0f11f]/20 transition-colors">
                        {getTypeIcon(rec.title)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-[#121212] dark:text-white text-lg mb-2 group-hover:text-[#29b093] dark:group-hover:text-[#e0f11f] transition-colors">
                          {rec.title}
                        </h5>
                        {rec.reason && (
                          <p className="text-[#121212]/70 dark:text-white/70 text-sm leading-relaxed">{rec.reason}</p>
                        )}
                      </div>
                      <div className="flex-shrink-0 text-[#29b093] dark:text-[#e0f11f] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-2xl font-bold">#{idx + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-[#121212]/5 dark:bg-white/5 rounded-xl">
                <p className="text-xs text-[#121212]/60 dark:text-white/60 text-center">
                  💡 Recommendations are generated based on your completed items with ratings of 3+ stars
                </p>
              </div>
            </div>
          )}

          {!loading && !error && recommendations.length === 0 && completedCount > 0 && (
            <div className="text-center py-12">
              <div className="p-4 bg-[#121212]/5 dark:bg-white/5 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#121212]/40 dark:text-white/40" />
              </div>
              <h4 className="text-lg font-semibold text-[#121212] dark:text-white mb-2">Ready for AI Magic?</h4>
              <p className="text-[#121212]/70 dark:text-white/70">
                Click the button above to get personalized recommendations based on your taste!
              </p>
            </div>
          )}

          {completedCount === 0 && (
            <div className="text-center py-12">
              <div className="p-4 bg-[#121212]/5 dark:bg-white/5 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-[#121212]/40 dark:text-white/40" />
              </div>
              <h4 className="text-lg font-semibold text-[#121212] dark:text-white mb-2">Complete Some Media First</h4>
              <p className="text-[#121212]/70 dark:text-white/70">
                Mark some items as completed and rate them to get personalized AI recommendations!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
