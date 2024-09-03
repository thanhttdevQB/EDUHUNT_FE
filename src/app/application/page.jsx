"use client";
//application.js
import { useEffect } from "react";
import ListApplication from "../../components/Application/ListApplication";
import MainLayout from "../../components/core/layouts/MainLayout";
import { useRouter } from "next/navigation";
import ListApplicationScholarshipProvider from "../../components/Application/ListApplicationScholarshipProvider";

const Application = () => {
  const router = useRouter();
  useEffect(() => {
    const role = localStorage.getItem("role") || roleSession;
    if (role == "User" || role == "Scholarship Provider") {
      
    }
    else{
      router.push("/");
    }
  });
  return (
    <>
      <MainLayout>
      {(localStorage.getItem("role")=="User")
        ?
          <ListApplication></ListApplication>
            :
            <ListApplicationScholarshipProvider />
        }
       
      </MainLayout>
    </>
  );
};

export default Application;
