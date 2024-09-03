import React from "react";
import MenuLink from "../Admin/MenuLink";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const menuItems = [
  {
    title: "Admin Dashboard",
    list: [
      {
        title: "Manage Users",
        path: "/admin",
      },
      {
        title: "Manage Posts",
        path: "/admin/manageposts",
      },
      {
        title: "Manage Roadmap",
        path: "/admin/manageroadmap",
      },
      {
        title: "Approve Posts",
        path: "/admin/approvescholarship",
      },
      {
        title: "Approve Certificate",
        path: "/admin/approvecertificate",
      },
      {
        title: "Approve Roadmap",
        path: "/admin/approveroadmap",
      },
    ],
  },
];

const AdminSidebar = ({ avatarurl, username }) => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="sticky top-10 w-200">
      <div className="flex items-center gap-5 mb-5">
        <Image
          src={avatarurl}
          width={50}
          height={50}
          className="rounded-full object-cover"
          alt={""}
        />
        <div className="flex flex-col">
          <span className="font-bold">{username}</span>
          <span className="text-xs">Administrator</span>
        </div>
      </div>
      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="font-bold text-sm my-2.5">{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          if (session && session.user) {
            signOut();
            router.replace("/login");
          } else {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            router.replace("/login");
          }
        }}
        className="p-5 my-1.5 flex items-center cursor-pointer rounded-xl bg-none border-none w-full hover:bg-[#b3b3b3]"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
