import React, { useEffect } from 'react';
import { Fingerprint,LogIn } from 'lucide-react';
import { useNavigate} from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';


async function createUser(data){
    const user = data.user;
    const { uid, photoURL, displayName, email} = user;

    await setDoc(doc(db, "users", uid), {
        email,
        profile_pic: photoURL,
        name: displayName
    });
    

}

function Login(){
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const res = await signInWithPopup(auth, new GoogleAuthProvider());
            await createUser(res);
            navigate("/");  // Redirect to home page
        } catch (error) {
            console.error("Error during login:", error);  // Log any errors that happen
        }
    }
    return (
        <>
            <div>
                <div className="h-[220px] bg-[#04a784]">
                    <div className="flex ml-[200px] pt-[40px] items-center gap-3">
                        <img className='h-8' src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Logo" />
                        <div className="text-white font-bold">WHATSAPP</div>
                    </div>
                </div>
                <div className='h-[calc(100vh-220px)] bg-[#eff2f5] flex justify-center items-center relative'>
                    <div className="h-[90%] w-[50%] bg-white shadow-2xl flex flex-col gap-4 justify-center items-center absolute top-[-90px] p-2">
                        <Fingerprint className="h-[100px] w-[80px] text-[#04a784]" strokeWidth={1}/>
                        <div className='font-bold'>Sign In</div>
                        <div>Sign in with your google account to get started.</div>
                        <button className="text-white bg-[#04a784] flex items-center gap-2 p-3 rounded-[5px]" onClick={handleLogin}>
                            Sign in with Google
                            <LogIn/>    
                        </button>
                    </div>
                </div>
            </div> 
        </>
    )
}
export default Login