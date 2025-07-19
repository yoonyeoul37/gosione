'use client'

import { motion } from 'framer-motion'
import { Search, Star } from 'lucide-react'

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden py-12 bg-blue-50">
        <div className="max-w-6xl mx-auto px-0 sm:px-0 lg:px-0">
          <div className="flex justify-center items-center min-h-[60vh]">
            
            {/* Left Side - Large Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute left-0 bottom-0 w-1/2"
            >
              <div className="relative">
                {/* Main illustration */}
                <div className="relative z-10">
                  <img 
                    src="/images/Houses-pana.png" 
                    alt="도시 일러스트" 
                    className="w-full max-w-lg"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center z-10"
            >
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                월별 임대 – 간단하고 안전하며<br />
                스트레스 없는 서비스
              </h1>
              
              {/* Sub-heading */}
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                어디에 있든 신뢰할 수 있는 소유자와 안심할 수 있습니다.
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg mx-auto mb-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="당신은 어디에서 살고 있습니까?"
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-lg"
                      />
                    </div>
                  </div>
                  <button className="bg-orange-500 text-white p-4 rounded-full hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                    <Search size={20} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Trust Rating */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  평점 4.2/5 <Star size={14} className="inline text-green-500" /> 고객 만족도
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1,200+</h3>
              <p className="text-gray-600">등록된 업체수</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-gray-600">이용 고객수</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">서비스지역</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 