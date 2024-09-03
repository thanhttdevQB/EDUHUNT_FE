// useSurvey.js
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/Survey`;

export const useSurvey = () => {
  const getSurveyByUserId = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const postSurvey = async (surveyData) => {
    try {
      const response = await axios.post(API_URL, surveyData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getQuestions = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Question/with-answers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getSurveyByUserId,
    postSurvey,
    getQuestions,
  };
};