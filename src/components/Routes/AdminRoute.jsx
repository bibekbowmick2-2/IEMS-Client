

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



    
    return (
        <div>
            <Navigate to="/"></Navigate>
        </div>
    );
};

export default AdminRoute;