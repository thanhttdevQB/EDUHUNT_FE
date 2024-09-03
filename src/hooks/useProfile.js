import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/Profiles`; // Adjust the API URL as needed

export const useProfile = () => {
  const getProfile = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getallprofile = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (id, profileData) => {
    try {
      console.log(profileData);
      const response = await axios.put(`${API_URL}/${id}`, profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (password, newPassword) => {
    try {
      const id = localStorage.getItem("userId");
      const email = localStorage.getItem("userEmail");
      console.log(email);
      console.log(id);
      console.log("===============", password);
      console.log("===============", newPassword);

      const passwordData = {
        email,
        id,
        password,
        newPassword,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Account/changePassword`,
        passwordData
      );

      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const uploadCV = async (userId, cvUrl) => {
    try {
      const payload = {
        userId,
        urlCV: cvUrl,
      };
      const response = await axios.post(`${API_URL}/UploadCV`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getCV = async (userId) => {
    try {
      const payload = {
        userId,
      };
      const response = await axios.post(`${API_URL}/UploadCV`, payload);
      return response.data.urlCV;
    } catch (error) {
      throw error;
    }
  };

  return {
    getProfile,
    updateProfile,
    changePassword,
    uploadCV,
    getCV,
    getallprofile,
  };
};
