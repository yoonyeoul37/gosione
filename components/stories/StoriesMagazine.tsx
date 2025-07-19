'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Heart, 
  MessageCircle, 
  Share2, 
  Clock, 
  User,
  Plus,
  Edit3,
  Send,
  X
} from 'lucide-react'

export default function StoriesMagazine() {
  const [showWriteForm, setShowWriteForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'free'
  })

  const categories = [
    { id: 'free', name: '자유글' },
    { id: 'life', name: '고시원 라이프' },
    { id: 'tips', name: '생활팁' },
    { id: 'question', name: '질문' },
    { id: 'humor', name: '유머' }
  ]

  const posts = [
    {
      id: 1,
      title: '고시원 이웃이 너무 시끄러워요 ㅠㅠ',
      content: '새벽 2시까지 음악을 틀어대는데 어떻게 해야 할까요? 직접 말하기는 좀 그렇고...',
      author: '조용한사람',
      category: 'question',
      createdAt: '2024-01-15',
      likes: 12
    },
    {
      id: 2,
      title: '고시원에서 키우는 반려식물 추천해주세요!',
      content: '창가에 작은 화분을 놓고 싶은데, 햇빛이 적은 고시원에 적합한 식물이 있을까요?',
      author: '식물러버',
      category: 'question',
      createdAt: '2024-01-14',
      likes: 8
    },
    {
      id: 3,
      title: '오늘 고시원에서 생긴 웃픈 일',
      content: '세탁기에서 빨래를 꺼내려는데 속옷이 사라졌어요... 누가 가져간 걸까요? ㅋㅋ',
      author: '웃음사랑',
      category: 'humor',
      createdAt: '2024-01-13',
      likes: 25
    },
    {
      id: 4,
      title: '강남역 근처 맛있는 치킨집 발견!',
      content: '강남역 3번 출구 근처에 새로 생긴 치킨집인데 정말 맛있어요. 가성비도 좋고 추천합니다!',
      author: '맛집탐험가',
      category: 'tips',
      createdAt: '2024-01-12',
      likes: 15
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('새 글 작성:', newPost)
    setNewPost({ title: '', content: '', category: 'free' })
    setShowWriteForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">고시원 스토리</h1>
              <p className="text-gray-600">입주자들의 자유로운 이야기 공간</p>
            </div>
            <button 
              onClick={() => setShowWriteForm(true)}
              className="btn-primary flex items-center"
            >
              <Plus size={18} className="mr-2" />
              글쓰기
            </button>
          </div>
        </div>
      </section>

      {/* Posts List */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.createdAt}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {categories.find(c => c.id === post.category)?.name}
                </span>
              </div>
              
              <h3 className="text-base font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-3 text-sm leading-relaxed line-clamp-2">{post.content}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                    <Heart size={14} />
                    <span className="text-xs">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle size={14} />
                    <span className="text-xs">댓글</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                    <Share2 size={14} />
                    <span className="text-xs">공유</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Write Form Modal */}
      {showWriteForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowWriteForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">새 글 작성</h2>
              <button
                onClick={() => setShowWriteForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    placeholder="제목을 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    내용
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    placeholder="자유롭게 이야기를 나누어보세요..."
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowWriteForm(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center"
                  >
                    <Send size={16} className="mr-2" />
                    글쓰기
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 