import img from '../assets/img.png'
import Logout from '../components/Logout';
import { useAuth } from '../contexts/AuthProvider';

function Home(){
    const {isLoggedIn, user} = useAuth();
    return(
        <div className='text-center p-4'>
            <div className="ml-auto pl-10 w-3/5 text-left flex items-center justify-between max-md:ml-15 max-md:gap-10">
                {isLoggedIn ?
                    <a className="p-2 inline-flex items-center justify-center bg-[#34C759] text-white min-w-[140px] h-10 px-4 text-lg font-bold rounded-lg hover:bg-green-600 active:bg-green-800 transition " 
                    href="/dashboard">
                        Dashboard
                    </a>
                    :
                    null
                }
                {isLoggedIn ?
                <div className="border-2 rounded-lg hover:text-red-600 transition">
                    <Logout/>
                </div>
                : null
                }
            </div>
            <h1 className="text-[2.7rem] mt-10 font-[650] text-gray-800">Organise Your Youtube Learning</h1>

            {/* <p>Logged In: {isLoggedIn ? "YES" : "NO"}</p> */}

            <p className="mt-5 text-[1.45rem] text-gray-700 font-medium">Bokmark, Categorize, and Master Any Topic</p>

            <div className="m-20 text-cneter flex gap-20 max-md:flex-col max-md:gap-10">
                <div className='mix-blend-overlay'>
                    <img src={img} alt="no-img" className="min-w-50 min-h-50 w-60 h-60 mix-blend-overlay"/>
                </div>

                <div className="flex p-4 bg-gray-100 rounded-lg shadow-xl w-170 h-60 items-center justify-center max-md:w-auto max-md:h-auto max-md:flex-col max-md:p-5" >
                    { !isLoggedIn ?
                        <div className="pr-10">
                            <div className="mb-4">
                                <a className="p-2 inline-flex items-center justify-center bg-[#34C759] text-white min-w-[140px] h-10 px-4 text-lg font-bold rounded-lg hover:bg-green-600 active:bg-green-800 transition " 
                                href="/register">
                                    Register
                                </a>
                            </div>
                        </div>
                        : 
                        null
                    }

                    <div className="text-gray-700 text-left ">
                        
                        Track your progress, Save playlists, organize learning paths, and discover educational content
                        in one place. Your personal YouTube learning library — simplified.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;