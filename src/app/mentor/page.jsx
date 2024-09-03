"use client";
import MainLayout from "../../components/core/layouts/MainLayout";
import MentorLayout from "../../components/core/layouts/MentorLayout";
import React, { useState, useEffect } from "react";
import useMentor from "../../hooks/useMentor";
import MentorModal from "../../components/Mentor/Modal";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/react";
import { Button } from "antd";
import CreateQuestion from "../../components/QA/CreateQuestion";

const Mentor = () => {
  const [theID, setTheID] = useState();
  const [askerID, setAskerID] = useState();
  const [answerID, setAnswerID] = useState();
  const [question, setQuestion] = useState();
  const [subject, setSubject] = useState();
  const [askerFile, setAskerFile] = useState();
  const [QADisplay, setQADisplay] = useState(true);
  const { getMentorIDList, getUserList } = useMentor();
  const [mentorList, setMentorList] = useState([]);
  const [userList, setUserList] = useState();
  const [showFullText, setShowFullText] = useState([]);
  const router = useRouter();
  const toggleText = (i) => {
    setShowFullText([...showFullText, i]);
  };
  let id;
  if (typeof window !== "undefined") {
    id = localStorage.getItem("userId");
  }
  const role = localStorage.getItem("role");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "Mentor") {
      router.push("/mentor/connected");
    }
    const fetchUserList = async () => {
      try {
        const userListData = await getMentorIDList();
        const listID = userListData.map((ele) => ele.id);
        setMentorList(listID);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userListData = await getUserList();
        console.log(userListData);
        setUserList(userListData);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  let mentorProfileList = userList?.map((element) => {
    if (mentorList?.includes(element.userId)) {
      return element;
    }
  });

  mentorProfileList = mentorProfileList?.filter(
    (element) => element !== undefined
  );
  const maxLength = 100;
  let hideQA = "my-10 flex flex-col"
  let hideCQ
  if(QADisplay) {
    hideCQ = "hidden";
  } else {
    hideQA += " hidden";
    hideCQ = "";
  }

  return (
    <MainLayout>
      <MentorLayout props={QADisplay}>
        <div className={hideCQ}>
          <CreateQuestion theID={theID} askerID={id} answerID={answerID} question={question} subject={subject} askerFile={askerFile}/>
        </div>
        <div className={hideQA}>
          {mentorProfileList?.map((mentor, index) => {
            const text = mentor.description;
            return (
              <div
                className="mb-7 flex w-[100%] justify-center object-fit"
                key={index}
              >
                {(mentor.firstName != null && mentor.lastName != null) ?
                <div className="rounded border flex">
                  <div className="w-[10vw] m-5">
                    <img
                      src={mentor.urlAvatar}
                      alt=""
                      className="h-[10vw] w-[10vw] object-cover"
                    />
                  </div>
                  <div className="mt-5 mb-5 w-[50vw]">
                    <div className="flex relative">
                        {
                          (mentor.firstName != null || mentor.lastName != null) ?
                          <div className="flex">
                            <div className="text-4xl font-bold mr-2">
                              {
                                (mentor.firstName == null) ? `` : `${mentor.firstName}`
                              }
                            </div>
                            <div className="text-4xl font-bold">
                              {
                                (mentor.lastName == null) ? `` : `${mentor.lastName}`
                              }
                            </div>
                          </div> :
                          <div className="text-4xl font-bold">
                            {(mentor.firstName == null && mentor.lastName == null) ? `Not set name yet` : ``}
                          </div>
                        }
                      
                      <div className="absolute right-0">
                        {/* <MentorModal
                          askerID={id}
                          answerID={mentor.userId}
                        ></MentorModal> */}
                        <button
                           onClick={() => {setQADisplay(false); 
                            setSubject(mentor.subject); setAskerID(mentor.answerId);
                            setTheID(mentor.id); setAnswerID(mentor.userId);
                            setQuestion(mentor.question); setAskerFile(mentor.askerFile); console.log(mentor);}}
                          className="py-2 bg-blue-600 hover:bg-blue-700 text-white rounded pr-5 scale-150"
                        >
                          {
                          role == "Mentor" ? (
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
                      </div>
                    </div>
                    <div
                      className="italic text-xl my-3"
                      style={{ color: "grey" }}
                    >
                      {mentor.address}
                    </div>
                    <div style={{ color: "#363636" }}>
                      {showFullText?.includes(index) ? (
                        <div>{text}</div>
                      ) : (
                        <div>
                          {text?.length > maxLength
                            ? `${text?.slice(0, maxLength)}...`
                            : text}
                          <span>
                            <button
                              onClick={() => {
                                toggleText(index);
                              }}
                              className="font-bold"
                            >
                              {text?.length > maxLength ? "See More" : null}
                            </button>
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        router.push(`/mentor/roadmap/${mentor.userId}`)
                      }
                      className="font-bold"
                    >
                      View Road Map
                    </button>
                  </div>
                </div>
                : <div></div>}
              </div>
            );
          })}
        </div>
      </MentorLayout>
    </MainLayout>
  );
};

export default Mentor;