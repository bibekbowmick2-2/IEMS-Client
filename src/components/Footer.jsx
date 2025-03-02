import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <div className='bg-[#0C1427]'>
      <footer className="footer outfit-normal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  text-gray-400 text-[16px] py-[100px]  mx-auto max-w-full lg:max-w-7xl p-5 ">
        <div className="col-span-2 space-y-4">
          <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold">Earlnapp</h1>
          <p>Earlapp is an online learning platform that enables teachers and students to connect and conduct classes remotely</p>
          <div className="flex gap-4">
          <div className="hover:bg-white hover:text-black"><a className="text-3xl"><FaFacebook /></a></div>
          <div className="hover:bg-white hover:text-black"><a className="text-3xl"><FaTwitterSquare /></a></div>
          <div className="hover:bg-white hover:text-black"><a className="text-3xl"><FaLinkedin /></a></div>
          <div className="hover:bg-white hover:text-black"><a className="text-3xl"><FaInstagramSquare /></a></div>
          </div>
          
        </div>
        <div className="space-y-4">
          <h6 className="text-lg md:text-2xl lg:text-2xl font-bold">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div  className="space-y-4">
          <h6 className="text-lg md:text-2xl lg:text-2xl font-bold">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>

        <div className="col-span-2 space-y-4">
          <h6 className="text-lg md:text-2xl lg:text-2xl font-bold">News Letter</h6>
          <p className="link link-hover">Join over 68,000 people getting our emails Lorem ipsum dolor sit amet consectet</p>
          <input className="p-3 w-full rounded-xl" placeholder="Enter your Email" type="text" name="" id="" />
          <button className="btn w-full bg-[#FF7E84] text-white"> Subscribe Now</button>
        </div>
      </footer>
      <footer className="footer bg-[#0C1427] text-gray-400 border-base-300 border-t px-10 py-4 ">
        <aside className="grid-flow-col items-center mx-auto">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current">
            <path
              d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
      </footer>
    </div>
  )
}
