import Header from '@/components/Header'
import Hero from '@/components/Hero'
import AvailableRoomsSection from '@/components/AvailableRoomsSection'
import SearchSection from '@/components/SearchSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      <Hero />
      <AvailableRoomsSection />
      <SearchSection />
      <Footer />
    </main>
  )
} 