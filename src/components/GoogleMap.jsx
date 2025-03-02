import React from 'react'
import { FaMailBulk } from "react-icons/fa";
import { Slide, Fade } from "react-awesome-reveal";
export default function GoogleMap() {
  return (
    <div className='my-[100px] bg-[#30BEAD] p-5'>
      <Slide direction="right">
        <p className="text-2xl md:text-4xl lg:text-4xl font-bold text-white text-center">Our Location</p>
      </Slide>
      <div className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2 gap-5 mt-5">
        <Fade
          delay={200} // Wait before starting
          duration={1000} // Animation duration
          fraction={0.2} // Trigger when 50% visible
        >
          <div className="p-5 rounded-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.7676917322337!2d90.37206597484591!3d23.75566218857519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf534ad4b313%3A0xc7765243f282059f!2sSELISE%20Digital%20Platforms!5e0!3m2!1sen!2sbd!4v1737054712472!5m2!1sen!2sbd"
              width="100%"
              className='rounded-xl'
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Fade>

        <Fade
          delay={400} // Wait before starting
          duration={1000} // Animation duration
          fraction={0.2} // Trigger when 50% visible
        >
          <div className="">
            <div className="w-full h-1/2 mt-[10%] space-y-5">
              <div className="flex gap-2 md:gap-5 lg:gap-5">
                <FaMailBulk className='text-5xl md:text-5xl lg:text-5xl text-white ' />
                <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-white text-center">Subscribe to Our Newsletter</h1>
              </div>
              <input type="text" placeholder='Your Email' className='p-5 rounded-xl w-full border-none' />
              <button className="btn border-2 border-white text-white w-full bg-[#30BEAD] text-xl">Subscribe</button>
            </div>
          </div>
        </Fade>

      </div>

    </div>
  )
}
