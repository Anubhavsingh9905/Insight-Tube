import React, { useState } from "react";
import {ArrowLeft, CircleUserRound, UserRound} from 'lucide-react';
import Logout from "./Logout";
import ProfileLogo from "./ProfileLogo";
import { useNavigate } from "react-router-dom";

function NavBar({name}) {
    const [profile, setProfile] = useState(false);
    const navigate = useNavigate();

    if(name != null && name.length > 15){
        name = name.slice(0, 25);

        name += ' ...';
    }
    return (
        <nav className="flex items-center justify-between pt-4 pl-8 pr-1 w-full h-20 bg-white z-500 shadow-sm ">
            <div className="hover:text-[#34C759] active:text-[#247f3b] transition duration-200 ease-in hover:scale-125">
                <ArrowLeft
                    size={32}
                    onClick={() => navigate(-1)}
                />
            </div>
            <div className="font-medium text-md">
                {name}
            </div>
            <div className="flex items-center w-auto h-full justify-end pb-4 max-md:hidden">
                <ProfileLogo />
            </div>
            <div className="md:hidden pr-3" onClick={() => setProfile(!profile)}>
                <CircleUserRound size={32} color="#757575"/>
            </div>

            {profile && (
                <div className="absolute left-1 top-16 bg-white shadow-lg rounded-md w-full py-2 z-200">
                    <ProfileLogo/>
                    <ul className="py-1">
                        <li className="flex items-center gap-3 pl-6 pr-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            <UserRound /> Profile
                        </li>
                        <li className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
                            <Logout/>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default NavBar;