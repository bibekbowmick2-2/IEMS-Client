import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { useContext } from "react";
import { ContextProvider } from "../AuthProviders/AuthProvider";




const AdminRoute = ({ children }) => {
    // const { user, loading } = useAuth();
    const { user } = useContext(ContextProvider);
    const [isAdmin] = useAdmin();
    const location = useLocation();
    console.log(isAdmin);

    // if (loading || isAdminLoading) {
    //     return <progress className="progress w-56"></progress>
    // }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;