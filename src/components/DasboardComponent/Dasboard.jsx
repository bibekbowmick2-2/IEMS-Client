import React from 'react'
import Chart from "react-apexcharts";
export default function Dasboard() {
  const options = {
    labels: ["Admin", "Tutor", "Student"],
  };

  const series = [5, 100, 300];

  const options2 = {
    labels: [ "Approved", "Pending","SessionNo"],
  };

  const series2 = [70, 30,100];
  return (
    <div className="bg-white p-5 ">
      <h1 className="text-2xl md:text-4xl lg:text-4xl bg-teal-400 p-5 text-white text-justify font-bold">Users and Session Info</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 my-10">
        <div className="card card-border bg-red-500 w-96">
          <div className="card-body">
            <h2 className="card-title">Total Number of Student</h2>
            <p className="text-3xl text-white">300</p>
          </div>
        </div>


        <div className="card card-border bg-green-400 w-96">
          <div className="card-body">
            <h2 className="card-title">Total Number of Tutor</h2>
            <p className="text-3xl text-white">100</p>
          </div>
        </div>

        <div className="card card-border bg-blue-400 w-96">
          <div className="card-body">
            <h2 className="card-title">Total Number of Admin</h2>
            <p className="text-3xl text-white">5</p>
          </div>
        </div>

        <div className="card card-border bg-purple-500 w-96">
          <div className="card-body">
            <h2 className="card-title">Total Number of Session</h2>
            <p className="text-3xl text-white">100</p>
          </div>
        </div>

        <div className="card card-border bg-yellow-300 w-96">
          <div className="card-body">
            <h2 className="card-title">Total Number of session approved</h2>
            <p className="text-3xl text-white">70</p>
          </div>
        </div>

        <div className="card card-border bg-teal-400 w-96">
          <div className="card-body">
            <h2 className="card-title">Total Number of Session pending</h2>
            <p className="text-3xl text-white">30</p>
          </div>
        </div>
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-4xl bg-teal-400 p-5 text-white text-justify font-bold">Users and Session Pie chart</h1> <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
      <div className="">
          <h1 className="text-2xl md:text-4xl lg:text-4xl text-purple-500 text-justify font-bold">Pie Chart Users</h1>
          <Chart options={options} series={series} type="pie" width="400" />
        </div>
        <div className="">
          <h1 className="text-2xl md:text-4xl lg:text-4xl text-purple-500 text-justify font-bold">Pie Chart Session</h1>
          <Chart options={options2} series={series2} type="pie" width="400" />
        </div>
      </div>
    </div>
  )
}
