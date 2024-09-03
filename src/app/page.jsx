"use client";
import React, { useEffect, useState } from "react";
import { theme } from "antd";
import MainLayout from "../components/core/layouts/MainLayout";
import Slider from "../components/core/common/Slider.jsx";
import GridSlide from "../components/core/common/GridSlide";
import GridItem from "../components/core/common/GridItem";
import Toasify from "../components/core/common/Toasify";
import SurveyForm from '../components/surveyform/SurveyForm';
import queryString from "query-string";
import { useSurvey } from "../hooks/useSurvey";
import { useSession } from "next-auth/react";

const Home = () => {
  const [toasify, setToasify] = useState({ message: "", type: "" });
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const { getSurveyByUserId } = useSurvey();
  const { data: session } = useSession();
  const userIdSession = session?.userId;
  const roleSession = session?.role;


  const openSurvey = () => {
    setIsSurveyOpen(true);
  };

  const closeSurvey = () => {
    setIsSurveyOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const parsedQuery = queryString.parse(window.location.search);
      const message = parsedQuery.message;
      if (message) {
        setToasify({ message: message, type: "error" });
      }

      const userId = localStorage.getItem("userId") || userIdSession
      const role = localStorage.getItem("role") || roleSession;
      if (userId&&role ==="User") {
        getSurveyByUserId(userId)
          .then(response => {
            // Handle successful response if needed
          })
          .catch(error => {
            openSurvey();
          });
      }
    }
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <MainLayout>
      {isSurveyOpen && <SurveyForm closeSurvey={closeSurvey} />}
      {toasify.message && (
        <Toasify message={toasify.message} type={toasify.type} />
      )}
      <Slider />
      <GridSlide />
      <GridItem></GridItem>
    </MainLayout>
  );
};

export default Home;