'use client'

import { motion } from 'framer-motion'
import { MapPin, Search, Calendar } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              당신의 새로운 시작, 가자고
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              스마트한 고시원 라이프를 경험해보세요
            </p>
            <p className="text-sm text-gray-500 mb-8">
              GAJAGO
            </p>
          </motion.div>

          {/* Simple Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="어디에서 살고 계신가요?"
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-lg"
                    />
                  </div>
                </div>
                <button className="bg-orange-500 text-white py-4 px-8 rounded-xl hover:bg-orange-600 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  <Search size={20} className="text-white" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Trust Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500">
              Great 4.2 out of 5 <span className="text-green-500">★</span> Trustpilot
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-gray-100">
                <MapPin size={28} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">지하철역</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-gray-100">
                <Search size={28} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1,200+</h3>
              <p className="text-gray-600">등록된 고시원</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-gray-100">
                <Calendar size={28} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-gray-600">만족한 고객</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
    </section>
  )
} 