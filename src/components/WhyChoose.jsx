
import img1 from "../assets/section-bg-1.png"
import { SiSololearn } from "react-icons/si";
import { MdComputer } from "react-icons/md";
import { Slide } from "react-awesome-reveal";
import { FaHeadphones } from "react-icons/fa";
const WhyChoose = () => {
    return (
        <div className='w-full h-[1200px] md:h-[1200px] lg:h-[500px] relative'>
            <img className='w-full h-full' src={img1} alt="" />
            <div className="absolute top-[10%] md:top-[15%] lg:top-[10%] left-0 w-full lg:h-[600px] p-5">
                <Slide direction="left">
                    <p className='text-teal-400 text-xl text-center'>Core Features</p>
                    <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-black text-center">Why <span className='text-[#FF7E84]'>Choose</span>Earlapp? </h1>
                </Slide>

                <Slide direction="up">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 my-5">
                        <div className="bg-white p-5 rounded-xl space-y-4">
                            <div className="text-teal-400 text-5xl bg-[#DBF2EF] w-[90px] p-5 rounded-full"><SiSololearn /></div>
                            <h1 className='text-xl md:text-2xl lg:text-2xl font-bold text-black '>Learn More Anywhere</h1>
                            <p className='text-lg'>Learn from anywhere in world on desktop, mobile or tablet with an Internet connection.</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl space-y-4">
                            <div className="text-teal-400 text-5xl bg-[#DBF2EF] w-[90px] p-5 rounded-full"><MdComputer /></div>
                            <h1 className='text-xl md:text-2xl lg:text-2xl font-bold text-black '>Expert Instructor</h1>
                            <p className='text-lg'>Learn from anywhere in world on desktop, mobile or tablet with an Internet connection.</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl space-y-4">
                            <div className="text-teal-400 text-5xl bg-[#DBF2EF] w-[90px] p-5 rounded-full"><FaHeadphones /></div>
                            <h1 className='text-xl md:text-2xl lg:text-2xl font-bold text-black '>24/7 Strong Support</h1>
                            <p className='text-lg'>Learn from anywhere in world on desktop, mobile or tablet with an Internet connection.</p>
                        </div>
                    </div>
                </Slide>

            </div>

        </div>
    );
};

export default WhyChoose;