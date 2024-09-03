import { signIn } from "next-auth/react";

function FacebookButton() {
  return (
    <>
      <button
        onClick={() =>
          signIn("facebook", { callbackUrl: `${process.env.NEXTAUTH_URL}/` })
        }
        className="bg-white text-[#333] border border-solid border-[#333] w-full py-2 rounded-[40px] mb-4 flex items-center justify-center"
      >
        <span className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
          >
            <circle cx="16.5172" cy="16.4989" r="13.9703" fill="#0C82EE" />
            <path
              d="M21.7197 20.7714L22.3402 16.8283H18.4581V14.2707C18.4581 13.1917 18.9994 12.1393 20.7382 12.1393H22.5043V8.78235C22.5043 8.78235 20.9022 8.51593 19.3712 8.51593C16.1726 8.51593 14.0839 10.4049 14.0839 13.8231V16.8283H10.5298V20.7714H14.0839V30.3041C14.7974 30.4133 15.5274 30.4692 16.271 30.4692C17.0146 30.4692 17.7446 30.4133 18.4581 30.3041V20.7714H21.7197Z"
              fill="white"
            />
          </svg>
        </span>
        Continue with Facebook
      </button>
    </>
  );
}

export default FacebookButton;
