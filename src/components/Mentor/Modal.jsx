import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Input, Upload } from "antd";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import Toasify from "../../components/core/common/Toasify";

export default function MentorModal(prop) {
  const [toasify, setToasify] = useState({ message: "", type: "" });
  const [isVisible, setIsVisible] = useState(false);
  const [question, setQuestion] = useState();
  const [attachedFile, setAttachedFile] = useState(null);
  const router = useRouter();
  let role;
  if (typeof window !== "undefined") {
    role = localStorage.getItem("role");
  }

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", attachedFile);
    formData.append("upload_preset", "tstdfsn5");

    let res;
    try {
      res = await axios.post(
        `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/upload`,
        formData
      );
    } catch (error) {
      console.error("Failed to upload the file.", error);
      setToasify({
        message: "Failed to upload the file.",
        type: "error",
      });
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/QAs/Create`;
    let urlAnswer = `${process.env.NEXT_PUBLIC_API_URL}/api/QAs/Edit`;

    let payload = {
      askerId: prop.askerID,
      answerId: prop.answerID,
      question: question,
      answer: "",
      answerFile: "",
      askerFile: res.data.secure_url,
    };

    let payload2 = {
      id: prop.theID,
      askerId: prop.askerID,
      answerId: prop.answerID,
      question: prop.question,
      answer: question,
      answerFile: res.data.secure_url,
      askerFile: prop.askerFile,
    };

    console.log(payload2);

    let options;
    if (role == "Mentor") {
      urlAnswer += "/" + prop.theID;
      options = {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(payload2),
      };

      try {
        await fetch(urlAnswer, options);
        mutate(urlAnswer);
      } catch (error) {
        console.error("Error during fetch:", error);
        setToasify({
          message: "Answer updated successfully.",
          type: "success",
        });
      }
    } else {
      options = {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload),
      };

      try {
        await fetch(url, options);
        mutate(url);
      } catch (error) {
        console.error("Error during fetch:", error);
        setToasify({
          message: "Question submitted successfully.",
          type: "success",
        });
      }
    }
    setIsVisible(false);
  };

  return (
    <div>
      {toasify.message && (
        <Toasify message={toasify.message} type={toasify.type} />
      )}
      <button
        onClick={() => setIsVisible(true)}
        className="py-2 bg-blue-600 hover:bg-blue-700 text-white rounded pr-5 scale-150"
      >
        {role == "Mentor" ? (
          <div className="font-bold pr-3 pl-5">Answer</div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
        )}
      </button>

      <Modal
        title={role === "Mentor" ? "ANSWER QUESTION" : "INSERT QUESTION"}
        visible={isVisible}
        onOk={submit}
        onCancel={() => setIsVisible(false)}
        okType="danger"
        okText="Submit"
        cancelText="Cancel"
      >
        <Input
          autoFocus
          placeholder={`Enter your ${
            role === "Mentor" ? "answer" : "question"
          } to this ${role === "Mentor" ? "student" : "mentor"}`}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <Upload
          beforeUpload={(file) => {
            setAttachedFile(file);
            return false;
          }}
        >
          <Button className="mt-4">Click to Upload File</Button>
        </Upload>
      </Modal>
    </div>
  );
}
