"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import GoogleButton from "../../components/auth/GoogleButton";
import useAuth from "../../hooks/useAuth";
import schoolGirl from "../../../public/images/schoolGirl.png";
import Toasify from "../../components/core/common/Toasify";
import { useRouter } from "next/navigation";
import queryString from "query-string";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [toasify, setToasify] = useState({ message: "", type: "" });
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (typeof window !== "undefined") {
      const parsedQuery = queryString.parse(window.location.search);
      const message = parsedQuery.message;
      if (message) {
        setToasify({ message: message, type: "info" });
      }
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setPasswordInputType(showPassword ? "password" : "text");
  };

  const submit = (e) => {
    e.preventDefault();

    login({ email, password, rememberMe })
      .then(() => {
        if (localStorage.getItem("userId") !== null) {
          console.log("Login success");
        }
      })
      .catch((error) => {
        setToasify({
          message: error.message,
          type: "error",
        });
      });
  };

  const theImage = schoolGirl.src;

  return (
    <>
      {/* <div className="bg-[#BEE9F2] min-h-screen flex items-center justify-center">
        
      </div> */}

      <div
        className="flex justify-center items-center  w-[100%] h-[100vh] "
        style={{ backgroundColor: "#BEE9F2" }}
      >
        {toasify.message && (
          <Toasify message={toasify.message} type={toasify.type} />
        )}
        <div className="h-[85vh] w-[80vw] flex">
          <div
            className="h-[100%] w-[46%] bg-no-repeat mr-[8%] rounded-3xl"
            style={{
              background: `url(${theImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            className="h-[80%] w-[46%] rounded-3xl flex items-center mt-16"
            style={{ background: "white" }}
          >
            <div className="bg-white rounded-lg p-8 w-[100%] items-center flex">
              <div className="w-[80%] mx-auto">
                <h1 className="text-2xl font-semibold mb-4 text-center">
                  Log in
                </h1>
                <p className="text-gray-600 mb-6 text-center">
                  Do not have an account?
                  <Link href="/register">
                    <span className="text-[#12B8FF]"> Sign up</span>
                  </Link>
                </p>
                <GoogleButton />
                <form onSubmit={submit}>
                  <p className="text-gray-600 mb-4 text-center flex items-center justify-between">
                    <span className="w-[28%] h-[2px] bg-[#D7D8D9]"></span>
                    Or continue with email
                    <span className="w-[28%] h-[2px] bg-[#D7D8D9]"></span>
                  </p>
                  <div>
                    <span className="text-[#333] text-sm">Email address</span>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your Email here"
                      className="border rounded-lg w-full px-3 py-2 mb-4"
                    />
                  </div>
                  <div>
                    <span className="text-[#333] text-sm">Password</span>
                    <span
                      className="text-[#333] text-sm float-right flex gap-[5px] items-center cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="14"
                        viewBox="0 0 16 14"
                        fill="none"
                      >
                        <path
                          d="M14.6536 1.63815L14.0573 1.04178C13.8887 0.873238 13.5775 0.899176 13.3831 1.13251L11.3084 3.194C10.3749 2.79212 9.35068 2.59763 8.27449 2.59763C5.07191 2.61055 2.29747 4.47756 0.961926 7.16159C0.884111 7.33013 0.884111 7.53752 0.961926 7.68013C1.58422 8.95077 2.51779 10.001 3.68469 10.7919L1.98621 12.5163C1.79173 12.7107 1.76579 13.0219 1.89548 13.1904L2.49185 13.7868C2.6604 13.9554 2.97156 13.9294 3.16604 13.6961L14.5497 2.31245C14.7961 2.11807 14.822 1.80693 14.6534 1.63837L14.6536 1.63815ZM8.96166 5.55364C8.74123 5.50177 8.5079 5.43698 8.28746 5.43698C7.18536 5.43698 6.30379 6.31865 6.30379 7.42064C6.30379 7.64107 6.35567 7.8744 6.42046 8.09483L5.55168 8.95058C5.2924 8.49683 5.14979 7.99109 5.14979 7.42067C5.14979 5.69628 6.53712 4.30895 8.26152 4.30895C8.83205 4.30895 9.33768 4.45155 9.79144 4.71083L8.96166 5.55364Z"
                          fill="#666666"
                          fillOpacity="0.8"
                        />
                        <path
                          d="M15.5871 7.16154C15.1333 6.25392 14.5368 5.43715 13.7979 4.77588L11.3863 7.16154V7.42082C11.3863 9.14521 9.99894 10.5325 8.27454 10.5325H8.01527L6.48535 12.0625C7.05588 12.1791 7.65225 12.2569 8.2357 12.2569C11.4383 12.2569 14.2127 10.3899 15.5483 7.69298C15.6649 7.51141 15.6649 7.32997 15.5871 7.16141L15.5871 7.16154Z"
                          fill="#666666"
                          fillOpacity="0.8"
                        />
                      </svg>
                      {showPassword ? "Hide" : "Show"}
                    </span>
                    <input
                      type={passwordInputType}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your Password here"
                      className="border rounded-lg w-full px-3 py-2 mb-4 pr-10"
                    />
                  </div>

                  <a
                    href="/forgotpassword"
                    className="text-[#333] text-sm underline float-right"
                  >
                    Forgot your password?
                  </a>
                  <label className="flex items-center text-gray-600 mb-4">
                    <input
                      onClick={() => setRememberMe(!rememberMe)}
                      type="checkbox"
                      className="mr-2"
                    />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="submit"
                    className="bg-[#67D0FD] text-[white] font-bold w-full py-2 rounded-[40px] mt-4"
                  >
                    Log In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
