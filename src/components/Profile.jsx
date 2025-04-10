import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckIcon, Edit2Icon } from "lucide-react";
import { useAuth } from './AuthContext';

function Profile(props){
    const navigate=useNavigate();
    const { userData, logout, updateName, updateStatus, isUploading, error, updatePhoto } = useAuth();
    const [name, setName] = useState(userData?.name||"");
    const [status, setStatus] = useState(userData?.status||"");
    const handleLogout = () => {
        logout();
        navigate("/login");
       
    }
    return (
        <div className=' w-[30vw]  min-w-[350px] h-[100vh]  bg-background'>
            {/* top bar */}
            <div className="bg-[#04a784] text-white py-4 text-lg px-4 flex items-center gap-6">
                <button onClick={props.onBack}>
                    <ArrowLeft />
                </button>
                <div> Profile</div>
            </div>
            
            <div className="w-full flex flex-col items-center justify-center py-8 gap-8 flex-grow overflow-auto">
                <label className={`group relative rounded-full overflow-hidden cursor-pointer ${isUploading ?"pointer-events-none":""}`}>
                    <img src={userData.profile_pic || "/default-user.png"} alt="profile picture" className="w-[160px] h-[160px]  object-cover"/>
                </label>

                {!error && <p className="text-red-600 text-sm">{error}</p>}
                
                {/* Update Name */}
                <div className="flex flex-col bg-white w-full py-4 px-8">
                    <label className="text-sm text-primary-dense mb-2">Your name</label>
                    <div className="flex items-center w-full">
                        <input value={name} onChange={(e) => {setName(e.target.value);}} className="w-full bg-transparent"/>
                        <button onClick={() => updateName(name)}>
                            <CheckIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Update status */}
                <div className="flex flex-col bg-white  w-full py-4 px-8">
                    <label className="text-sm text-primary-dense mb-2">Status</label>
                    <div className="flex items-center w-full">
                        <input
                            value={status} onChange={(e) => {setStatus(e.target.value);}} 
                            placeholder="Update your status..." className="w-full bg-transparent"/>

                        <button onClick={() => updateStatus(status)}>
                            <CheckIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <button className="mt-8 px-4 py-3 rounded bg-[#04a784] hover:bg-primary-dense text-white" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}
export default Profile;