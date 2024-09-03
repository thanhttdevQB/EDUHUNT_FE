import Link from 'next/link';
import { Menu } from 'antd';
import AdminSidebar from "../../Admin/AdminSidebar"
import React, { useEffect, useState } from 'react';

import { useProfile } from "../../../hooks/useProfile";

const AdminLayout = ({ children }) => {

    const [profile, setProfile] = useState({} )
    const userId = localStorage.getItem("userId");
    const { getProfile } = useProfile();
    useEffect(() => {
        getProfile(userId)
          .then((data) => {
            console.log(data);
            setProfile({
              id: data.id,
              urlAvatar: data.urlAvatar || "",
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              userName: data.userName || "",
              contactNumber: data.contactNumber || "",
              address: data.address || "",
              description: data.description || "",
            });
          })
          .catch((error) => console.error("Error fetching profile:", error));
      }, []);

      let avatarurl = profile.urlAvatar;
      let username = profile.userName;
      console.log("check here",avatarurl,username)
    return (
        
        <div className='flex bg-[#f3f3f3] h-screen'> 
            <div className='w-[15rem] bg-[#fff] p-5'>
                <AdminSidebar avatarurl={avatarurl} username={username} />
            </div>

            <div className='flex-grow p-5 bg-[#fff] ml-4 rounded-lg'>
                
                {children}
            </div>
        </div>
            
            
        
    )
};

export default AdminLayout;