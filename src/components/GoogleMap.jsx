import React from 'react'

export default function GoogleMap() {
  return (
    <div className='mt-7'>
    <p className='text-5xl font-extrabold mb-4'>Our Location</p>
        <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.7676917322337!2d90.37206597484591!3d23.75566218857519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf534ad4b313%3A0xc7765243f282059f!2sSELISE%20Digital%20Platforms!5e0!3m2!1sen!2sbd!4v1737054712472!5m2!1sen!2sbd"
      width= "100%"

      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
    </div>
  )
}
