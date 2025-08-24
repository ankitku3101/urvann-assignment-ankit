import React from 'react'
import { HeroSection } from './sections/HeroSection'
import { Navbar } from './sections/Navbar'
import NewArrivals from './sections/NewArrivals'
import PlantShop from './sections/PlantShop'
import { Footer } from './sections/Footer'

function page() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <NewArrivals />
      <PlantShop />
      <Footer />
    </>
  )
}

export default page