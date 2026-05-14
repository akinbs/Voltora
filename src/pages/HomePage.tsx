import { HomeBackground } from '../components/home/HomeBackground'
import { HeroSection }     from '../components/home/HeroSection'
import { CategoryStrip }   from '../components/home/CategoryStrip'
import { LabStats }        from '../components/home/LabStats'
import { FeaturedProducts }from '../components/home/FeaturedProducts'
import { FeaturedKits }    from '../components/home/FeaturedKits'
import { PromoBanner }     from '../components/home/PromoBanner'
import { WhyChooseUs }     from '../components/home/WhyChooseUs'

export default function HomePage() {
  return (
    <div className="relative">
      <HomeBackground />
      <HeroSection />
      <CategoryStrip />
      <LabStats />
      <FeaturedProducts />
      <FeaturedKits />
      <PromoBanner />
      <WhyChooseUs />
    </div>
  )
}
