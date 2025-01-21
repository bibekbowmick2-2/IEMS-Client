import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  function CheckIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-3 w-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    );
  }
export default function ViewStudySession() {
  return (
    <div><p className='text-3xl front-extrabold text-center mb-11'>View Study Session</p>


    <div className='grid grid-cols-3 justify-center'>

    <div>

    <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="small"
          color="white"
          className="font-normal uppercase"
        >
          {data.session_title}
        </Typography>
        <Typography
          variant="h5"
          color="white"
          className="mt-4 flex justify-center gap-1 text-2xl font-normal"
        >
          {data.tutorname} ({data.email})
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          <li className="flex items-start gap-2">
            <Typography variant="small" className="font-normal">
              <strong>Description:</strong> {data.description}
            </Typography>
          </li>
          <li className="flex items-start gap-2">
            <Typography variant="small" className="font-normal">
              <strong>Registration Start:</strong> {data.start_date}
            </Typography>
          </li>
          <li className="flex items-start gap-2">
            <Typography variant="small" className="font-normal">
              <strong>Registration End:</strong> {data.end_date}
            </Typography>
          </li>
          <li className="flex items-start gap-2">
            <Typography variant="small" className="font-normal">
              <strong>Class Start:</strong> {data.class_start_date}
            </Typography>
          </li>
          <li className="flex items-start gap-2">
            <Typography variant="small" className="font-normal">
              <strong>Class End:</strong> {data.class_end_date}
            </Typography>
          </li>
          <li className="flex items-start gap-2">
            <Typography variant="small" className="font-normal">
              <strong>Duration:</strong> {data.duration} months
            </Typography>
          </li>
          <li className="flex items-start gap-2">
            <Typography variant="small" className="font-normal">
              <strong>Fee:</strong> ${data.fee}
            </Typography>
          </li>
          <li className="flex items-start gap-2">
            <Typography variant="small" className="font-normal">
              <strong>Status:</strong> {data.status}
            </Typography>
          </li>
        </ul>
      </CardBody>
      <CardFooter className="mt-12 p-0">
        <Button
          size="lg"
          color="white"
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          ripple={false}
          fullWidth={true}
        >
          Enroll Now
        </Button>
      </CardFooter>
    </Card>


</div>


    </div>
    
    </div>
  )
}
