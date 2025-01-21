import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { ContextProvider } from "../components/AuthProviders/AuthProvider";



const useTutor = () => {
    const { user } = useContext(ContextProvider);
    const axiosSecure = useAxiosSecure();
    const { data: isTutor, isPending: isTutorLoading,  } = useQuery({
        queryKey: user?.email ? [user?.email, 'isTutor'] : [], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/tutor/${user.email}`);
        
            return res.data?.tutor;
        }
    })
    return [isTutor, isTutorLoading]
};

export default useTutor;