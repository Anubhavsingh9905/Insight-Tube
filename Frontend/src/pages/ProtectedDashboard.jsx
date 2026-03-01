import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";


function ProtectedDashboard() {
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    if(!isLoggedIn){
        console.log("nakao");
        navigate("/register");
    }

    return(
        <Dashboard/>
    )
}

export default ProtectedDashboard;