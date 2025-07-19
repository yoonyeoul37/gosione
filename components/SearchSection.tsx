'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Filter, X } from 'lucide-react'
import { 
  gosiwonData, 
  locations, 
  subwayStations, 
  universities, 
  Gosiwon
} from '@/lib/data'
import GosiwonCard from './GosiwonCard'
import ReservationModal from './ReservationModal'

export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('전체')
  const [selectedSubwayStation, setSelectedSubwayStation] = useState('전체')
  const [selectedUniversity, setSelectedUniversity] = useState('전체')
  const [filteredGosiwons, setFilteredGosiwons] = useState<Gosiwon[]>(gosiwonData)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedGosiwon, setSelectedGosiwon] = useState<Gosiwon | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 검색 및 필터링 로직
  useEffect(() => {
    let filtered = gosiwonData

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(gosiwon =>
        gosiwon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gosiwon.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gosiwon.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // 지역 필터링
    if (selectedLocation !== '전체') {
      filtered = filtered.filter(gosiwon =>
        gosiwon.location.includes(selectedLocation)
      )
    }

    // 지하철역 필터링
    if (selectedSubwayStation !== '전체') {
      filtered = filtered.filter(gosiwon =>
        gosiwon.subwayStation === selectedSubwayStation
      )
    }

    // 대학 필터링
    if (selectedUniversity !== '전체') {
      filtered = filtered.filter(gosiwon =>
        gosiwon.nearbyUniversities?.includes(selectedUniversity)
      )
    }

    setFilteredGosiwons(filtered)
  }, [searchTerm, selectedLocation, selectedSubwayStation, selectedUniversity])

  const handleReserve = (gosiwon: Gosiwon) => {
    setSelectedGosiwon(gosiwon)
    setIsModalOpen(true)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedLocation('전체')
    setSelectedSubwayStation('전체')
    setSelectedUniversity('전체')
  }

  const hasActiveFilters = searchTerm || 
    selectedLocation !== '전체' || 
    selectedSubwayStation !== '전체' || 
    selectedUniversity !== '전체'

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            고시원 검색
          </h2>
          <p className="text-gray-600">
            지하철역, 대학, 지역별로 원하는 고시원을 찾아보세요
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="고시원명, 지역으로 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedSubwayStation}
                  onChange={(e) => setSelectedSubwayStation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="전체">지하철역 선택</option>
                  {subwayStations.map((station) => (
                    <option key={station} value={station}>{station}</option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    hasActiveFilters
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter size={18} className="mr-2" />
                  필터
                </button>
              </div>
            </div>

            {/* Additional Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">지역</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                      <option value="전체">전체 지역</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">대학</label>
                    <select
                      value={selectedUniversity}
                      onChange={(e) => setSelectedUniversity(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    >
                      <option value="전체">전체 대학</option>
                      {universities.map((university) => (
                        <option key={university} value={university}>{university}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {hasActiveFilters && (
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {filteredGosiwons.length}개의 결과
                    </span>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    >
                      <X size={14} className="mr-1" />
                      필터 초기화
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredGosiwons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGosiwons.map((gosiwon) => (
                <GosiwonCard
                  key={gosiwon.id}
                  gosiwon={gosiwon}
                  onReserve={handleReserve}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-500">
                다른 검색어나 필터를 시도해보세요
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Reservation Modal */}
      {selectedGosiwon && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          gosiwon={selectedGosiwon}
        />
      )}
    </section>
  )
} 