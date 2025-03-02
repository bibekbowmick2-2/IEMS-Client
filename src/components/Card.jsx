import React from "react";
import useStudySessions from "../hooks/useStudySessions";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function ViewSessions() {
  const { sessions } = useStudySessions();
  const currentDate = new Date();

  // Helper function to check registration period
  const isRegistrationOpen = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return currentDate > start && currentDate < end;
  };

  const filtered_sessions = sessions.filter(
    (session) => session.status === "approved"
  );

  return (
    <div className="mt-10">
      <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-black text-center">
        Each <span className="text-[#FF7E84]">session course</span> you desire to join from our community
      </h1>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-3 mt-10">
          {filtered_sessions.map((session) => (
            <div key={session.session_title}>
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
                    {session.session_title}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="white"
                    className="mt-4 flex justify-center gap-1 text-2xl font-normal"
                  >
                    {session.tutorname} ({session.email})
                  </Typography>
                </CardHeader>
                <CardBody className="p-0">
                  <ul className="flex flex-col gap-4">
                    <li className="flex items-start gap-2">
                      <Typography
                        variant="medium"
                        className="font-normal"
                        style={{ padding: "10px" }}
                      >
                        <strong className="text-cyan-300 font-extrabold">
                          Description:
                        </strong>{" "}
                        {session.description}
                      </Typography>
                    </li>
                    <li className="flex items-start gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-cyan-300 font-extrabold">
                          Registration Start:
                        </strong>{" "}
                        {session.start_date}
                      </Typography>
                    </li>
                    <li className="flex items-start gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-cyan-300 font-extrabold">
                          Registration End:
                        </strong>{" "}
                        {session.end_date}
                      </Typography>
                    </li>
                    <li className="flex items-start gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-cyan-300 font-extrabold">
                          Class Start:
                        </strong>{" "}
                        {session.class_start_date}
                      </Typography>
                    </li>
                    <li className="flex items-start gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-cyan-300 font-extrabold">
                          Class End:
                        </strong>{" "}
                        {session.class_end_date}
                      </Typography>
                    </li>
                    <li className="flex items-start gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-cyan-300 font-extrabold">
                          Duration:
                        </strong>{" "}
                        {session.duration} months
                      </Typography>
                    </li>
                    <li className="flex items-start gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-cyan-300 font-extrabold">
                          Fee:
                        </strong>{" "}
                        ${session.fee}
                      </Typography>
                    </li>
                    <li className="flex items-start gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-cyan-300 font-extrabold">
                          Status:
                        </strong>{" "}
                        {session.status.toUpperCase()}
                      </Typography>
                    </li>


                    <li className="flex items-start gap-2 text-purple-500">
                   <Link to={`/session-details/${session.session_title}`} ><a className="underline">Read More</a></Link>
                    </li>
                  </ul>
                </CardBody>
                <CardFooter className="mt-12 p-0">
                  {isRegistrationOpen(session.start_date, session.end_date) ? (
                    <Button
                      size="lg"
                      color="white"
                      className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                      ripple={false}
                      fullWidth={true}
                    >
                      Ongoing
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      color="gray"
                      className="opacity-50 cursor-not-allowed"
                      ripple={false}
                      fullWidth={true}
                      disabled={true}
                    >
                      Registration Closed
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
