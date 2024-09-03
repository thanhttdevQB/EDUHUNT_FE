import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/RoadMaps`;

export const useRoadMap = () => {
  const getRoadMap = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getRoadMapById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const approveRoadMap = async (id, isApproved) => {
    try {
      const response = await axios.put(`${API_URL}/${id}/approve`, isApproved, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const deleteRoadMap = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const postRoadMaps = async (roadMaps) => {
    console.log(roadMaps);
    try {
      const response = await axios.post(API_URL, roadMaps);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    getRoadMap,
    getRoadMapById,
    deleteRoadMap,
    postRoadMaps,
    approveRoadMap,
  };
};
