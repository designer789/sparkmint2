import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CoreFeatures from '@/components/CoreFeatures'
import WhySparkMintWins from '@/components/WhySparkMintWins'
import Tokenomics from '@/components/Tokenomics'
import Roadmap from '@/components/Roadmap'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#18181B]">
      <Header />
      <Hero />
      <CoreFeatures />
      <WhySparkMintWins />
      <Tokenomics />
      <Roadmap />
      <FAQ />
      <Footer />
    </main>
  )
}
