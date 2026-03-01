import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard";


function ProtectedDashboard() {
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    if(!isLoggedIn){
        return <Navigate to="/login" replace />
    }

    return(
        <Dashboard/>
    )
}

export default ProtectedDashboard;