import axios from "axios";

const API = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const usePasswordReset = () => {
  const send = async (email) => {
    try {
      await axios.post(`${API}/CodeVerifies/resetpassword`, email, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const verify = async (email, code) => {
    try {
      const response = await axios.post(`${API}/CodeVerifies/Verify`, {
        email,
        code,
      });

      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const reset = async (email, password) => {
    try {
      const response = await axios.post(`${API}/Account/forgotPassword`, {
        email,
        newPassword: password,
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    send,
    verify,
    reset,
  };
};
