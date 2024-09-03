import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`; // Điều chỉnh API URL tùy thích

export const useMessage = () => {
  const getHistoryMessages = async (senderId, receiverId) => {
    try {
      const response = await axios.get(`${API_URL}/Messages/user/${senderId}/${receiverId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử tin nhắn:", error);
      throw error;
    }
  };

  return {
    getHistoryMessages
  };
};

