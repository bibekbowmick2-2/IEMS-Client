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



      <form className="flex items-center w-[330px] mx-auto" onSubmit={handleSearch}>   
      <label className="">Search</label>
      <input className="input p-5 rounded-xl bg-white"  placeholder="Search" type="text" name="" id="" />
</form>


      <div className="overflow-x-auto">
        <table  className=" w-full p-5 ">
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
