

import { Navigate,useLocation} from "react-router-dom";
import { useContext } from "react";
import { ContextProvider } from "../AuthProviders/AuthProvider";
import useTutor from "../../hooks/useTutor";

const PrivateTutorRoute = ({children}) => {
    const { user} = useContext(ContextProvider);
    const [isTutor] = useTutor();
   
   
    

    if (user && isTutor) {
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

export default PrivateTutorRoute;