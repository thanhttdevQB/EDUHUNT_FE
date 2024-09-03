import axios from "axios";
import { useRouter } from "next/navigation";
import { useProfile } from "../hooks/useProfile";

const useAuth = () => {
  const { getProfile } = useProfile();
  const router = useRouter();

  const registerUser = async ({
    name,
    email,
    password,
    confirmPassword,
    roleId
  }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Account/register`,
        {
          name,
          email,
          password,
          confirmPassword,
          roleId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const login = async ({ email, password, rememberMe }) => {
    console.log(email, password, rememberMe);
    try {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!email.match(emailRegex)) {
        throw new Error("Email not valid");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Account/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);
      const data = response.data;

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      if (rememberMe) {
        localStorage.setItem("email", email);
      }
      if (data.message != "Login completed") {
        throw new Error(response.data.message);
      }
      let jwtData = data.token.split(".")[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);

      let role =
        decodedJwtData[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      const profile = await getProfile(data.userId);
      console.log(profile);

      localStorage.setItem("role", role);
      if (role === "Admin") {
        router.push("/admin");
      } else if (
        profile.firstName == null ||
        profile.lastName == null ||
        profile.userName == null
      ) {
        router.push("/profile");
      } else {
        router.push("/");
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const getAccessByUserId = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Account/AccessPage?userId=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateAccess = async (accessDto) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Account/AccessPage`,
        accessDto,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { registerUser, login, logout, getAccessByUserId, updateAccess };
};

export default useAuth;