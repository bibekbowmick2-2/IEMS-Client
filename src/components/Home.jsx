
import Banner from './Banner'
import Service from './Service'
import Card from './Card'
import GoogleMap from './GoogleMap'
import Tutorlist from './Tutorlist'


export default function Home() {
  return (
    <div className='mx-auto max-w-full lg:max-w-7xl'>
       
       <div className="max-w-full lg:max-w-8xl"><Banner /></div> 
        <Service/>
        <Card/>
        <GoogleMap/>
        <Tutorlist/>
     
        </div>
  )
}
