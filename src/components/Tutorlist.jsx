import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function Tutorlist() {
    const { data: tutors = [], refetch } = useQuery({
        queryKey: ["tutors"],
        queryFn: async () => {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/tutor-user`); 
          return res.data;
        },
      });



      const filteredUsers = tutors.filter((user) => user.role === "tutor");
      console.log(filteredUsers);
  return (
    <div className='mt-7 p-7'>
      <p className='text-5xl font-extrabold mb-4 text-center'>Tutor Section</p>
      

<div class="w-full mx-auto max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">All Tutors List</h5>
        <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            Role
        </a>
   </div>
   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        {
            filteredUsers.map((fuser) => (

                <li class="py-3 sm:py-4">
                <div class="flex items-center">
                    <div class="shrink-0">
                        <img class="w-8 h-8 rounded-full" src={fuser.image} alt="Neil image"/>
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {fuser.name}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {fuser.email}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {fuser.role}
                    </div>
                </div>
            </li>
            ))
        }
           
            
        </ul>
   </div>
</div>

    </div>
  )
}
