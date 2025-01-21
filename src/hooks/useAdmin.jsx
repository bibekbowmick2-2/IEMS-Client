import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { ContextProvider } from "../components/AuthProviders/AuthProvider";
import axios from "axios";


const useAdmin = () => {
    const { user } = useContext(ContextProvider);
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading,  } = useQuery({
        queryKey: user?.email ? [user?.email, 'isAdmin'] : [], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
        
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;