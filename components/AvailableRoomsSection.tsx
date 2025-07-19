'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bed, MapPin, Calendar, ArrowRight, Users, Wifi, ParkingCircle, Utensils, User, Train, Home } from 'lucide-react'
import Link from 'next/link'
import { gosiwonData } from '@/lib/data'
import ReservationModal from './ReservationModal'

interface AvailableRoom {
  id: string
  gosiwonId: string
  gosiwonName: string
  gosiwonLocation: string
  gosiwonImage: string
  roomType: string
  size: string
  priceRange: {
    min: number
    max: number
  }
  depositRange: {
    min: number
    max: number
  }
  windowType: string
  facilities: string[]
  available: number
  genderType: string // Added genderType to the interface
}

export default function AvailableRoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoom | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 모든 고시원에서 빈방이 있는 객실들을 추출하고 가격 범위 계산
  const availableRooms: AvailableRoom[] = []
  
  gosiwonData.forEach(gosiwon => {
    if (gosiwon.rooms && gosiwon.rooms.length > 0) {
      const availableRoomsInGosiwon = gosiwon.rooms.filter(room => room.status === 'available')
      
      if (availableRoomsInGosiwon.length > 0) {
        // 가격 범위 계산
        const prices = availableRoomsInGosiwon.map(room => room.price)
        const deposits = availableRoomsInGosiwon.map(room => room.deposit)
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)
        const minDeposit = Math.min(...deposits)
        const maxDeposit = Math.max(...deposits)

        // 고시원별로 하나의 카드 생성 (가격 범위 표시)
        availableRooms.push({
          id: gosiwon.id,
          gosiwonId: gosiwon.id,
          gosiwonName: gosiwon.name,
          gosiwonLocation: gosiwon.location,
          gosiwonImage: gosiwon.images[0],
          roomType: availableRoomsInGosiwon[0].type === 'single' ? '1인실' : 
                   availableRoomsInGosiwon[0].type === 'double' ? '2인실' : 
                   availableRoomsInGosiwon[0].type === 'studio' ? '원룸' : '공용실',
          size: `${availableRoomsInGosiwon[0].area}평`,
          priceRange: {
            min: minPrice,
            max: maxPrice
          },
          depositRange: {
            min: minDeposit,
            max: maxDeposit
          },
          windowType: '외창',
          facilities: [...new Set(availableRoomsInGosiwon.flatMap(room => room.facilities))], // 모든 방의 시설 통합
          available: availableRoomsInGosiwon.length,
          genderType: gosiwon.genderType // Assuming gosiwonData has a genderType property
        })
      }
    }
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price)
  }

  const handleReserve = (room: AvailableRoom) => {
    setSelectedRoom(room)
    setIsModalOpen(true)
  }

  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case 'wifi':
        return <Wifi size={14} />
      case 'parking':
        return <ParkingCircle size={14} />
      case 'kitchen':
        return <Utensils size={14} />
      default:
        return <Users size={14} />
    }
  }

  function getGenderIcon(type: string) {
    switch (type) {
      case 'male':
        return <User size={16} className="text-blue-500 inline-block ml-2" />
      case 'female':
        return <User size={16} className="text-pink-500 inline-block ml-2" />
      case 'mixed':
        return (
          <>
            <User size={14} className="text-blue-500 inline-block ml-1" />
            <User size={14} className="text-pink-500 inline-block ml-1" />
          </>
        )
      case 'separated':
        return (
          <span className="inline-flex items-center ml-1">
            <User size={14} className="text-blue-500" />
            <span className="mx-1 w-0.5 h-4 bg-gray-400 inline-block" />
            <User size={14} className="text-pink-500" />
          </span>
        )
      default:
        return null
    }
  }

  function getSubwayLineColor(station: string | undefined) {
    if (!station) return 'text-gray-400';
    
    // 2호선 (녹색)
    if (station.includes('강남역') || station.includes('홍대입구역') || station.includes('신촌역') || station.includes('건대입구역')) {
      return 'text-green-500';
    }
    // 1호선 (파란색)
    else if (station.includes('서울대입구역') || station.includes('고려대역')) {
      return 'text-blue-500';
    }
    // 3호선 (주황색)
    else if (station.includes('역삼역')) {
      return 'text-orange-500';
    }
    // 7호선 (연두색)
    else if (station.includes('잠실역')) {
      return 'text-lime-500';
    }
    // 기본값
    else {
      return 'text-gray-400';
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            <Home size={32} className="inline mr-2 text-blue-600" />
            현재 입주 가능한 방
          </h2>
          <p className="text-gray-600 text-lg">
            지금 바로 입주할 수 있는 <span className="font-semibold text-blue-600">{availableRooms.length}개의 방</span>을 확인해보세요
          </p>
        </motion.div>

        {/* Available Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              {/* Room Image - Clickable */}
              <Link href={`/gosiwon/${room.gosiwonId}`}>
                <div className="relative h-48 bg-gray-200 cursor-pointer group">
                  <img
                    src={room.gosiwonImage}
                    alt={room.gosiwonName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  

                  

                </div>
              </Link>

              {/* Room Info */}
              <div className="p-6">
                {/* Gosiwon Info */}
                <div className="mb-4">
                  <Link href={`/gosiwon/${room.gosiwonId}`} className="hover:text-blue-600 transition-colors">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 flex items-center">
                      {room.gosiwonName}
                      {getGenderIcon(room.genderType)}
                    </h3>
                  </Link>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin size={14} className="mr-2 text-blue-500" />
                    <span className="line-clamp-1">{room.gosiwonLocation}</span>
                    <div className="flex items-center ml-2 text-xs text-gray-500">
                      <Train size={12} className={`mr-1 ${getSubwayLineColor(gosiwonData.find(g => g.id === room.gosiwonId)?.subwayStation)}`} />
                      <span>{gosiwonData.find(g => g.id === room.gosiwonId)?.subwayStation} {gosiwonData.find(g => g.id === room.gosiwonId)?.distance.subway}분</span>
                    </div>
                  </div>
                </div>



                {/* Facilities */}
                {room.facilities.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 flex-wrap">
                      {room.facilities.slice(0, 3).map((facility, idx) => (
                        <div key={idx} className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-xs text-gray-700">
                          {getFacilityIcon(facility)}
                          <span className="ml-1">{facility}</span>
                        </div>
                      ))}
                      {room.facilities.length > 3 && (
                        <span className="text-xs text-gray-500">+{room.facilities.length - 3}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">월세</p>
                      {room.priceRange.min === room.priceRange.max ? (
                        <p className="font-bold text-xl text-blue-600">
                          {formatPrice(room.priceRange.min)}원
                        </p>
                      ) : (
                        <div>
                          <p className="font-bold text-xl text-blue-600">
                            {formatPrice(room.priceRange.min)}원
                          </p>
                          <p className="text-xs text-gray-500">
                            ~ {formatPrice(room.priceRange.max)}원
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 mb-1">보증금</p>
                      <p className="font-semibold text-sm text-gray-700">
                        {formatPrice(room.depositRange.min)}원
                      </p>
                    </div>
                  </div>

                </div>

                {/* Reserve Button */}
                <button
                  onClick={() => handleReserve(room)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Calendar size={16} className="mr-2" />
                  <span>지금 예약하기</span>
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {availableRooms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
              <Bed size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-3">
                현재 입주 가능한 방이 없습니다
              </h3>
              <p className="text-gray-500 text-sm">
                곧 새로운 방이 추가될 예정입니다. 조금만 기다려주세요!
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Reservation Modal */}
      {selectedRoom && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          gosiwon={{
            id: selectedRoom.id,
            name: selectedRoom.gosiwonName,
            location: selectedRoom.gosiwonLocation,
            price: selectedRoom.priceRange.min,
            images: [selectedRoom.gosiwonImage],
            tags: [],
            description: '',
            roomTypes: [{
              type: selectedRoom.roomType,
              size: selectedRoom.size,
              priceRange: selectedRoom.priceRange,
              depositRange: selectedRoom.depositRange,
              available: 1,
              scheduledVacancy: 0,
              windowType: selectedRoom.windowType,
              facilities: selectedRoom.facilities,
              options: {}
            }]
          }}
        />
      )}
    </section>
  )
}