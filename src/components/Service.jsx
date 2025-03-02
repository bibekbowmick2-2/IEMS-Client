import React from "react";
import im1 from "../assets/amazon.png";
import im2 from "../assets/amex.png";
import im3 from "../assets/bitpay.png";
import im4 from "../assets/citadele.png";
import im5 from "../assets/discover.png";
import im6 from "../assets/payoneer.png";
import im7 from "../assets/paypal.png";
import im8 from "../assets/paysafe.png";
import card1 from "../assets/card-1.jpg"
import card2 from "../assets/card-2.jpg"
import scholar from "../assets/scholar.png"
import { Slide, Fade } from "react-awesome-reveal";
export default function Service() {
  return (
    <div className="my-[10%] bg-[#FFE5E6] outfit-normal rounded-2xl text-gray-700 p-5 md:p-[100px] lg:p-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2 gap-5">
        <Slide direction="left">
          <div className="w-full  bg-[#FFFFFF] p-5 rounded-xl">
            <h1 className="text-2xl md:text-4xl lg:text-4xl text-justify font-bold">
              <span className="text-[#FF7E84]">Payment Methods</span> which you may choose
            </h1>
            <br />

            <div className="grid grid-cols-1  lg:grid-rows-3   gap-y-5 text-white  ">
              <Fade
                delay={600} // Wait before starting
                duration={1000} // Animation duration
                fraction={0.5} // Trigger when 50% visible
              >
                <div className="flex gap-5 bg-violet-500   justify-evenly  items-center h-auto p-2 rounded-md bg-teal-400">
                  <h1 className="text-1xl lg:text-2xl font-extrabold">Lifetime Price</h1>
                  <p>$50/month</p>
                  <button className="btn border-2 bg-teal-400 border-white text-white p-1 md:p-2 lg:p-4">Choose</button>
                </div>
              </Fade>

              <Fade
                delay={800} // Wait before starting
                duration={1000} // Animation duration
                fraction={0.5} // Trigger when 50% visible
              >
                <div className="flex gap-5 bg-slate-400  justify-evenly  items-center h-auto p-2 rounded-md bg-teal-400">
                  <h1 className="text-1xl lg:text-2xl font-extrabold">Business Price</h1>
                  <p>$186/month</p>
                  <button className="btn bg-teal-400 text-white border-2 border-white p-1 md:p-2 lg:p-4">Choose</button>
                </div>
              </Fade>


              <Fade
                delay={1000} // Wait before starting
                duration={1000} // Animation duration
                fraction={0.5} // Trigger when 50% visible
              >
                <div className="flex gap-5 bg-violet-500   justify-evenly  items-center h-auto p-2 rounded-md bg-teal-400">
                  <h1 className="text-1xl lg:text-2xl font-extrabold">Advanced Price</h1>
                  <p>$886/month</p>
                  <button className="btn bg-teal-400 text-white border-2 border-white   p-1 md:p-2 lg:p-4">Choose</button>
                </div>
              </Fade>

            </div>
            
            <Fade
                delay={1000} // Wait before starting
                duration={1000} // Animation duration
                fraction={0.5} // Trigger when 50% visible
              >
                 <h1 className="lg:text-4xl text-justify font-bold mt-2">
              <span className="text-2xl md:text-4xl lg:text-4xl text-justify font-bold" >Cards</span>
            </h1>
                <div className="grid grid-cols-4 grid-rows-2 mt-5 gap-y-4 bg-teal-400 p-5 rounded-xl ">
                  <div className="w-[100px] h-[60px]"><img className="w-full h-full" src={im1} alt="" /></div>
                  <div className="w-[100px] h-[60px]"><img  className="w-full h-full" src={im2} alt="" /></div>
                  <div className="w-[100px] h-[60px]"> <img  className="w-full h-full" src={im3} alt="" /></div>
                  <div className="w-[100px] h-[60px]"> <img  className="w-full h-full" src={im4} alt="" /></div>
                  <div className="w-[100px] h-[60px]"><img  className="w-full h-full" src={im5} alt="" /></div>
                  <div className="w-[100px] h-[60px]"><img  className="w-full h-full" src={im6} alt="" /></div>
                  <div className="w-[100px] h-[60px]"><img  className="w-full h-full" src={im7} alt="" /></div>
                  <div className="w-[100px] h-[60px]"><img  className="w-full h-full" src={im8} alt="" /></div>
            </div>
              </Fade>
            
          </div>
        </Slide>

        <Slide direction="right">
          <div className="w-full lg:h-[80%] ">
            <div className="md:mt-[10%] lg:mt-[10%] grid grid-cols-1  md:gap-x-3 lg:grid-cols-2 lg:grid-rows-3 gap-y-3 ">
              <div className="md:row-span-2 w-full md:w-3/4 lg:w-full mx-auto lg:row-span-2 border-2 border-white ">
                <img className="w-full rounded-xl" src={card1} alt="" />
              </div>
              <div className=" bg-white rounded-full flex justify-center p-4 ">
                <div className="w-[70px] md:w-[50px] lg:w-[90px] "><img className="w-full rounded-xl mt-[10%] md:mt-[10%] lg:mt-[70%]" src={scholar} alt="" /></div>
                <h2 className="card-title  text-gray-800 ">25 Years+ of Experience</h2>
              </div>
              <div className="md:row-span-2 w-full md:w-3/4 lg:w-full mx-auto lg:row-span-2 border-2 border-white ">
                <img className="w-full h-full rounded-xl" src={card2} alt="" />
              </div>
              <div className=" bg-white rounded-full p-2 text-center">
                <h2 className="font-bold text-2xl md:text-6xl lg:text-6xl text-gray-800 ">45+</h2>
                <p className="text-blue-600">Award Winning</p>
              </div>
            </div>
          </div>
        </Slide>

      </div>
    </div>
  );
}
