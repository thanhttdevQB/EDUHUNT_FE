"use client";
import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined, MessageOutlined } from "@ant-design/icons";
import MainLayout from "../../../components/core/layouts/MainLayout";
import MentorLayout from "../../../components/core/layouts/MentorLayout";
import useMentor from "../../../hooks/useMentor";
import Modal from "../../../components/Mentor/Modal";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import CreateQuestion from "../../../components/QA/CreateQuestion"
import Link from "next/link";

const Mentor = () => {
  const [theID, setTheID] = useState();
  const [askerID, setAskerID] = useState();
  const [answerID, setAnswerID] = useState();
  const [question, setQuestion] = useState();
  const [subject, setSubject] = useState();
  const [askerFile, setAskerFile] = useState();
  const [QADisplay, setQADisplay] = useState(true);
  const router = useRouter();
  const [qa, setQa] = useState();
  const [repliedQaDisplay, setRepliedQaDisplay] = useState(true);
  const [NotRepliedQaDisplay, setNotRepliedQaDisplay] = useState(true);

  const [mentor, setMentor] = useState();
  const { getQAList, getProfiles } = useMentor();
  const mentorId = localStorage.getItem("userId");

  let role;
  role = localStorage.getItem("role");

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userListData = await getProfiles();
        setMentor(userListData);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  let mentorName = mentor?.map((mentor) => {
    let fName = mentor.firstName;
    let sName = mentor.lastName;
    let id = mentor.id;
    let userID = mentor.userId;
    if (fName != null && sName != null && fName != "" && sName != "") {
      return {
        fName,
        sName,
        id,
        userID,
      };
    }
  });

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userListData = await getQAList();
        setQa(userListData);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUserList();
  }, []);

  mentorName = mentorName?.filter((mentor) => mentor != undefined);

  const mentorNames = qa?.map((mentor) => {
    const name = mentorName.filter(
      (mentorNamed) => mentorNamed?.userID == mentor.answerId
    );
    let named = name[0];
    return named?.fName + " " + named?.sName;
  });

  const userNames = qa?.map((mentor) => {
    const name = mentorName?.filter(
      (mentorNamed) => mentorNamed?.userID == mentor.askerId
    );
    let named = name[0];
    return named?.fName + " " + named?.sName;
  });

  const qaReplied = qa?.filter((item) => {return ((item.answer != "" && item.answer != null))})
  const qaNotReplied = qa?.filter((item) => {return ((item.answer == "" || item.answer == null))})
  const classNameReplied = "place-items-center";
  let hideQA
  let hideCQ
  if(QADisplay) {
    hideQA = "";
    hideCQ = "hidden";
  } else {
    hideQA = "hidden";
    hideCQ = "";
  }
  return (
    <MainLayout>
      <MentorLayout props={QADisplay}>
        <div className={hideCQ}>
          <CreateQuestion theID={theID} askerID={askerID} answerID={answerID} question={question} subject={subject} askerFile={askerFile}/>
        </div>
        <div className={hideQA}>
          {role === "Mentor" && (
            <Button
              onClick={() => router.push(`/mentor/roadmap/${mentorId}`)}
              className="font-bold mt-4 ml-[calc(50%-80px)] rounded-lg"
            >
              View My Road Map
            </Button>
          )}

          <div className="flex justify-center mt-5">
            <div className="w-[53vw] flex">
              <h1 className="uppercase font-bold">Has replied</h1>
              <button onClick={() => {setRepliedQaDisplay(!repliedQaDisplay)}}>
                {
                  (repliedQaDisplay) ? 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg> :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                }
              </button>
            </div>
          </div>
          
          {qaReplied?.map((item, key) => {

            const date = item.createdAt;
            let isAnswered = "Answering";
            let answer = false;
            if (item.answer != "" && item.answer != null) {
              isAnswered = "Answered";
              answer = true;
            }
            let theClassName = classNameReplied
            if(repliedQaDisplay) {
              theClassName += " grid"
            } else {
              theClassName += " hidden"
            }

            console.log(theClassName);
            return (
              <div className={theClassName} key={key}>
                <div className="my-5 flex border rounded-lg">
                  <div className="font-bold pr-[1vw] pl-[1vw] border-r flex justify-center items-center">
                    <p className="mt-auto mb-auto">{key + 1}</p>
                  </div>
                  <div className="">
                    <div className="flex h-[6vh]">
                      <div className="w-[9vw] border-b border-r font-bold flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1 ml-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>
                        Subject
                      </div>
                      <div className="pr-3 pl-5 w-[30vw] border-b flex items-center">
                        {item.subject}
                      </div>
                    </div>
                    <div className="flex h-[6vh]">
                      <div className="w-[9vw] border-b border-r font-bold flex items-center ">
                        <QuestionCircleOutlined className="mr-1 ml-2"/> Question
                      </div>
                      <div className="pr-3 pl-5 w-[30vw] border-b flex items-center">
                        {item.question}
                      </div>
                    </div>
                    <div className="flex h-[6vh]">
                      <div className="w-[9vw] border-b border-r font-bold flex items-center ">
                        <MessageOutlined className="mr-1 ml-2"/> Answer
                      </div>
                      <div className="pr-3 pl-5 w-[30vw] border-b flex items-center">
                        {item.answer == "" && role == "Mentor" ? (
                          <Modal
                            theID={item.id}
                            askerID={item.askerId}
                            answerID={item.answerId}
                            question={item.question}
                            askerFile={item.askerFile}
                          ></Modal>
                        ) : (
                          item.answer
                        )}
                      </div>
                    </div>
                    <div className="flex h-[6vh]">
                      <div className="w-[9vw] border-r text-center font-bold flex items-center border-b">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-2 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                        {role == "Mentor" ? <div>Ask File</div> : <div>Your File</div>}
                      </div>
                      <div className="pr-3 pl-5 w-[30vw] flex items-center  border-b">
                        {(item.askerFile == null || item.askerFile == "") ? <div>
                          No file
                        </div>
                        :
                        <Link href={item.askerFile} className="" color="" style={{textDecoration: '#000'}}>
                          <Button> 
                            {item.askerFile.substring(item.askerFile.lastIndexOf('/') + 1, item.askerFile.lastIndexOf('_'))}
                          </Button>
                        </Link>
                        }
                      </div>
                    </div>
                    <div className="flex h-[6vh]">
                      <div className="w-[9vw] border-r text-center font-bold flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-2 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                      </svg>
                      {role == "Mentor" ? <div>Your File</div> : <div>Answer File</div>}
                      </div>
                      <div className="pr-3 pl-5 w-[30vw] flex items-center ">
                        {(item.answerFile == null || item.answerFile == "") ? <div>
                          No file
                        </div>
                        :
                        <Link href={item.answerFile} className="" color="" style={{textDecoration: '#000'}}>
                          <Button>
                            {item.askerFile.substring(item.askerFile.lastIndexOf('/') + 1, item.askerFile.lastIndexOf('_'))}
                          </Button>
                        </Link>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="text-center w-[13vw] border-l flex items-center justify-center">
                    <div>
                      <div>
                        <span className="font-bold">Date: </span>{" "}
                        {date.slice(0, date.indexOf("T"))}
                      </div>
                      {/* <div>
                        <span className="font-bold">Status: </span>
                        <span
                          className="font-bold"
                          style={{ color: answer ? "#ADFF2F" : "red" }}
                        >
                          {isAnswered}
                        </span>
                      </div> */}
                      {role == "Mentor" ? (
                        <div>
                          <span className="font-bold">From: </span>
                          <span>{userNames[key]}</span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold">To: </span>
                          <span>{mentorNames[key]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-center mt-5">
            <div className="w-[53vw] flex">
              <h1 className="uppercase font-bold">Has not replied</h1>
              <button onClick={() => {setNotRepliedQaDisplay(!NotRepliedQaDisplay)}}>
                {
                  (NotRepliedQaDisplay) ? 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg> :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                }
              </button>
            </div>
          </div>
          
          {qaNotReplied?.map((item, key) => {
            const date = item.createdAt;
            let isAnswered = "Answering";
            let answer = false;
            if (item.answer != "" && item.answer != null) {
              isAnswered = "Answered";
              answer = true;
            }
            let theClassName = classNameReplied
            if(NotRepliedQaDisplay) {
              theClassName += " grid"
            } else {
              theClassName += " hidden"
            }
            return (
              <div className={theClassName} key={key}>
                <div className="my-5 flex border rounded-lg" style={{borderColor: '#FF0000'}}>
                  <div className="font-bold pr-[1vw] pl-[1vw] border-r flex justify-center items-center">
                    <p className="mt-auto mb-auto">{key + 1}</p>
                  </div>
                  <div className="">
                    <div className="flex h-[6vh]">
                      <div className="w-[8vw] border-b border-r font-bold flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1 ml-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>
                        Subject
                      </div>
                      <div className="pr-3 pl-5 w-[30vw] border-b flex items-center">
                        {item.subject}
                      </div>
                    </div>
                    <div className="flex h-[6vh]">
                      <div className="w-[8vw] border-r font-bold flex items-center">
                      <QuestionCircleOutlined className="mr-1 ml-2"/> Question
                      </div>
                      <div className="pr-3 pl-5 w-[30vw] flex items-center">
                        {item.question}
                      </div>
                    </div>
                  </div>
                  <div className="w-[13vw] border-l flex">
                    <div className="w-[88%] flex items-center justify-center">
                      <div>
                        <div>
                          <span className="font-bold">Date: </span>{" "}
                          {date.slice(0, date.indexOf("T"))}
                        </div>
                        {/* <div>
                          <span className="font-bold">Status: </span>
                          <span
                            className="font-bold"
                            style={{ color: answer ? "#ADFF2F" : "red" }}
                          >
                            {isAnswered}
                          </span>
                        </div> */}
                        {role == "Mentor" ? (
                          <div>
                            <span className="font-bold">From: </span>
                            <span>{userNames[key]}</span>
                          </div>
                        ) : (
                          <div>
                            <span className="font-bold">To: </span>
                            <span>{mentorNames[key]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {role == "Mentor" ? 
                    <div className="w-[12%]">
                      <button className="" onClick={() => {setQADisplay(false); 
                        setSubject(item.subject); setAskerID(item.askerId);
                        setTheID(item.id); setAnswerID(item.answerId);
                        setQuestion(item.question); setAskerFile(item.askerFile); console.log(item);}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-auto rounded-tr rounded-bl" style={{color: 'white', backgroundColor: 'black'}}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>: <div></div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </MentorLayout>
    </MainLayout>
  );
};

export default Mentor;