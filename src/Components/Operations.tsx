"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Calendar,
  Play,
  Book,
  Gamepad2,
  Music,
} from "lucide-react"
import Chatbot from "./ChatBot"

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

export default function Operations() {
  // Sample media data
  const [mediaList, setMediaList] = useState<MediaItem[]>([
    {
      id: "1",
      title: "The Matrix",
      type: "Movie",
      status: "completed",
      rating: 5,
      genre: "Sci-Fi",
      releaseDate: "1999-03-31",
      notes: "Mind-bending classic!",
      dateAdded: "2024-01-15",
    },
    {
      id: "2",
      title: "Breaking Bad",
      type: "TV Show",
      status: "completed",
      rating: 5,
      genre: "Drama",
      releaseDate: "2008-01-20",
      notes: "Best series ever",
      dateAdded: "2024-01-20",
    },
    {
      id: "3",
      title: "Dune",
      type: "Book",
      status: "whishlist",
      rating: 4,
      genre: "Sci-Fi",
      releaseDate: "1965-08-01",
      notes: "Complex but rewarding",
      dateAdded: "2024-02-01",
    },
    {
      id: "4",
      title: "The Witcher 3",
      type: "Game",
      status: "currently using",
      rating: 5,
      genre: "RPG",
      releaseDate: "2015-05-19",
      notes: "Amazing open world",
      dateAdded: "2024-02-10",
    },
    {
      id: "5",
      title: "Dark Side of the Moon",
      type: "Music",
      status: "owned",
      rating: 5,
      genre: "Progressive Rock",
      releaseDate: "1973-03-01",
      notes: "Timeless masterpiece",
      dateAdded: "2024-02-15",
    },
  ])

  // Form state
  const [formData, setFormData] = useState<Omit<MediaItem, "id" | "dateAdded">>({
    title: "",
    type: "Movie",
    status: "owned",
    rating: 0,
    genre: "",
    releaseDate: "",
    notes: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("All")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [showFilters, setShowFilters] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: keyof MediaItem; direction: "asc" | "desc" } | null>(null)

  // Get unique types and statuses for filters
  const mediaTypes = ["All", "Movie", "TV Show", "Book", "Game", "Music"]
  const statusOptions = ["owned", "whishlist", "currently using", "completed"]

  // Filtered and sorted media
  const filteredMedia = mediaList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "All" || item.type === typeFilter
    const matchesStatus = statusFilter === "All" || item.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const sortedMedia = [...filteredMedia].sort((a, b) => {
    if (!sortConfig) return 0
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1
    }
    return 0
  })

  // Handle sort request
//   const requestSort = (key: keyof MediaItem) => {
//     let direction: "asc" | "desc" = "asc"
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc"
//     }
//     setSortConfig({ key, direction })
//   }

  // CRUD operations
  const handleCreate = () => {
    const newItem = {
      ...formData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString().split("T")[0],
    }
    setMediaList([...mediaList, newItem])
    resetForm()
  }

  const handleUpdate = () => {
    if (!editingId) return
    setMediaList(
      mediaList.map((item) =>
        item.id === editingId ? { ...formData, id: editingId, dateAdded: item.dateAdded } : item,
      ),
    )
    resetForm()
  }

  const handleDelete = (id: string) => {
    setMediaList(mediaList.filter((item) => item.id !== id))
  }

  const handleEdit = (item: MediaItem) => {
    setFormData({
      title: item.title,
      type: item.type,
      status: item.status,
      rating: item.rating,
      genre: item.genre,
      releaseDate: item.releaseDate,
      notes: item.notes,
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      type: "Movie",
      status: "owned",
      rating: 0,
      genre: "",
      releaseDate: "",
      notes: "",
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      handleUpdate()
    } else {
      handleCreate()
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Movie":
        return <Play className="w-4 h-4" />
      case "TV Show":
        return <Play className="w-4 h-4" />
      case "Book":
        return <Book className="w-4 h-4" />
      case "Game":
        return <Gamepad2 className="w-4 h-4" />
      case "Music":
        return <Music className="w-4 h-4" />
      default:
        return <Play className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 dark:text-green-400"
      case "whishlist":
        return "text-blue-600 dark:text-blue-400"
      case "currently using":
        return "text-yellow-600 dark:text-yellow-400"
      case "owned":
        return "text-orange-600 dark:text-orange-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div id="media" className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-[#121212] dark:to-[#0a0a0a] text-[#121212] dark:text-white">
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="bg-white dark:bg-[#121212] rounded-3xl shadow-2xl overflow-hidden border border-[#29b093] dark:border-[#e0f11f]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#29b093] to-[#1f67f1] dark:from-[#e0f11f] dark:to-[#b8d900] text-white dark:text-[#121212] p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 dark:bg-[#121212]/20 rounded-2xl">
                <Play className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Media Tracker</h1>
                <p className="text-lg opacity-90 mt-1">Track your favorite movies, shows, books, games & music</p>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="p-6 border-b border-[#121212]/20 dark:border-[#e0f11f]/20">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="text-[#29b093] dark:text-[#e0f11f] w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search titles, genres, or notes..."
                  className="pl-12 w-full rounded-xl border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex cursor-pointer items-center gap-2 bg-[#29b093] dark:bg-[#e0f11f] text-white dark:text-[#121212] px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-lg font-medium"
              >
                <Filter className="w-5 h-5" />
                Filters
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setShowForm(true)}
                className="flex cursor-pointer items-center gap-2 bg-gradient-to-r from-[#29b093] to-[#1f67f1] dark:from-[#e0f11f] dark:to-[#b8d900] text-white dark:text-[#121212] px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-lg font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Media
              </button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-6 p-6 bg-gradient-to-r from-[#29b093]/10 to-[#1f67f1]/10 dark:from-[#e0f11f]/10 dark:to-[#b8d900]/10 rounded-xl">
                <div className="flex flex-wrap justify-between items-center gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">
                      Media Type
                    </label>
                    <select
                      className="w-full rounded-lg border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      {mediaTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">Status</label>
                    <select
                      className="w-full rounded-lg border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">
                      Rating Range
                    </label>
                    <div className="flex gap-2">
                      <select className="flex-1 rounded-lg border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white">
                        <option value="">Min</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}★
                          </option>
                        ))}
                      </select>
                      <select className="flex-1 rounded-lg border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white">
                        <option value="">Max</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}★
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">
                      Release Year
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="From"
                        className="flex-1 rounded-lg border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white"
                      />
                      <input
                        type="number"
                        placeholder="To"
                        className="flex-1 rounded-lg border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Media Form */}
          {showForm && (
            <div className="p-6 border-b border-[#121212]/20 dark:border-[#e0f11f]/20">
              <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-r from-[#29b093]/5 to-[#1f67f1]/5 dark:from-[#e0f11f]/5 dark:to-[#b8d900]/5 p-8 rounded-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#121212] dark:text-white">
                    {editingId ? "Edit Media" : "Add New Media"}
                  </h3>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-[#121212]/60 dark:text-white/60 p-2 rounded-full hover:bg-[#121212]/5 dark:hover:bg-white/5 transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">Title *</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">Type *</label>
                    <select
                      className="w-full rounded-lg border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as MediaItem["type"] })}
                      required
                    >
                      <option value="Movie">Movie</option>
                      <option value="TV Show">TV Show</option>
                      <option value="Book">Book</option>
                      <option value="Game">Game</option>
                      <option value="Music">Music</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">Status *</label>
                    <select
                      className="w-full rounded-lg border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as MediaItem["status"] })}
                      required
                    >
                      <option value="whishlist">whishlist</option>
                      <option value="owned">owned</option>
                      <option value="completed">completed</option>
                      <option value="currently using">currently using</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">
                      Rating (1-5 stars)
                    </label>
                    <select
                      className="w-full rounded-lg border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number.parseInt(e.target.value) || 0 })}
                    >
                      <option value={0}>No Rating</option>
                      <option value={1}>1 Star</option>
                      <option value={2}>2 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={5}>5 Stars</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">Genre</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white"
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      placeholder="e.g., Action, Drama, Sci-Fi"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">
                      Release Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white"
                      value={formData.releaseDate}
                      onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                    />
                  </div>

                  <div className="lg:col-span-3">
                    <label className="block text-sm font-semibold text-[#121212] dark:text-white mb-2">Notes</label>
                    <textarea
                      rows={3}
                      className="w-full rounded-lg border-2 border-[#121212]/30 dark:border-[#e0f11f]/30 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#29b093] dark:focus:ring-[#e0f11f] focus:border-transparent bg-white dark:bg-[#121212] text-[#121212] dark:text-white resize-none"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Your thoughts, reviews, or additional notes..."
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 cursor-pointer py-3 border-2 border-[#29b093] dark:border-[#e0f11f] rounded-lg text-[#29b093] dark:text-[#e0f11f] hover:bg-[#29b093]/10 dark:hover:bg-[#e0f11f]/10 transition-all font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 cursor-pointer py-3 bg-gradient-to-r from-[#29b093] to-[#1f67f1] dark:from-[#e0f11f] dark:to-[#b8d900] text-white dark:text-[#121212] rounded-lg hover:opacity-90 transition-all shadow-lg font-medium"
                  >
                    {editingId ? "Update Media" : "Add Media"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Media Grid/Table */}
          <div className="p-6">
            {sortedMedia.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedMedia.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-[#121212] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#121212]/20 dark:border-[#e0f11f]/20 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#29b093]/10 dark:bg-[#e0f11f]/10 rounded-lg">
                            {getTypeIcon(item.type)}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-[#121212] dark:text-white line-clamp-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-[#121212]/70 dark:text-white/70">
                              {item.type} • {item.genre}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 cursor-pointer text-[#29b093] dark:text-[#e0f11f] hover:bg-[#29b093]/10 dark:hover:bg-[#e0f11f]/10 rounded-lg transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)} bg-current/10`}
                          >
                            {item.status}
                          </span>
                          {item.rating > 0 && renderStars(item.rating)}
                        </div>

                        {item.releaseDate && (
                          <div className="flex items-center gap-2 text-sm text-[#121212]/70 dark:text-white/70">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.releaseDate).getFullYear()}
                          </div>
                        )}

                        {item.notes && (
                          <p className="text-sm text-[#121212] dark:text-white line-clamp-2 bg-[#121212]/5 dark:bg-white/5 p-3 rounded-lg">
                            {item.notes}
                          </p>
                        )}

                        <div className="text-xs text-[#121212]/60 dark:text-white/60 pt-2 border-t border-[#121212]/20 dark:border-[#e0f11f]/20">
                          Added {new Date(item.dateAdded).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="p-4 bg-[#121212]/10 dark:bg-white/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-8 h-8 text-[#121212]/50" />
                </div>
                <h3 className="text-xl font-semibold text-[#121212] dark:text-white mb-2">No media found</h3>
                <p className="text-[#121212]/70 dark:text-white/70">
                  Try adjusting your search or filters, or add some new media to get started!
                </p>
              </div>
            )}
          </div>

          {/* Summary Footer */}
          <div className="p-6 bg-gradient-to-r from-[#29b093]/5 to-[#1f67f1]/5 dark:from-[#e0f11f]/5 dark:to-[#b8d900]/5 border-t border-[#121212]/20 dark:border-[#e0f11f]/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-[#121212] dark:text-white">
                Showing <span className="font-bold text-[#29b093] dark:text-[#e0f11f]">{sortedMedia.length}</span> of{" "}
                <span className="font-bold">{mediaList.length}</span> items
              </div>
              <div className="flex gap-6 text-sm">
                <div className="text-[#121212] dark:text-white">
                  completed:{" "}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {mediaList.filter((item) => item.status === "completed").length}
                  </span>
                </div>
                <div className="text-[#121212] dark:text-white">
                  WhishList:{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {mediaList.filter((item) => item.status === "whishlist").length}
                  </span>
                </div>
                <div className="text-[#121212] dark:text-white">
                  Avg Rating:{" "}
                  <span className="font-bold text-yellow-600 dark:text-yellow-400">
                    {(
                      mediaList.filter((item) => item.rating > 0).reduce((sum, item) => sum + item.rating, 0) /
                        mediaList.filter((item) => item.rating > 0).length || 0
                    ).toFixed(1)}
                    ★
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot mediaItems={mediaList}/>
    </div>
  )
}
