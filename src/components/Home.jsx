
import Banner from './Banner'
import Service from './Service'
import Card from './Card'
import GoogleMap from './GoogleMap'
import Tutorlist from './Tutorlist'
import WhyChoose from './WhyChoose'

export default function Home() {
  return (
    <div className='mx-auto max-w-full lg:max-w-7xl'>
       
       <div className=""><Banner /></div> 
        <Service/>
        <WhyChoose></WhyChoose>
        <Card/>
        <GoogleMap/>
        <Tutorlist/>
     
        </div>
  )
}
