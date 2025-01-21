import React from 'react'
import { useQuery } from "@tanstack/react-query";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
   
  
export default function ViewStudySession() {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosSecure.get("/sessions");
        return res.data;
      },
    });
  return (
    <div><p className='text-3xl front-extrabold text-center mb-11'>View Study Session</p>


    <div className='grid grid-cols-3 gap-y-5 justify-center'>

    {
        users.map ((user) => (
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
      className="font-normal uppercase text-cyan-300"
    >
      {user.session_title}
    </Typography>
    <Typography
      variant="h5"
      color="white"
      className="mt-4 flex justify-center gap-1 text-2xl font-normal"
    >
      {user.tutorname} ({user.email})
    </Typography>
  </CardHeader>
  <CardBody className="p-0">
    <ul className="flex flex-col gap-4">
      <li className="flex items-start gap-2">
        <Typography variant="medium" className="font-normal" style={{padding: "10px"}}>
          <strong  className='text-cyan-300 font-extrabold'>Description:</strong> {user.description}
        </Typography>
      </li>
      <li className="flex items-start gap-2">
        <Typography variant="small" className="font-normal">
          <strong  className='text-cyan-300 font-extrabold'>Registration Start:</strong> {user.start_date}
        </Typography>
      </li>
      <li className="flex items-start gap-2">
        <Typography variant="small" className="font-normal">
          <strong  className='text-cyan-300 font-extrabold'>Registration End:</strong> {user.end_date}
        </Typography>
      </li>
      <li className="flex items-start gap-2">
        <Typography variant="small" className="font-normal">
          <strong  className='text-cyan-300 font-extrabold'>Class Start:</strong> {user.class_start_date}
        </Typography>
      </li>
      <li className="flex items-start gap-2">
        <Typography variant="small" className="font-normal">
          <strong  className='text-cyan-300 font-extrabold'>Class End:</strong> {user.class_end_date}
        </Typography>
      </li>
      <li className="flex items-start gap-2">
        <Typography variant="small" className="font-normal">
          <strong  className='text-cyan-300 font-extrabold'>Duration:</strong> {user.duration} months
        </Typography>
      </li>
      <li className="flex items-start gap-2">
        <Typography variant="small" className="font-normal">
          <strong  className='text-cyan-300 font-extrabold'>Fee:</strong> ${user.fee}
        </Typography>
      </li>
      <li className="flex items-start gap-2">
        <Typography variant="small" className="font-normal">
          <strong className='text-cyan-300 font-extrabold' >Status:</strong> {user.status.toUpperCase()}
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
        ))
    }

    


    </div>
    
    </div>
  )
}
