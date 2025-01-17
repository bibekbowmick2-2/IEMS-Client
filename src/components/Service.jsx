import React from "react";
import im1 from "../assets/amazon.png";
import im2 from "../assets/amex.png";
import im3 from "../assets/bitpay.png";
import im4 from "../assets/citadele.png";
import im5 from "../assets/discover.png";
import im6 from "../assets/payoneer.png";
import im7 from "../assets/paypal.png";
import im8 from "../assets/paysafe.png";
export default function Service() {
  return (
    <div className="mt-9">
      <p className="text-4xl lg:text-6xl font-extrabold text-center">
        We strive to provide a pleasant & appropriate service
      </p>
      <div className="grid grid-cols-1  lg:grid-cols-2 mt-16 justify-center">
        <div>
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

        <div className="mx-auto lg:mx-28">
          <div className="grid grid-cols-1  md:gap-x-3 lg:grid-rows-4 gap-y-3">
            <div className="card bg-gray-400 w-72 md:w-80 lg:w-96 shadow-xl max-h-48">
              <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p className="text-justify">If a dog chews shoes whose shoes does he choose?</p>
               
              </div>
            </div>

            <div className="card bg-gray-400 w-72 md:w-80 lg:w-96 shadow-xl max-h-48">
              <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p className="text-justify">If a dog chews shoes whose shoes does he choose?</p>
                
              </div>
            </div>

            <div className="card bg-gray-400 w-72 md:w-80 lg:w-96 shadow-xl max-h-48">
              <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p className="text-justify">If a dog chews shoes whose shoes does he choose?</p>
                
              </div>
            </div>

            <div className="card bg-gray-400 w-72 md:w-80 lg:w-96 shadow-xl max-h-48">
              <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p className="text-justify">If a dog chews shoes whose shoes does he choose?</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
