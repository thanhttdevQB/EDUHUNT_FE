import { useState } from "react";
import FPTU from "../../../../public/images/FPTU.png";

const GridItem = () => {
  const listTopScholarshipItem = [
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 0,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 1,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 2,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 3,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 4,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 5,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 6,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 7,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 8,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 9,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 10,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 11,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 12,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 13,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 14,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 15,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 16,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 17,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 18,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 19,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 20,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 21,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 22,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 23,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 24,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 25,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 26,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 27,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 28,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 29,
    },
    {
      universityName: "FPT University",
      describe:
        "I love FPT so much. It’s the happiest university, I can learn a lot of things here.",
      image: FPTU.src,
      key: 30,
    },
  ];

  const [components, setComponent] = useState(0);

  const readMore = () => {
    if (components + 10 <= listTopScholarshipItem.length) {
      setComponent((components) => components + 10);
    } else {
      alert("This is all the top scholarship");
    }
  };

  return (
    <div className="mt-10 mx-[40px]">
      <style jsx>{`
        .div-hover:hover {
          background: black;
          color: white;
        }
      `}</style>
      <div className="text-5xl border-l h-[3.65rem] mb-5">
        <span className="font-black ml-3 ">Top</span> <span>scholarships</span>
      </div>
      <div className="rounded-xl text-center" style={{ background: "#F3F8F9" }}>
        {listTopScholarshipItem.map((item, index) => {
          if (index < (components + 10) / 2) {
            return (
              <div className="flex justify-center items-center" key={index}>
                <div
                  className="flex mt-8 rounded-xl border w-[44%] h-[180px] mr-10 relative"
                  style={{ background: "white" }}
                >
                  <div className="h-[100%]">
                    <p className="text-2xl mt-4 ml-6 font-semibold mb-3">
                      {item.universityName}
                    </p>
                    {(() => {
                      var display = "";
                      if (item.describe.length >= 64) {
                        for (var i = 0; i < 49; i++) {
                          display += item.describe.charAt(i);
                        }
                      }
                      return <p className="text-base ml-6">{display}...</p>;
                    })()}
                    <div className="absolute bottom-0 ml-6 mb-2 flex">
                      <button
                        className="flex border rounded-3xl px-3 mr-2 div-hover"
                        style={{ fontSize: "15px" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill=""
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-3 h-4 mr-1 mt-[3.5px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          />
                        </svg>
                        Save school
                      </button>
                      <button
                        className="flex border rounded-3xl px-3 div-hover"
                        style={{ fontSize: "15px" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill=""
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-3 h-4 mr-1 mt-[3.5px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          />
                        </svg>
                        Save school
                      </button>
                    </div>
                  </div>

                  <div className=" ml-auto mr-4 flex w-[22%]">
                    <div
                      className="bg-no-repeat h-[85%] w-[100%] bg-cover rounded-lg m-auto"
                      style={{ background: `url(${item.image})` }}
                    ></div>
                  </div>
                </div>

                <div
                  className="flex mt-8 rounded-xl border w-[44%] h-[180px] relative"
                  style={{ background: "white" }}
                >
                  <div className="h-[100%]">
                    <p className="text-2xl mt-4 ml-6 font-semibold mb-3">
                      {item.universityName}
                    </p>
                    {(() => {
                      var display = "";
                      if (item.describe.length >= 64) {
                        for (var i = 0; i < 49; i++) {
                          display += item.describe.charAt(i);
                        }
                      }
                      return <p className="text-base ml-6">{display}...</p>;
                    })()}
                    <div className="absolute bottom-0 ml-6 mb-2 flex">
                      <button
                        className="flex border rounded-3xl px-3 mr-2 div-hover"
                        style={{ fontSize: "15px" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill=""
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-3 h-4 mr-1 mt-[3.5px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          />
                        </svg>
                        Save school
                      </button>
                      <button
                        className="flex border rounded-3xl px-3 div-hover"
                        style={{ fontSize: "15px" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill=""
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-3 h-4 mr-1 mt-[3.5px]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          />
                        </svg>
                        Save school
                      </button>
                    </div>
                  </div>

                  <div className=" ml-auto mr-4 flex w-[22%]">
                    <div
                      className="bg-no-repeat h-[85%] w-[100%] bg-cover rounded-lg m-auto"
                      style={{ background: `url(${item.image})` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          }
        })}

        <button
          className="rounded-xl border div-hover w-[8vw] mt-6 mb-6"
          onClick={readMore}
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default GridItem;
