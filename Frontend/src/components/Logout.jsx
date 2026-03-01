import { LogOut } from "lucide-react";
import api from "../service/api.js";;
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthProvider";

function Logout() {
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            let response = await api.get("/user/logout", { withCredentials: true });

            let data = response.data;
            //console.log(data.message);

            // localStorage.setItem("userId", data.message);
            setIsLoggedIn(false);
            //console.log(isLoggedIn)
            navigate("/");
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
    }
    return(
        <>
        {isLoggedIn ?
            <a 
            className="hover:text-red-600 transition flex gap-3 p-2 rounded-xl cursor-pointer font-bold"
            onClick={handleLogout}
            >
                <LogOut/> 
                Logout
            </a>
            : <a className="bg-transparent text-transparent flex gap-3 border-2 p-2 rounded-xl cursor-pointer font-bold"> </a>
        }
        </>
    )
}

export default Logout;