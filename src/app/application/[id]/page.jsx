"use client";
//application
import DetailApplication from "../../../components/Application/DetailApplication";
import MainLayout from "../../../components/core/layouts/MainLayout";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import DetailApplicationScholarshipProvider from "../../../components/Application/DetailApplicationScholarshipProvider";
const ApplicationDetail = () => {
  const router = useRouter();
  useEffect(() => {
    const role = localStorage.getItem("role"); //role
    if (role == "User" || role == "Scholarship Provider") {
      
    }
    else{
      router.push("/");
    }
  });
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <MainLayout>
      {(localStorage.getItem("role")=="User") 
        ?
        <DetailApplication id={id} /> //list
            :
            <DetailApplicationScholarshipProvider id = {id} />
        }
        
      </MainLayout>
    </>
  );
};

export default ApplicationDetail;
