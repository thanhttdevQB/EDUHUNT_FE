import React from "react";
import { signIn} from "next-auth/react";

function GoogleButton() {
  return (
    <div>
      <button
        onClick={() =>
          signIn("google", { callbackUrl: "/" })
        }
        className="bg-white text-[#333] border border-solid border-[#333] w-full py-2 rounded-[40px] mb-4 flex items-center justify-center"
      >
        <span className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="33"
            viewBox="0 0 32 33"
            fill="none"
          >
            <path
              d="M29.9887 17.168C29.9887 16.0194 29.8936 15.1811 29.6878 14.3119H16.3036V19.4964H24.1598C24.0015 20.7848 23.1462 22.7251 21.2454 24.0289L21.2188 24.2025L25.4506 27.4153L25.7438 27.4439C28.4364 25.0069 29.9887 21.4212 29.9887 17.168"
              fill="#4285F4"
            />
            <path
              d="M16.3018 30.828C20.1507 30.828 23.3819 29.5862 25.742 27.4441L21.2436 24.029C20.0399 24.8517 18.4242 25.4261 16.3018 25.4261C12.5321 25.4261 9.33259 22.9891 8.19205 19.6207L8.02488 19.6346L3.62456 22.972L3.56702 23.1287C5.9112 27.6924 10.7263 30.828 16.3018 30.828Z"
              fill="#34A853"
            />
            <path
              d="M8.19429 19.6208C7.89335 18.7516 7.71919 17.8202 7.71919 16.8578C7.71919 15.8953 7.89335 14.964 8.17846 14.0948L8.17049 13.9097L3.71502 10.5187L3.56924 10.5866C2.60309 12.4804 2.04871 14.607 2.04871 16.8578C2.04871 19.1086 2.60309 21.2351 3.56924 23.1289L8.19429 19.6208"
              fill="#FBBC05"
            />
            <path
              d="M16.3019 8.28927C18.9787 8.28927 20.7843 9.42241 21.8139 10.3693L25.8371 6.51974C23.3663 4.26898 20.1508 2.88747 16.3019 2.88747C10.7264 2.88747 5.91121 6.02299 3.56702 10.5866L8.17625 14.0947C9.33262 10.7263 12.5321 8.28927 16.3019 8.28927"
              fill="#EB4335"
            />
          </svg>
        </span>
        Continue with Google
      </button>
    </div>
  );
}

export default GoogleButton;
