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
export default function Service() {
  return (
    <div className=" bg-[#F2DAEE] outfit-normal rounded-2xl text-gray-700 p-5 md:p-[100px] lg:p-[100px]">
      <p className="text-4xl lg:text-6xl  font-extrabold text-center">
        We strive to provide a pleasant & appropriate service
      </p><br /><br />
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
        <div className="w-full border-2 border-red-50"> 
          <h1 className="text-2xl text-justify font-extrabold">
            Choose one of the prices we provide and you don't need a credit card
            for payment. You can pay by any payment method you like.Its upto
            you.
          </h1>
          <br />
          <p className="text-justify">
            Lobortis consequat pellentesque morbi senectus in amet tellus nec
            quis. Volutpat nullam facilisi viverra elit. Cras at cursus congue
            phasellus viverra tellus risus amet nisl cum.
          </p>
          <div className="grid grid-cols-1  lg:grid-rows-3   gap-y-5  ">
            <div className="flex gap-5 bg-violet-500   justify-evenly  items-center h-auto p-2 rounded-md ">
              <h1 className="text-1xl lg:text-2xl font-extrabold">Lifetime Price</h1>
              <p>$50/month</p>
              <button className="btn btn-success p-1 md:p-2 lg:p-4">Choose</button>
            </div>

            <div className="flex gap-5 bg-slate-400  justify-evenly  items-center h-auto p-2 rounded-md ">
              <h1 className="text-1xl lg:text-2xl font-extrabold">Business Price</h1>
              <p>$186/month</p>
              <button className="btn btn-success p-1 md:p-2 lg:p-4">Choose</button>
            </div>

            <div className="flex gap-5 bg-violet-500   justify-evenly  items-center h-auto p-2 rounded-md">
              <h1 className="text-1xl lg:text-2xl font-extrabold">Advanced Price</h1>
              <p>$886/month</p>
              <button className="btn btn-success p-0 md:p-2 lg:p-4">Choose</button>
            </div>
          </div>

          <div className="grid grid-cols-4 grid-rows-2 mt-5 gap-y-4 ">
            <img src={im1} alt="" />
            <img src={im2} alt="" />
            <img src={im3} alt="" />

            <img src={im4} alt="" />
            <img src={im5} alt="" />
            <img src={im6} alt="" />

            <img src={im7} alt="" />
            <img src={im8} alt="" />
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-1  md:gap-x-3 lg:grid-cols-2 lg:grid-rows-4 gap-y-3">
              <div className="md:row-span-2 lg:row-span-2 border-2 border-white ">
                <img className="w-full rounded-xl" src={card1} alt="" />
              </div>
              <div className=" bg-white rounded-full flex justify-center ">
              <div className="w-[70px] border-2 border-white"><img className="w-full rounded-xl" src={scholar} alt="" /></div>
              <h2 className="card-title  text-gray-800 ">25 Years+ of Experience</h2>
              </div>
              <div className="md:row-span-2 lg:row-span-2 border-2 border-white ">
                <img className="w-full h-full rounded-xl" src={card2} alt="" />
              </div>
              <div className=" bg-white rounded-xl p-5 ">
              <h2 className="font-bold text-2xl md:text-6xl lg:text-6xl text-gray-800">45+</h2>
              <p className="text-blue-600">Award Winning</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
