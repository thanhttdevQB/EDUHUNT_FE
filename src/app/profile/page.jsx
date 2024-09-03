
"use client";
import React, { useState, useEffect } from 'react';
import MainLayout from "../../components/core/layouts/MainLayout";
import EditProfile from "../../components/Profile/EditProfile";
import ProfileLayout from "../../components/core/layouts/ProfileLayout";

const Profile = () => {
    const [role, setRole] = useState(null); // Initialize state to null or an appropriate default value

    useEffect(() => {
        // Access localStorage only on the client-side
        const storedRole = localStorage.getItem("role");
        setRole(storedRole); // Update state with the stored role
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <MainLayout>
            <ProfileLayout role={role}>
                <EditProfile />
            </ProfileLayout>
        </MainLayout>
    );
};

export default Profile;
