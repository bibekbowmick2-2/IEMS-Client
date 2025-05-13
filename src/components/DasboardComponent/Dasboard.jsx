import React from 'react'
import Chart from "react-apexcharts";
import {
  useQuery
} from '@tanstack/react-query'
import { axiosSecure } from '../../hooks/useAxiosSecure';
import {useEffect,useState} from 'react'
export default function Dasboard() {

   const [session, setSession] = useState(0);
   const [admin, setAdmin] = useState(0);
   const [student,setstudent] = useState(0);
   const [tutor,settutor] = useState(0);
   const [approved, setApproved] = useState(0);
   const [pending, setPending] = useState(0);
   const [rejected, setRejected] = useState(0);




 useEffect(() => {
    axiosSecure.get('/information').then(res => {
      console.log(res.data.length);
      console.log(res.data.admin);
      setSession(res.data.length);
      setAdmin(res.data.admin);
      setstudent(res.data.student);
      settutor(res.data.tutor);
      setApproved(res.data.approved);
      setPending(res.data.pending);
      setRejected(res.data.rejected);

      

      
    })
 }, [])


 


  const options = {
    labels: ["Admin", "Tutor", "Student"],
  };

  const series = [admin, tutor, student];

  const options2 = {
    labels: [ "Approved", "Pending","Rejected"],
  };

  const series2 = [approved, pending,rejected];
  return (
    <div className="bg-gradient-to-r from-[#6DADD9] via-[#9099CD] to-[#8B9ACD] text-black p-5 ">
      <h1 className="text-2xl md:text-4xl lg:text-4xl bg-teal-400 p-5 text-black text-justify font-bold">Users and Session Info</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        <div className="w-full bg-red-500 ">
          <div className="card-body">
            <h2 className="card-title text-black">Total Number of Student</h2>
            <p className="text-3xl text-black">{student}</p>
          </div>
        </div>


        <div className=" bg-green-400 w-full">
          <div className="card-body">
            <h2 className="card-title text-black">Total Number of Tutor</h2>
            <p className="text-3xl text-black">{tutor}</p>
          </div>
        </div>

        <div className=" bg-blue-400 w-full">
          <div className="card-body">
            <h2 className="card-title text-black">Total Number of Admin</h2>
            <p className="text-3xl text-black">{admin}</p>
          </div>
        </div>

        <div className="w-full bg-purple-500 ">
          <div className="card-body">
            <h2 className="card-title text-black">Total Number of Session</h2>
            <p className="text-3xl text-black">{session}</p>
          </div>
        </div>

        <div className="w-full bg-yellow-300">
          <div className="card-body">
            <h2 className="card-title text-black">Total Number of session approved</h2>
            <p className="text-3xl text-black">{approved}</p>
          </div>
        </div>

        <div className="w-full bg-teal-400 ">
          <div className="card-body">
            <h2 className="card-title text-black">Total Number of Session pending</h2>
            <p className="text-3xl text-black">{pending}</p>
          </div>
        </div>


        <div className="w-full bg-teal-400 ">
          <div className="card-body">
            <h2 className="card-title text-black">Total Number of Session Rejected</h2>
            <p className="text-3xl text-black">{rejected}</p>
          </div>
        </div>
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-4xl bg-teal-400 p-5 text-black text-justify font-bold">Users and Session Pie chart</h1> <br />
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 p-5">
      <div className="">
          <h1 className="text-2xl md:text-4xl lg:text-4xl text-black text-justify font-bold">Pie Chart Users</h1>
          <Chart options={options} series={series} type="pie" width="300" />
        </div>
        <div className="">
          <h1 className="text-2xl md:text-4xl lg:text-4xl text-black text-justify font-bold">Pie Chart Session</h1>
          <Chart options={options2} series={series2} type="pie" width="300" />
        </div>
      </div>
    </div>
  )
}
