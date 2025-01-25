import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import Service from './Service'
import Card from './Card'
import GoogleMap from './GoogleMap'
import Tutorlist from './Tutorlist'


export default function Home() {
  return (
    <div className='mx-auto max-w-[1440px] max-h-full '>
       
        <Banner/>
        <Service/>
        <Card/>
        <GoogleMap/>
        <Tutorlist/>
     
        </div>
  )
}
