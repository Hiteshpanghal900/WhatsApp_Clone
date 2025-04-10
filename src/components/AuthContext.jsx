import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getDoc,doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db, auth } from '../../firebase'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

function AuthWrapper({ children }){
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const docRef = doc(db, "users", currentUser?.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const { profile_pic, email, name, status } = docSnap.data();
                    setUserData({
                        id: currentUser?.uid,
                        profile_pic: profile_pic,
                        email,
                        name,
                        status: status ? status : ""

                    });
                    updateLastSeen(currentUser);
                }
            }
            setLoading(false);
        })
        return () => {
            unsubscribe();
        };
    }, [])
    const updateLastSeen = async (user) => {
        const date = new Date();
        const timeStamp = date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        await updateDoc(doc(db, "users", user.uid), {
            lastSeen: timeStamp,
        });
    };

    const updateName = async (name) => {
        await updateDoc(doc(db, "users", userData.id), {
            name: name,
        });
        setUserData({
            ...userData,
            name: name,
        });
    };

    const updateStatus = async (status) => {
        await updateDoc(doc(db, "users", userData.id), {
            status: status,
        });
        setUserData({
            ...userData,
            status: status,
        });
    };

    const logout = () => {
        signOut(auth);
    };

    return <AuthContext.Provider value={{
        setUserData, userData, loading, logout,
        updateName,
        updateStatus,
    }}>
        {children}
    </AuthContext.Provider>
}
export default AuthWrapper;