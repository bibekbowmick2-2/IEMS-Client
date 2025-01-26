import { useQuery } from "@tanstack/react-query";

import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { LuSearchX } from "react-icons/lu";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });


  const dataToDisplay = searchResults || users;

  // const filteredRejectedSessions = dataToDisplay.filter(
  //   (session) => session.status !== "rejected"
  // );



  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };






  const handleRoleChange = (user, role) => {
    axiosSecure.patch(`/users/${role}/${user._id}`)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is now a ${role}!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }




  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) {
      setError('Please enter a search query.');
      return;
    }

  

    setError('');
    //setLoading(true);
    try {
      const response = await axiosSecure.get(`/search?q=${query}`,{
        timeout: 8000,
      });

      if (response.data) {
        console.log(response.data); 
        setSearchResults(response.data); 
        setQuery("");
      
  
       
      }
    
    } catch (err) {
      setError('Error fetching data. Please try again.');
    } finally {
      //setLoading(false);
    }

  }



  const handleClearSearch = () => {
    setSearchResults(null); 
    setQuery("");
    
    refetch(); 
  };


  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {dataToDisplay.length}</h2>
      </div>



      <form class="flex items-center w-[330px] mx-auto" onSubmit={handleSearch}>   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
   
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                
            </svg>
          
        </div>
      
        <input onChange={(e) => setQuery(e.target.value)} type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Name or Email" required />
    </div>

    <div className="flex gap-4">
    <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>

    <button className="btn btn-error" onClick={handleClearSearch}><LuSearchX /></button>
    </div>
    
</form>


      <div className="overflow-x-auto">
        <table  className="table table-zebra w-full ">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user, e.target.value)}
                    className="form-select"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
