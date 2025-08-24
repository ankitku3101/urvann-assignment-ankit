"use client"

import React from 'react'
import { HeroSection } from './sections/HeroSection'
import { Navbar } from './sections/Navbar'
import { Footer } from './sections/Footer'
import { NewArrivals } from './sections/NewArrivals'
import { PlantShop } from './sections/PlantShop'

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