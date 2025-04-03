import React from 'react'
import Home from './(user)/home/page'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  )
}

export default LandingPage