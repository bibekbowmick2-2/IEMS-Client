import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { ContextProvider } from "../components/AuthProviders/AuthProvider";



const useStudent = () => {
    const { user } = useContext(ContextProvider);
    const axiosSecure = useAxiosSecure();
    const { data: isStudent, isPending: isStudentLoading,  } = useQuery({
        queryKey: user?.email ? [user?.email, 'isStudent'] : [], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/student/${user.email}`);
        
            return res.data?.student ;
        }
    })
    return [isStudent, isStudentLoading]
};

export default useStudent;