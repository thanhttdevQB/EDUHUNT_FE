"use client";
import React, { useEffect, useState } from "react";
import useChat from "../../../hooks/useChat";
import { useParams } from "next/navigation";
import Sider from "../../../components/modules/messages/Sider";
import { Image as ImageAntd } from "antd";
import { VideoCameraFilled } from "@ant-design/icons";
import Link from "next/link";
import MainLayout from "../../../components/core/layouts/MainLayout";
import { useProfile } from "../../../hooks/useProfile";
import useAdmin from "../../../hooks/useAdmin";
import { useMessage } from "../../../hooks/useMessage";
import axios from "axios";
import { useRouter } from 'next/navigation';

const MessagePage = () => {
  const { messages, sendMessage, connection } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const { id } = useParams();
  const { getProfile, getallprofile } = useProfile();
  const { getUserList } = useAdmin();
  const [userList, setUserList] = useState([]);
  const [userListhasAvatar, setUserListhasAvatar] = useState([]);
  const { getHistoryMessages } = useMessage();
  const [messageHistory, setMessageHistory] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [senderAvatarUrl, setSenderAvatarUrl] = useState(null);
  const [receiverAvatarUrl, setReceiverAvatarUrl] = useState(null);
  const router = useRouter();
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  useEffect(() => {
    getProfile(userId).then((profile) => {
      if (!profile.isVip&&role==='User') {
        router.push("/?message=You should be a VIP to access this page");
      }
    });
  }
);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const senderId = localStorage.getItem('userId');
        const receiverId = id;

        const [senderResponse, receiverResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Profiles/${senderId}`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Profiles/${receiverId}`)
        ]);

        setSenderAvatarUrl(senderResponse.data.urlAvatar);
        setReceiverAvatarUrl(receiverResponse.data.urlAvatar);
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    };

    fetchAvatars();
  }, [id]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getallprofile();
        setProfiles(profileData);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchMessageHistory = async () => {
      try {
        const listmess = await getHistoryMessages(
          localStorage.getItem("userId"),
          id
        );
        setMessageHistory(listmess);
        console.log("messageHistory:", listmess);
      } catch (error) {
        console.error("Error fetching message history:", error);
      }
    };

    fetchMessageHistory();
  }, [id]);

  useEffect(() => {
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

  useEffect(() => {
    const fetchProfiles = async () => {
      const currentUserID = localStorage.getItem("userId");
      try {
        const updatedUserList = await Promise.all(
          userList.map(async (user) => {
            console.log("userinlist", user);
            if (user.id !== currentUserID && user.role[0] !== "Admin") {
              try {
                const profile = profiles.find(
                  (profile) => profile.userId === user.id
                );
                console.log("profile", profile);
                return {
                  id: user.id,
                  name: user.name,
                  avatar: profile?.urlAvatar,
                  lastMessage: "  ",
                };
              } catch (error) {
                console.error("Error fetching profile:", error);
              }
            }
          })
        );
        console.log("updatedUserList", updatedUserList);
        setUserListhasAvatar(updatedUserList.filter(user => user !== undefined));
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    if (userList.length > 0) {
      fetchProfiles();
    }
  }, [userList.length]);

  const information = userListhasAvatar.find((user) => user?.id === id);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      sendMessage({
        sender: localStorage.getItem("userId"),
        content: newMessage,
        receiver: information?.id,
      });
      setNewMessage("");
    }
  };

  if (!connection) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="bg-white flex-1 border-[1px]">
        <div className="flex flex-row justify-between border-b-[1px] h-[65px] items-center px-4">
          <div className="flex flex-row items-center">
            {information?.avatar && (
              <ImageAntd
                className="object-cover w-[40px] h-[40px] rounded-full cursor"
                src={information.avatar}
                alt=""
                width={40}
                height={40}
              />
            )}
            <div className="flex flex-col text-lg font-medium ml-2">
              <p>{information?.name}</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Link href={`/message/${id}/meet`} passHref>
              <VideoCameraFilled />
            </Link>
          </div>
        </div>
        <div className="flex flex-1 h-[524px] overflow-auto">
          <Sider users={userListhasAvatar}></Sider>
          <div className="flex flex-col justify-end p-4">
            <div className="pb-4">
              <div className="pb-4">
                {messageHistory.concat(messages).map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === localStorage.getItem("userId")
                      ? "justify-end"
                      : "justify-start"
                      } mb-4`}
                  >
                    <div className={`flex items-end ${message.sender === localStorage.getItem("userId")
                      ? "flex-row-reverse"
                      : "flex-row"
                      }`}>
                      <ImageAntd
                        className={`object-cover w-[30px] h-[30px] rounded-full ${
                          message.sender === localStorage.getItem("userId") ? "ml-2" : "mr-2"
                        }`}
                        src={
                          message.sender === localStorage.getItem("userId")
                            ? senderAvatarUrl
                            : receiverAvatarUrl
                          || 'https://dentistry.co.uk/app/uploads/2020/11/anonymous-avatar-icon-25.png'
                        }
                        alt=""
                        width={30}
                        height={30}
                      />
                      <div className={`p-2 rounded-lg ${message.sender === localStorage.getItem("userId")
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                        }`}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-[74vw]">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow mr-3 p-2 rounded border shadow-sm"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MessagePage;