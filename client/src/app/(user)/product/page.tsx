import { Hero } from "@/components/hero"
import { FeaturedCategories } from "@/components/featured-categories"
import { FeaturedProducts } from "@/components/featured-products"
import { PromoSection } from "@/components/promo-section"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromoSection />
      <Testimonials />
      <Newsletter />
    </>
  )
}

