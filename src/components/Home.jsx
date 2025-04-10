import React from "react";
import { signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase';
import { storage } from "../../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";

import ChatPanel from "./ChatPanel";
import Chat from "./Chat";

function Home(){
    const handleChange = (e) => {
        const img = e.target.files[0];
        const storageRef = ref(storage, '/profile'+Math.random);
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on("state_changed", progressCB, errorCB, finishedCB);

        function progressCB(data){
            console.log("data", data);
        }
        function errorCB(err){
            console.log(err);
        }
        function finishedCB(){
            console.log("success", success)
        }
    }
    return(
    <main className="w-full h-screen bg-[#E3E1db]">
        <div className="bg-[#eff2f5] w-full h-full shadow-md flex">
            {/* Shows either chat list or profile */}
            <ChatPanel></ChatPanel>

            <Chat></Chat>
        </div>
        
        {/* <button onClick={handleLogout}>Logout</button> */}
    </main>);
}
export default Home;