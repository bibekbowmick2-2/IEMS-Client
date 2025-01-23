

import { Navigate} from "react-router-dom";
import { useContext } from "react";
import { ContextProvider } from "../AuthProviders/AuthProvider";

const PrivateRoute = ({children}) => {
    const { user} = useContext(ContextProvider);
       

    if (user) {
        return children;
    }



    // if (loading) {
    //     return <progress className="progress w-56"></progress>
    // }

    return (
        <div>
            <Navigate to="/"></Navigate>
        </div>
    );
};

export default PrivateRoute;