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
import { Slide, Fade } from "react-awesome-reveal";
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
      <Slide direction="right">
        <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-black text-center">
          Each <span className="text-[#FF7E84]">session course</span> you desire to join from our community
        </h1>
      </Slide>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
        {filtered_sessions.map((session) => (
          <div key={session.session_title}>
            <Fade
              delay={200} // Wait before starting
              duration={1000} // Animation duration
              fraction={0.2} // Trigger when 50% visible
            >
              <Card variant="gradient" className="w-full h-[750px] p-8 bg-teal-300 text-white">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className=" mb-8 rounded-none border-b border-white/10 pb-8 text-center"
                >
                  <Typography
                    variant="small"
                    color="white"
                    className=" bg-white p-3 text-2xl font-bold rounded-xl text-black"
                  >
                    {session.session_title}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="white"
                    className="mt-4 flex justify-center gap-1 text-lg p-2 rounded-xl font-bold bg-white text-black"
                  >
                    {session.tutorname} ({session.email})
                  </Typography>
                </CardHeader>
                <CardBody className="p-5 bg-white text-black rounded-xl ">
                  <ul className="flex flex-col gap-4">
                    <li className="flex gap-2">
                      <Typography
                        variant="medium"
                        className="font-normal"
                      >
                        <strong className="text-black font-extrabold">
                          Description:
                        </strong>{" "}
                        {session.description}
                      </Typography>
                    </li>
                    <li className="flex gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-black font-extrabold">
                          Registration Start:
                        </strong>{" "}
                        {session.start_date}
                      </Typography>
                    </li>
                    <li className="flex gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-black font-extrabold">
                          Registration End:
                        </strong>{" "}
                        {session.end_date}
                      </Typography>
                    </li>
                    <li className="flex gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-black font-extrabold">
                          Class Start:
                        </strong>{" "}
                        {session.class_start_date}
                      </Typography>
                    </li>
                    <li className="flex gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-black font-extrabold">
                          Class End:
                        </strong>{" "}
                        {session.class_end_date}
                      </Typography>
                    </li>
                    <li className="flex gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-black font-extrabold">
                          Duration:
                        </strong>{" "}
                        {session.duration} months
                      </Typography>
                    </li>
                    <li className="flex gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-black font-extrabold">
                          Fee:
                        </strong>{" "}
                        ${session.fee}
                      </Typography>
                    </li>
                    <li className="flex gap-2">
                      <Typography variant="small" className="font-normal">
                        <strong className="text-black font-extrabold">
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
            </Fade>



          </div>
        ))}
      </div>

    </div>
  );
}
