import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { UserRound } from 'lucide-react';
import Logout from "./Logout";

function ProfileLogo() {
    const [menuOpen, setMenuOpen] = useState(false);
    const modelRef = useRef();

    const { isLoggedIn, user, isLoading } = useAuth();

    useEffect(() => {
        function handler(e) {
            if (modelRef.current && !modelRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler);
    }, [])


    if (isLoading) return <div className="text-blue-600">Loading...</div>;

    if (!isLoggedIn) return null;


    return (
        <div className="relative">
            <button 
                className="flex items-center p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition" 
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-3xl font-semibold text-white capitalize">
                    {user.username[0]}
                </div>

                <div className="text-left pl-2 flex-col justify-center">
                    <h1 className="font-semibold text-md text-xl">
                        {user.username}
                    </h1>
                    <p className="opacity-60 font-medium">
                        {user.emailId}
                    </p>
                </div>
            </button>

            {menuOpen && (
                <div ref={modelRef} className="absolute left-1 top-16 bg-white shadow-lg rounded-md w-full py-2 z-200">
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
        </div>
    );
}


export default ProfileLogo;