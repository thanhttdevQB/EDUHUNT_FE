"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import axios from "axios";

const Avatars = () => {
  const [state, setState] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const { data: session } = useSession();
  var id = null;
  var email = null;

  const router = useRouter();

  if (typeof window !== "undefined") {
    id = localStorage.getItem("userId");
    email = localStorage.getItem("userEmail");
  }

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Profiles/${id}`
        );
        setAvatarUrl(response.data.urlAvatar);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchAvatarUrl();
    }
  }, [id]);

  let overflowStyle = {};

  if (state == false) {
    overflowStyle = {
      overflow: "hidden",
    };
  } else {
    overflowStyle = {
      overflow: "visible",
    };
  }

  // if ((session && session.user) || (email && id != "null")) {
  return (
    <div className="max-h-12 grid place-items-start" style={overflowStyle}>
      <div
        className="mb-1 pt-1 pb-1 ml-1"
        onClick={() => {
          setState(!state);
        }}
      >
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white avatarImage object-cover"
          src={avatarUrl}
          alt=""
        />
      </div>
      <div
        className="w-40 rounded text-xl boxshadow-parent-div"
        style={{ background: "white" }}
      >
        <div className="loginNavBar rounded m-3 pb-1 text-center boxshadow-child-div hov-bg-grey hov-text-white">
          <Link href={"/profile"} className="">
            Profile
          </Link>
        </div>
        <div className="loginNavBar rounded m-3 pb-1 text-center boxshadow-child-div hov-bg-grey hov-text-white">
          <button
            onClick={() => {
              if (session && session.user) {
                signOut({ callbackUrl: "/login" });
              } else {
                localStorage.removeItem("userEmail");
                localStorage.removeItem("userId");
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                router.replace("/login");
              }
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}; //else {
//     redirect("process.env.NEXTAUTH_URL/login")
// }
// };

export default Avatars;
