import React,{ useEffect, useState } from "react";
import { get_profile } from "../api/profile.js";


const Profile = () => {
    const local_user = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            const data = await get_profile(local_user);
            console.log("Profile -> data", data);
            setUser(data);
        };
        fetchProfile();
    }, []);
    
    return (
        <div>
        <h1>Profile</h1>
        <p>Name: {user?.name}</p>
        </div>
    );
}

export default Profile;