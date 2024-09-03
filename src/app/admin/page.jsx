"use client";
import React, { useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import AdminLayout from "../../components/core/layouts/AdminLayout";
import AdminSearch from "../../components/Admin/AdminSearch";
import Image from "next/image";
import AdminPagination from "../../components/Admin/AdminPagination";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function AdminTestPage() {
  const { confirm } = Modal;
  const { getUserList, deleteUser } = useAdmin();
  const [userList, setUserList] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") {
      router.push("/");
    }
    const fetchUserList = async () => {
      try {
        const userListData = await getUserList();
        setUserList(userListData);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  function showDeleteConfirm(userId) {
    confirm({
      title: "Are you sure you want to delete this user?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteUser(userId);
      },
    });
  }

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      // Refresh user list after deletion
      const updatedUserList = await getUserList();
      setUserList(updatedUserList);
      message.success("User deleted successfully");
    } catch (error) {
      message.error("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  const handleUserSearch = (searchTerm) => {
    setUserSearch(searchTerm);
  };

  const filteredData = userList.filter((user) => {
    if (!userSearch) return true;
    return user.name.toLowerCase().includes(userSearch.toLowerCase());
  });

  return (
    <AdminLayout>
      <div className="">
        <h1 className="font-extrabold text-[#5F9FFF] text-[50px] mt-5 pl-5">
          User List
        </h1>
        <div className="p-5 rounded-lg mt-5">
          <div className="flex items-center justify-space-between pb-3">
            <AdminSearch
              placeholder={"Search for a user..."}
              userSearchList={handleUserSearch}
            />
            {/* Explain */}
          </div>
          <table className="w-full bg-[#f3f3f3] rounded-lg">
            <thead>
              <tr>
                <td className="p-2.5 ">Name</td>
                <td className="p-2.5 ">Email</td>
                <td className="p-2.5 ">Role</td>
                <td className="p-2.5 ">Action</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user) => (
                <tr key={user.id} className="odd:bg-[#fff] even:bg-[#f3f3f3]">
                  <td className="p-2.5 ">
                    <div className="flex gap-2.5 items-center">
                      <Image
                        src={"/images/avatar.png"}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                      {user.name}
                    </div>
                  </td>
                  <td className="p-2.5 ">{user.email}</td>
                  <td className="p-2.5 ">{user.role}</td>
                  <td className="p-2.5 ">
                    <button
                      className="py-1.5 px-2.5 rounded-lg bg-[#d12b55] text-[#fff] cursor-pointer"
                      onClick={() => showDeleteConfirm(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AdminPagination />
        </div>
      </div>
    </AdminLayout>
  );
}
