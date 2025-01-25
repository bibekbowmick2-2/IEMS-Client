import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReactPaginate from "react-paginate";
import { ContextProvider } from "../../AuthProviders/AuthProvider";


export default function ViewStudySession() {
  const { user } = useContext(ContextProvider);
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sessions");
      return res.data;
    },
  });


  const filteredUsers = users.filter((f) => f.tutorname === user?.displayName && f.email === user?.email);


  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; 

  
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  
  const currentItems = filteredUsers.slice(startIndex, endIndex);

  
  const pageCount = Math.ceil(users.length / itemsPerPage);

  
  const handlePageClick = (event) => {

    setCurrentPage(event.selected);

  };

  return (
    <div>
      <p className="text-3xl font-extrabold text-center mb-11">
        View Study Session
      </p>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
        
          
         
          className="flex gap-3 text-gray-800"
          pageClassName={
      "flex items-center justify-center px-4 py-2 border border-blue-600 rounded-md cursor-pointer hover:bg-gray-200"
    }
    activeClassName={
      "bg-blue-600 text-white border border-blue-600 font-bold hover:bg-blue-600"
    }
    previousLinkClassName={
      "flex items-center border border-blue-600 justify-center px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200"
    }
    nextLinkClassName={
      "flex items-center border border-blue-600 justify-center px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200"
    }
    breakClassName={
      "flex items-center justify-center px-4 py-2 border rounded-md cursor-default"
    }


    disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center mt-10">
        {currentItems.map((user) => (
          <div key={user._id}>
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
                    <Typography variant="medium" className="font-normal" style={{ padding: "10px" }}>
                      <strong className="text-cyan-300 font-extrabold">Description:</strong> {user.description}
                    </Typography>
                  </li>
                  <li className="flex items-start gap-2">
                    <Typography variant="small" className="font-normal">
                      <strong className="text-cyan-300 font-extrabold">Registration Start:</strong>{" "}
                      {user.start_date}
                    </Typography>
                  </li>
                  <li className="flex items-start gap-2">
                    <Typography variant="small" className="font-normal">
                      <strong className="text-cyan-300 font-extrabold">Registration End:</strong>{" "}
                      {user.end_date}
                    </Typography>
                  </li>
                  <li className="flex items-start gap-2">
                    <Typography variant="small" className="font-normal">
                      <strong className="text-cyan-300 font-extrabold">Class Start:</strong>{" "}
                      {user.class_start_date}
                    </Typography>
                  </li>
                  <li className="flex items-start gap-2">
                    <Typography variant="small" className="font-normal">
                      <strong className="text-cyan-300 font-extrabold">Class End:</strong>{" "}
                      {user.class_end_date}
                    </Typography>
                  </li>
                  <li className="flex items-start gap-2">
                    <Typography variant="small" className="font-normal">
                      <strong className="text-cyan-300 font-extrabold">Duration:</strong>{" "}
                      {user.duration} months
                    </Typography>
                  </li>
                  <li className="flex items-start gap-2">
                    <Typography variant="small" className="font-normal">
                      <strong className="text-cyan-300 font-extrabold">Fee:</strong> ${user.fee}
                    </Typography>
                  </li>
                  <li className="flex items-start gap-2">
                    <Typography variant="small" className="font-normal">
                      <strong className="text-cyan-300 font-extrabold">Status:</strong>{" "}
                      {user.status.toUpperCase()}
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
        ))}
      </div>



      

      
    </div>
  );
}
