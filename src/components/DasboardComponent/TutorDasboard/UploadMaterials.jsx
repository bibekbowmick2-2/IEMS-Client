import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useContext } from "react";
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
import { ContextProvider } from "../../AuthProviders/AuthProvider";

export default function UploadMaterials() {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(ContextProvider);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sessions");
      return res.data;
    },
  });

  const filteredUsers = users.filter(
    (f) =>
      f.tutorname === user?.displayName &&
      f.email === user?.email &&
      f.status === "approved"
  );

  const handleMaterials = async (session) => {
    const { _id, email, session_title } = session;

    const setLoadingState = (state) => {
      const loadingIndicator = document.querySelector("#loadingIndicator");
      if (loadingIndicator) {
        loadingIndicator.style.display = state ? "block" : "none";
      }
    };

    Swal.fire({
      position: "center",
      title: "Submit Your Materials",
      html: `
        <form id="materialForm" class="max-w-sm mx-auto mt-3">
          <div class="mb-5">
            <label for="session_title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Session Title</label>
            <input type="text" id="session_title" name="session_title" value="${session_title}" readOnly class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>
          <div class="mb-5">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input type="text" id="title" name="title" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>
          <div class="mb-5">
            <label for="session_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Session ID</label>
            <input type="text" id="session_id" name="sessionId" value="${_id}" readonly class="shadow-xs bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div class="mb-5">
            <label for="tutor_email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tutor Email</label>
            <input type="email" id="tutor_email" name="tutorEmail" value="${email}" readonly class="shadow-xs bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div class="mb-5">
            <label for="image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Image</label>
            <input type="file" id="image" name="image" accept="image/*" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>
          <div class="mb-5">
            <label for="link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Google Drive Link</label>
            <input type="text" id="link" name="link" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          </div>
          <div id="loadingIndicator" style="display: none;" class="text-center">
            <span class="loading loading-bars loading-lg"></span>
          </div>
        </form>
      `,
      confirmButtonText: "Upload",
      showCancelButton: true,
      preConfirm: async () => {
        const form = Swal.getPopup().querySelector("#materialForm");
        const session_title = form.querySelector("#session_title").value;
        const title = form.querySelector("#title").value;
        const sessionId = form.querySelector("#session_id").value;
        const tutorEmail = form.querySelector("#tutor_email").value;
        const link = form.querySelector("#link").value;
        const image = form.querySelector("#image").files[0];

        if (!title || !link || !image) {
          Swal.showValidationMessage("Please fill in all required fields.");
          return null;
        }

        setLoadingState(true);

        try {
          const formData = new FormData();
          formData.append("image", image);

          const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_key}`,
            formData
          );

          const imageUrl = response.data.data.display_url;
          setLoadingState(false);
          return { session_title, title, sessionId, tutorEmail, link, imageUrl };
        } catch (error) {
          setLoadingState(false);
          Swal.showValidationMessage("Failed to upload the image.");
          return null;
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { session_title, title, sessionId, tutorEmail, link, imageUrl } = result.value;

        setLoadingState(true);
        axiosSecure
          .post(`/upload-material`, { session_title, title, sessionId, tutorEmail, link, imageUrl })
          .then((res) => {
            setLoadingState(false);
            if (res.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Material uploaded successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch(() => {
            setLoadingState(false);
            Swal.fire("Error", "Failed to upload material. Try again later.", "error");
          });
      }
    });
  };

  return (
    <div className="container mx-auto px-4">
      <p className="text-3xl font-extrabold text-center mb-11">Approved Sessions</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {filteredUsers.map((user) => (
          <Card
            key={user._id}
            color="gray"
            variant="gradient"
            className="w-full max-w-[22rem] p-8"
          >
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
                <li>
                  <Typography className="font-normal">
                    <strong className="text-cyan-300 font-extrabold">Description:</strong>{" "}
                    {user.description}
                  </Typography>
                </li>
                <li>
                  <Typography className="font-normal">
                    <strong className="text-cyan-300 font-extrabold">Registration Start:</strong>{" "}
                    {user.start_date}
                  </Typography>
                </li>
                <li>
                  <Typography className="font-normal">
                    <strong className="text-cyan-300 font-extrabold">Registration End:</strong>{" "}
                    {user.end_date}
                  </Typography>
                </li>
                <li>
                  <Typography className="font-normal">
                    <strong className="text-cyan-300 font-extrabold">Class Start:</strong>{" "}
                    {user.class_start_date}
                  </Typography>
                </li>
                <li>
                  <Typography className="font-normal">
                    <strong className="text-cyan-300 font-extrabold">Class End:</strong>{" "}
                    {user.class_end_date}
                  </Typography>
                </li>
                <li>
                  <Typography className="font-normal">
                    <strong className="text-cyan-300 font-extrabold">Duration:</strong>{" "}
                    {user.duration} months
                  </Typography>
                </li>
                <li>
                  <Typography className="font-normal">
                    <strong className="text-cyan-300 font-extrabold">Fee:</strong> ${user.fee}
                  </Typography>
                </li>
                <li>
                  <Typography className="font-normal">
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
                onClick={() => handleMaterials(user)}
              >
                Upload Materials
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
