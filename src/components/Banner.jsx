import React from 'react'
import im2 from '../assets/hero_image_4.png'
import './Banner.css'
export default function Banner() {
  return (
    <div className='grid grid-cols-3 mt-20  gap-20 '>
    <div className='col-span-2'>
        <p className='text-2xl  lg:text-6xl sm:w-36 lg:w-2  font-extrabold text-center'>Shared <span className='text-[#4662b2]'>Collaborative</span> Platform, For Your Education</p>
        
        <br/>
        <br/>
        <div className='flex gap-2 '>
        <input
  type="text"
  placeholder="Type here"
  class="input input-bordered input-secondary w-full max-w-xs" />
        <button className='btn btn-primary'>Send Invitation</button>
        </div>
    </div>
    <div id='imdiv'>
        <img  src={im2}/>
    </div>

    </div>
  )
}
