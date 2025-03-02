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
            <p className="text-2xl md:text-4xl lg:text-4xl font-bold text-black text-center">Tutor Section</p>
            <div className="w-full mx-auto max-w-md">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">All Tutors List</h5>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        Role
                    </a>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            filteredUsers.map((fuser) => (
                              <>
                               <li className="py-3 sm:py-4">
                                    <div className="flex items-center">
                                        <div className="shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={fuser.image} alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {fuser.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {fuser.email}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {fuser.role}
                                        </div>
                                    </div>
                                </li>
                              </>
                               
                            ))
                        }


                    </ul>
                </div>
            </div>

        </div>
    )
}
