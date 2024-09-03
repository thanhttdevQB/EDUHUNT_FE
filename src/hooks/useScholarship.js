import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
console.log(API_URL);

export const useScholarship = () => {
  const getScholarship = async () => {
    try {
      const response = await axios.get(`${API_URL}/ScholarshipInfoes`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const approveScholarship = async (id, isApproved) => {
    try {
      const response = await axios.put(`${API_URL}/ScholarshipInfoes/${id}/approve`, isApproved, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteScholarship = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/ScholarshipInfoes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const postScholarship = async (scholarshipData) => {
    try {
      const response = await axios.post(`${API_URL}/ScholarshipInfoes`, scholarshipData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getDetailScholarShip = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/ScholarshipInfoes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const searchScholarships = async (criteria) => {
    try {
      const response = await axios.post(`${API_URL}/Scholarship/search`, JSON.stringify(criteria), {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data, criteria);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getRecommendedScholarships = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/ScholarshipInfoes/recommend/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const findRecommendedScholarships = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/Scholarship/recommended/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getScholarship,
    deleteScholarship,
    postScholarship,
    getDetailScholarShip,
    approveScholarship,
    searchScholarships,
    getRecommendedScholarships,
    findRecommendedScholarships,
  };
};