import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import React from 'react'
import "@/app/globals.css"

export const metadata = {
    title: "SajiloMart - Your One-Stop Shopping Destination",
    description: "Discover amazing products at unbeatable prices at SajiloMart.",
  }
const Userlayout = ({children}) => {
    
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
  )
}

export default Userlayout