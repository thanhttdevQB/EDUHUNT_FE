"use client";
import React, { useState, useEffect } from "react";
import MainLayout from "../../components/core/layouts/MainLayout";
import { useScholarship } from "../../hooks/useScholarship";
import { useProfile } from "../../hooks/useProfile";
import { useRouter } from "next/navigation";
import CloudinaryPost from "../../components/cloud/CloudinaryPost";
import UploadImg from "../../../public/Vector.png";
import { Image, Input, AutoComplete } from "antd";
import debounce from "lodash.debounce";
import { useLocation } from "../../hooks/useLocation";
import Toasify from "../../components/core/common/Toasify";

const Profile = () => {
  const { postScholarship } = useScholarship();
  const { getProfile } = useProfile();
  const { getLocation, locationOptions } = useLocation();
  const [toasify, setToasify] = useState({ message: "", type: "" });
  const [scholarshipData, setScholarshipData] = useState({
    budget: "",
    title: "",
    location: "",
    schoolName: "",
    url: "",
    description: "",
    authorId: localStorage.getItem("userId"),
    imageUrl: "",
    level: "",
  });

  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    if (role !== "Scholarship Provider") {
      router.push("/");
    } else {
      getProfile(userId).then((profile) => {
        if (!profile.isAllow) {
          router.push("/?message=You are not allowed to post a scholarship");
        }
      });
    }
  }, []);

  const handleChange = (e) => {
    setScholarshipData({ ...scholarshipData, [e.target.name]: e.target.value });
  };

  const handleLocationSearch = debounce(getLocation, 500);

  const handleLocationSelect = (value) => {
    setScholarshipData({ ...scholarshipData, location: value });
  };

  const handleLocationChange = (value) => {
    setScholarshipData({ ...scholarshipData, location: value });
  };

  const handleUpload = (url) => {
    setScholarshipData({ ...scholarshipData, imageUrl: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(scholarshipData);
      await postScholarship(scholarshipData);
      setToasify({
        message: "Please wait for admin to approve the scholarship",
        type: "info",
      });
      setScholarshipData({
        budget: "",
        title: "",
        location: "",
        schoolName: "",
        url: "",
        description: "",
        authorId: localStorage.getItem("userId"),
        imageUrl: "",
        level: "",
      });
    } catch (error) {
      setToasify({
        message: "Failed to post scholarship",
        type: "error",
      });
    }
  };

  const { TextArea } = Input;

  return (
    <MainLayout>
      {toasify.message && (
        <Toasify message={toasify.message} type={toasify.type} />
      )}
      <div>
        <h1 className="text-[60px] font-bold ml-[62px]">Create Post</h1>
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
            <h4 className="font-bold text-[20px]">Budget</h4>
            <Input
              name="budget"
              rows="1"
              value={scholarshipData.budget}
              onChange={handleChange}
              className="w-full p-3  border border-[#B5B5B5] shadow-md rounded-[10px] text-[18px]"
            ></Input>
          </div>
          <div className="w-[calc(100vw-600px)]">
            <h4 className="font-bold text-[20px]">Title</h4>
            <Input
              name="title"
              rows="2"
              value={scholarshipData.title}
              onChange={handleChange}
              className="w-full p-3  border border-[#B5B5B5] shadow-md rounded-[10px] text-[18px]"
            ></Input>
          </div>
          <div className="w-[calc(100vw-600px)]">
            <h4 className="font-bold text-[20px]">Location</h4>
            <AutoComplete
              options={locationOptions}
              onSearch={handleLocationSearch}
              onSelect={handleLocationSelect}
              onChange={handleLocationChange}
              value={scholarshipData.location}
              className="w-full h-[54px] border border-[#B5B5B5] shadow-md rounded-[10px] text-[18px]"
            />
          </div>
          <div className="w-[calc(100vw-600px)]">
            <h4 className="font-bold text-[20px]">School Name</h4>
            <Input
              name="schoolName"
              rows="1"
              value={scholarshipData.schoolName}
              onChange={handleChange}
              className="w-full p-3  border border-[#B5B5B5] shadow-md rounded-[10px] text-[18px]"
            ></Input>
          </div>
          <div className="w-[calc(100vw-600px)]">
            <h4 className="font-bold text-[20px]">Level</h4>
            <Input
              name="level"
              rows="1"
              value={scholarshipData.level}
              onChange={handleChange}
              className="w-full p-3  border border-[#B5B5B5] shadow-md rounded-[10px] text-[18px]"
            ></Input>
          </div>
          <div className="w-[calc(100vw-600px)]">
            <h4 className="font-bold text-[20px]">URL</h4>
            <Input
              name="url"
              rows="1"
              value={scholarshipData.url}
              onChange={handleChange}
              className="w-full p-3  border border-[#B5B5B5] shadow-md rounded-[10px] text-[18px]"
            ></Input>
          </div>
          <div className="w-[calc(100vw-600px)]">
            <h4 className="font-bold text-[20px]">Description</h4>
            <TextArea
              name="description"
              rows="4"
              value={scholarshipData.description}
              onChange={handleChange}
              className="w-ful border border-[#B5B5B5] shadow-md  rounded-[10px] text-[18px]"
            ></TextArea>
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
