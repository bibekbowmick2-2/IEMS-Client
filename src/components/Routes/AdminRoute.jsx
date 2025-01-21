

import { Navigate} from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { useContext } from "react";
import { ContextProvider } from "../AuthProviders/AuthProvider";

const AdminRoute = ({children}) => {
    const { user } = useContext(ContextProvider);
    const [isAdmin] = useAdmin();
    

    if (user && isAdmin) {
        return children;
    }



    // if (loading || isAdminLoading) {
    //     return <progress className="progress w-56"></progress>
    // }

    return (
        <div>
            <Navigate to="/"></Navigate>
        </div>
    );
};

export default AdminRoute;