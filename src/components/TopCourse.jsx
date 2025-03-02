
import { Slide } from "react-awesome-reveal";
import c1 from "../assets/c1.png"
import c2 from "../assets/c2.png"
import c3 from "../assets/c3.png"
import { MdOutlinePlayLesson } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
const TopCourse = () => {
    return (
        <div className='my-[100px] bg-yellow-50 py-[100px] px-5'>
            <Slide direction="left">
                <p className='text-teal-400 text-xl text-center'>Popular Courses</p>
                <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-black text-center">Choose Our Top <span className='text-[#FF7E84]'>Courses</span></h1>
            </Slide>
            <Slide direction="up">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 gap-5 my-5 ">
                    <div className=" bg-white w-full shadow-sm rounded-xl border-2 border-gray-200">
                        <div className="w-full">
                            <img className='w-full' src={c1} alt="Shoes" />
                        </div>
                        <div className="px-5 pb-4">
                            <h2 className=" text-teal-400 text-xl md:text-2xl lg:text-2xl font-bold">
                                $29.00
                            </h2>
                            <h2 className=" text-black text-xl md:text-2xl lg:text-2xl font-bold">
                                Financial Security Thinking and Principles Theory
                            </h2>
                            <div className="flex gap-5">
                                <div className="text-[#FF7E84] flex items-center gap-3"><MdOutlinePlayLesson /> <span className='text-gray-400'> Lessons 2</span>
                               </div>
                                <div className="text-[#FF7E84] flex items-center gap-3"><FaRegStar /><span className='text-gray-400'>4.5</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white w-full shadow-sm rounded-xl border-2 border-gray-200">
                        <div className="w-full">
                            <img className='w-full' src={c2} alt="Shoes" /></div>
                        <div className="px-5 pb-4">
                            <h2 className=" text-teal-400 text-xl md:text-2xl lg:text-2xl font-bold">
                                $29.00
                            </h2>
                            <h2 className=" text-black text-xl md:text-2xl lg:text-2xl font-bold">
                            Basic Fundamentals of Interior & Graphics Design
                            </h2>
                            <div className="flex gap-5">
                                <div className="text-[#FF7E84] flex items-center gap-3"><MdOutlinePlayLesson /> <span className='text-gray-400'> Lessons 2</span>
                               </div>
                                <div className="text-[#FF7E84] flex items-center gap-3"><FaRegStar /><span className='text-gray-400'>4.5</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white w-full shadow-sm rounded-xl border-2 border-gray-200">
                        <div className="w-full">
                            <img className='w-full' src={c3} alt="Shoes" /></div>
                        <div className="px-5 pb-4">
                            <h2 className=" text-teal-400 text-xl md:text-2xl lg:text-2xl font-bold">
                                $29.00
                            </h2>
                            <h2 className=" text-black text-xl md:text-2xl lg:text-2xl font-bold">
                            Increasing Engagement with Instagram & Facebook
                            </h2>
                            <div className="flex gap-5">
                                <div className="text-[#FF7E84] flex items-center gap-3"><MdOutlinePlayLesson /> <span className='text-gray-400'> Lessons 2</span>
                               </div>
                                <div className="text-[#FF7E84] flex items-center gap-3"><FaRegStar /><span className='text-gray-400'>4.5</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Slide>
        </div>
    );
};

export default TopCourse;