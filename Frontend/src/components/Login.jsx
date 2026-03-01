import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../service/api.js";;
import { useAuth } from "../contexts/AuthProvider";

function Login() {
    const { isLoggedIn, setIsLoggedIn, refreshAuth } = useAuth();

    const [emailId, setEmailId] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log('Logging in with:', { emailId, userName });

        let username = userName;

        try {
            let response = await api.post("/user/login", { username, password }, { withCredentials: true });

            let data = response.data;
            //console.log(data.message);

            // localStorage.setItem("userId", data.message);
            setIsLoggedIn(true);
            refreshAuth();
            //console.log(isLoggedIn)
            navigate("/dashboard");
        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(`Error : ${err.response.data.message}`);
                //console.log(err.response.data.message);
            }
            else {
                alert(`Error: ${err.message}`);
                //console.log(err.message);
            }
        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-[#34C759] mb-6">Login</h2>

                <form
                    onSubmit={handleSubmit} 
                    className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">User Name</label>
                        <input
                            type="text"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter User Name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#34C759]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#34C759]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#34C759] text-white py-2 rounded-md hover:bg-green-600 active:bg-green-800 transition"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-500 mb-4">or</p>
                    <button
                        // onClick={() => handleGoogleLogin()}
                        className="flex items-center justify-center w-full border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition-colors"
                    >
                        <div className="w-6 h-6 mr-3 text-2xl flex items-center font-bold text-red-900 opacity-85">G</div>
                        <span className="text-gray-700 font-medium">Continue with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;