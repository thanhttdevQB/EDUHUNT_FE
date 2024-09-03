"use client";
import React, { useState, useEffect } from "react";
import MainLayout from "../../components/core/layouts/MainLayout";
import CloudinaryPost from "../../components/cloud/CloudinaryPost";
import { useRoadMap } from "../../hooks/useRoadMap";
import { useProfile } from "../../hooks/useProfile";
import { useRouter } from "next/navigation";
import UploadImg from "../../../public/Vector.png";
import { Image, Input, AutoComplete } from "antd";
import { useLocation } from "../../hooks/useLocation";
import debounce from "lodash.debounce";
import Toasify from "../../components/core/common/Toasify";

const Profile = () => {
  const { postRoadMaps } = useRoadMap();
  const { getProfile } = useProfile();
  const [toasify, setToasify] = useState({ message: "", type: "" });
  const { getLocation, locationOptions } = useLocation();
  const [roadMapData, setRoadMapData] = useState({
    title: "",
    content: "",
    location: "",
    school: "",
    contentURL: "",
  });
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (role !== "Mentor") {
      router.push("/");
    } else {
      getProfile(userId).then((profile) => {
        if (!profile.isAllow) {
          router.push("/?message=You are not allowed to post a roadmap");
        }
      });
    }
  }, []);

  const handleLocationSearch = debounce(getLocation, 500);

  const handleLocationSelect = (value) => {
    setRoadMapData({ ...roadMapData, location: value });
  };

  const handleLocationChange = (value) => {
    setRoadMapData({ ...roadMapData, location: value });
  };

  const handleInputChange = (e) => {
    setRoadMapData({ ...roadMapData, [e.target.name]: e.target.value });
  };

  const handleUpload = (urls) => {
    urls.forEach((url) => {
      const newRoadMap = { ...roadMapData, contentURL: url };
      setRoadMapData(newRoadMap);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      console.log([{ userId, ...roadMapData }]);
      await postRoadMaps([{ userId, ...roadMapData }]);
      setToasify({
        message: "Please wait for admin to approve the roadmap",
        type: "info",
      });
      setRoadMapData({
        title: "",
        content: "",
        location: "",
        school: "",
        contentURL: "",
      });
    } catch (error) {
      setToasify({
        message: "Failed to post roadmap",
        type: "error",
      });
    }
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-[58px] font-bold">Create Roadmap</h1>
      </div>
      <div className="flex flex-row gap-[35px]">
        <div className="w-[450px] h-[450px] border-[2px] border-dashed shadow-sm rounded-[25px] flex flex-col gap-[10px] items-center justify-center">
          <Image
            src={UploadImg.src}
            className="w-[60px] h-[60px]"
            alt="Upload"
          ></Image>
          <CloudinaryPost onUpload={handleUpload} />
        </div>
        <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
          <div className="w-[calc(100vw-600px)]">
            <h4 className="font-bold text-[20px]">Title</h4>
            <Input
              name="title"
              rows="2"
              value={roadMapData.title}
              onChange={handleInputChange}
              className="flex w-full p-3 border border-[#B5B5B5] shadow-md rounded-[10px] text-[18px]"
            ></Input>
          </div>
          <div className="w-[calc(100vw-600px)]">
            <h4 className="font-bold text-[20px]">Content</h4>
            <Input
              name="content"
              rows="4"
              value={roadMapData.content}
              onChange={handleInputChange}
              className="w-full p-3  border border-[#B5B5B5] shadow-md  rounded-[10px] text-[18px]"
            ></Input>
          </div>
          <div className="w-[calc(100vw-600px)]">
            <h4 className="font-bold text-[20px]">Location</h4>
            <AutoComplete
              options={locationOptions}
              onSearch={handleLocationSearch}
              onSelect={handleLocationSelect}
              onChange={handleLocationChange}
              value={roadMapData.location}
              className="w-full h-[54px] border border-[#B5B5B5] shadow-md rounded-[10px] text-[18px]"
            />
          </div>
          <div className="w-[calc(100vw-600px)]">
            <h4 className="font-bold text-[20px]">School</h4>
            <Input
              name="school"
              rows="1"
              value={roadMapData.school}
              onChange={handleInputChange}
              className="w-full p-3  border border-[#B5B5B5] shadow-md rounded-[10px] text-[18px]"
            ></Input>
          </div>
          <div className="flex flex-row justify-end ">
            <button
              type="submit"
              className="py-[10px] px-[20px] flex items-center justify-center bg-[#3EAEFF] rounded-[10px] text-[24px] font-semibold text-[#fff]"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Profile;
