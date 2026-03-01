import React from "react";
import {ArrowLeft } from 'lucide-react';
import ProfileLogo from "./ProfileLogo";
import { useNavigate } from "react-router-dom";

function NavBar({name}) {
    const navigate = useNavigate();
    return (
        <nav className="flex items-center justify-between pt-4 pl-8 pr-1 w-full h-20 bg-white z-10 shadow-sm ">
            <div className="hover:text-[#34C759] active:text-[#247f3b] transition duration-200 ease-in hover:scale-125">
                <ArrowLeft
                    size={32}
                    onClick={() => navigate(-1)}
                />
            </div>
            <div className="font-medium text-md">
                {name}
            </div>
            <div className="flex items-center w-auto h-full justify-end pb-4">
                <ProfileLogo />
            </div>
        </nav>
    )
}

export default NavBar;