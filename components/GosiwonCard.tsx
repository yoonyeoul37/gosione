'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Wifi, Snowflake, Home, Train, Bed, User } from 'lucide-react'
import { Gosiwon } from '@/lib/data'

interface GosiwonCardProps {
  gosiwon: Gosiwon
  onReserve: (gosiwon: Gosiwon) => void
}

export default function GosiwonCard({ gosiwon, onReserve }: GosiwonCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price)
  }

  const getPriceRange = () => {
    if (!gosiwon.rooms || gosiwon.rooms.length === 0) {
      return { min: gosiwon.price, max: gosiwon.price }
    }
    
    const prices = gosiwon.rooms.map(room => room.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    
    return { min: minPrice, max: maxPrice }
  }

  const getDepositRange = () => {
    if (!gosiwon.rooms || gosiwon.rooms.length === 0) {
      return { min: gosiwon.deposit, max: gosiwon.deposit }
    }
    
    const deposits = gosiwon.rooms.map(room => room.deposit)
    const minDeposit = Math.min(...deposits)
    const maxDeposit = Math.max(...deposits)
    
    return { min: minDeposit, max: maxDeposit }
  }

  function getGenderIcon(type: string) {
    if (!type) return null;
    
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      {/* Image Section */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={gosiwon.images?.[currentImageIndex] || '/placeholder-image.jpg'}
          alt={gosiwon.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Image Navigation */}
        {gosiwon.images && gosiwon.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {gosiwon.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}


      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 text-base mb-2 line-clamp-1 flex items-center">
          {gosiwon.name}
          {getGenderIcon(gosiwon.genderType)}
        </h3>

        {/* Location and Subway */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin size={14} className="mr-1 flex-shrink-0" />
          <span className="line-clamp-1 flex-1">{gosiwon.location}</span>
          <div className="flex items-center ml-2 text-xs text-gray-500 flex-shrink-0">
            <Train size={12} className={`mr-1 ${getSubwayLineColor(gosiwon.subwayStation)}`} />
            <span className="whitespace-nowrap">{gosiwon.subwayStation} {gosiwon.distance.subway}분</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">월세</p>
              {(() => {
                const priceRange = getPriceRange()
                return priceRange.min === priceRange.max ? (
                  <p className="font-bold text-xl text-blue-600">
                    {formatPrice(priceRange.min)}원
                  </p>
                ) : (
                  <div>
                    <p className="font-bold text-xl text-blue-600">
                      {formatPrice(priceRange.min)}원
                    </p>
                    <p className="text-xs text-gray-500">
                      ~ {formatPrice(priceRange.max)}원
                    </p>
                  </div>
                )
              })()}
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600 mb-1">보증금</p>
              <p className="font-semibold text-sm text-gray-700">
                {formatPrice(gosiwon.deposit)}원
              </p>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="flex flex-wrap gap-1 mb-4">
          {gosiwon.facilities?.slice(0, 3).map((facility, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
            >
              {facility === 'WiFi' && <Wifi size={12} className="mr-1" />}
              {facility === '에어컨' && <Snowflake size={12} className="mr-1" />}
              {facility === '주방' && <Home size={12} className="mr-1" />}
              <span>{facility}</span>
            </div>
          ))}
          {gosiwon.facilities && gosiwon.facilities.length > 3 && (
            <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
              +{gosiwon.facilities.length - 3}
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onReserve(gosiwon)}
          className="w-full py-2 px-4 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
        >
          예약하기
        </button>
      </div>
    </motion.div>
  )
} 