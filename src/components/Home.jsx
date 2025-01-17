import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import Service from './Service'
import Card from './Card'
import GoogleMap from './GoogleMap'
import Footer from './Footer'

export default function Home() {
  return (
    <div className='mx-auto max-w-[1440px] max-h-full '>
        <Navbar/>
        <Banner/>
        <Service/>
        <Card/>
        <GoogleMap/>
        <Footer/>
        </div>
  )
}
