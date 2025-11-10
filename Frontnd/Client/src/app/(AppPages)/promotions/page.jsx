"use client"

import { useState } from "react"
import { Heart, Search, ShoppingCart, Globe, User, ChevronDown, X, ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function ToursPage() {
  const [favoriteModal, setFavoriteModal] = useState(false)
  const [scheduleModal, setScheduleModal] = useState(false)
  const [dateModal, setDateModal] = useState(false)
  const [selectedSchedules, setSelectedSchedules] = useState([])
  const [currentMonth, setCurrentMonth] = useState(10) // November (0-indexed)
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null })
  const [favorites, setFavorites] = useState({})

  const tours = [
    {
      id: 1,
      image: "/bicycle-tour-historical-site.jpg",
      badge: "Coup de coeur",
      title: "Stellenbosch : Visite historique à vélo et dégustation de vins",
      duration: "4,5 heures",
      group: "Petit groupe",
      rating: 4.9,
      reviews: 207,
      price: 758,
      currency: "د.ج",
    },
    {
      id: 2,
      image: "/ebike-tour-vineyards-mountains.jpg",
      badge: null,
      title: "Franschhoek : Visite guidée des vignobles en E-Bike",
      duration: "3,5 heures",
      group: "Petit groupe",
      rating: 4.7,
      reviews: 82,
      price: 819,
      currency: "د.ج",
    },
    {
      id: 3,
      image: "/bicycle-tour-historical-site.jpg",
      badge: null,
      title: "Le Cap : visite guidée à vélo",
      duration: "5,5 heures",
      group: "Coupe-file",
      rating: 4.7,
      reviews: 0,
      price: 502,
      currency: "د.ج",
    },
    {
      id: 4,
      image: "/ebike-tour-vineyards-mountains.jpg",
      badge: "Très bien noté",
      title: "Paris : Tour à vélo des trésors de la ville",
      duration: "2,5 - 3 heures",
      group: null,
      rating: 4.9,
      reviews: 827,
      price: 502,
      currency: "د.ج",
    },
  ]

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const toggleSchedule = (schedule) => {
    setSelectedSchedules((prev) => (prev.includes(schedule) ? prev.filter((s) => s !== schedule) : [...prev, schedule]))
  }

  const getDaysInMonth = (month, year = 2025) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year = 2025) => {
    return new Date(year, month, 1).getDay()
  }

  const monthNames = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ]
  const dayNames = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."]

  const renderCalendar = (monthIndex) => {
    const daysInMonth = getDaysInMonth(monthIndex)
    const firstDay = getFirstDayOfMonth(monthIndex)
    const days = []
    const adjustedFirstDay = (firstDay + 6) % 7 // Convert Sunday to 6

    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const calendarDays1 = renderCalendar(currentMonth)
  const calendarDays2 = renderCalendar((currentMonth + 1) % 12)

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-orange-600">
                GET
                <br />
                YOUR
                <br />
                GUIDE
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-grow max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tour en vélo"
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium whitespace-nowrap">
              Rechercher
            </button>

            {/* Right Navigation */}
            <div className="flex items-center gap-6">
              <span className="text-gray-700 text-sm hidden lg:inline">Devenez prestataire</span>
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
                <Heart className="w-6 h-6 text-gray-700" />
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
              </button>
              <button className="flex items-center gap-1 hover:bg-gray-100 px-2 py-2 rounded-full transition">
                <Globe className="w-5 h-5 text-gray-700" />
                <span className="text-sm text-gray-700">FR/MAD</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <User className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

   
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium text-gray-700"
              onClick={() => setDateModal(true)}
            >
              📅 Dates
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium text-gray-700"
              onClick={() => setScheduleModal(true)}
            >
              Horaire <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-medium">+500 résultats :</span> Tour en vélo
          </div>

          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium">
            Trier par : <span className="underline">Conseillé</span> <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Filters Button */}
        <div className="mb-6 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
            ⚙️ Filtres
          </button>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Image Container */}
              <div className="relative h-40 bg-gray-200 overflow-hidden">
                <img
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />

                {/* Badge */}
                {tour.badge && (
                  <div className="absolute top-3 left-3 bg-blue-700 text-white px-3 py-1 rounded text-xs font-bold">
                    {tour.badge}
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(tour.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow"
                >
                  <Heart className={`w-5 h-5 ${favorites[tour.id] ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 bg-blue-50">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">{tour.title}</h3>

                {/* Duration and Group */}
                <p className="text-xs text-gray-600 mb-3">
                  {tour.duration} • {tour.group || "Tour guidé"}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(tour.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-700 font-medium">{tour.rating}</span>
                  {tour.reviews > 0 && <span className="text-xs text-gray-500">({tour.reviews})</span>}
                </div>

                {/* Price */}
                <div>
                  <p className="text-xs text-gray-600">À partir de</p>
                  <p className="text-lg font-bold text-gray-900">
                    {tour.price} <span className="text-sm">{tour.currency}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Modal */}
      {scheduleModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Horaire</h2>
              <button onClick={() => setScheduleModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { id: "morning", label: "En matinée, de 8 h à midi" },
                { id: "afternoon", label: "L'après-midi, de midi à 17 h" },
                { id: "evening", label: "En soirée, de 17 h à minuit" },
              ].map((schedule) => (
                <label key={schedule.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSchedules.includes(schedule.id)}
                    onChange={() => toggleSchedule(schedule.id)}
                    className="w-5 h-5 rounded border-2 border-gray-300"
                  />
                  <span className="text-gray-700">{schedule.label}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setScheduleModal(false)}
                className="flex-1 text-center py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
              >
                Réinitialiser
              </button>
              <button
                onClick={() => setScheduleModal(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold transition"
              >
                Voir les résultats
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Date Picker Modal */}
      {dateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition">
                  Aujourd'hui
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition">
                  Demain
                </button>
              </div>
              <button onClick={() => setDateModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentMonth((prev) => (prev - 1 + 12) % 12)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-12">
                <h3 className="text-lg font-bold text-gray-900 text-center flex-1">{monthNames[currentMonth]} 2025</h3>
                <h3 className="text-lg font-bold text-gray-900 text-center flex-1">
                  {monthNames[(currentMonth + 1) % 12]} 2025
                </h3>
              </div>
              <button
                onClick={() => setCurrentMonth((prev) => (prev + 1) % 12)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Calendars */}
            <div className="grid grid-cols-2 gap-8 mb-6">
              {[calendarDays1, calendarDays2].map((days, idx) => (
                <div key={idx}>
                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {dayNames.map((day) => (
                      <div key={day} className="text-center text-sm font-semibold text-gray-600">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Days */}
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day, i) => (
                      <button
                        key={i}
                        onClick={() => day && setSelectedDates({ ...selectedDates, start: day })}
                        className={`aspect-square rounded-lg text-sm font-medium transition ${
                          day === null
                            ? ""
                            : selectedDates.start === day
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedDates({ start: null, end: null })}
                className="flex-1 text-center py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium underline"
              >
                Effacer
              </button>
              <button
                onClick={() => setDateModal(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold transition"
              >
                Voir les résultats
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
