import Image from "next/image";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { inherits } from "util";
import FPTU from "../../../../public/images/FPTU.png";
import Link from "next/link";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useRouter } from "next/navigation";

const GridSlide = () => {
  const listItem = [
    {
      key: 0,
      name: "FPT University",
      locate: "Da Nang, VietNam",
      image: FPTU.src,
    },
    {
      key: 1,
      name: "FPT University",
      locate: "Da Nang, VietNam",
      image: FPTU.src,
    },
    {
      key: 2,
      name: "FPT University",
      locate: "Da Nang, VietNam",
      image: FPTU.src,
    },
    {
      key: 3,
      name: "FPT University",
      locate: "Da Nang, VietNam",
      image: FPTU.src,
    },
    {
      key: 4,
      name: "FPT University",
      locate: "Da Nang, VietNam",
      image: FPTU.src,
    },
    {
      key: 5,
      name: "FPT University",
      locate: "Da Nang, VietNam",
      image: FPTU.src,
    },
    {
      key: 6,
      name: "FPT University",
      locate: "Da Nang, VietNam",
      image: FPTU.src,
    },
    {
      key: 7,
      name: "FPT University",
      locate: "Da Nang, VietNam",
      image: FPTU.src,
    },
    {
      key: 8,
      name: "FPT University",
      locate: "Da Nang, VietNam",
      image: FPTU.src,
    },
    {
      key: 9,
      name: "FPT University",
      locate: "Da Nang, VietNam",
      image: FPTU.src,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const route = useRouter();

  const nextSlide = () => {
    if (currentIndex != Math.floor(listItem.length / 4) * 4) {
      setCurrentIndex(currentIndex + 4);
    } else {
      setCurrentIndex(0);
    }
  };

  const lastSlide = () => {
    if (currentIndex != 0) {
      setCurrentIndex(currentIndex - 4);
    } else {
      setCurrentIndex(Math.floor(listItem.length / 4) * 4);
    }
  };

  return (
    <div className="w-full h-[55vh]" style={{ background: "#FAFAFA" }}>
      <div className=" text-5xl border-l h-[3.7rem] ml-5">
        <span className="font-black ml-3 ">New</span> <span>scholarships</span>
      </div>
      <div className="grid place-items-center h-[78%]">
        <div className="w-[93%] h-[100%] flex justify-center items-center">
          {listItem.map((item) => {
            if (item.key >= currentIndex && item.key < currentIndex + 4) {
              return (
                <div
                  key={item.key}
                  className="w-[20%] h-[100%] mr-8 text-center rounded"
                  style={{ background: "white" }}
                >
                  <div
                    style={{ backgroundImage: `url(${FPTU.src})` }}
                    className="bg-no-repeat bg-cover w-[90%] h-[70%] inline-block relative mt-2 mb-1 rounded"
                  >
                    <div
                      className="absolute bottom-0 right-0 mr-1 mb-1 w-[60%] rounded "
                      style={{ background: "rgba(255,255,255,0.85)" }}
                    >
                      {item.name}
                    </div>
                  </div>
                  <div className="flex text-center mb-1 ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-7 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                    <span
                      className="text-lg font-bold leading-8"
                      style={{ color: "grey" }}
                    >
                      {item.locate}
                    </span>
                  </div>
                  <style jsx>{`
                    .div-hover:hover {
                      background: black;
                      color: white;
                    }
                  `}</style>

                  <button className="border-2 rounded w-[90%] div-hover font-extrabold mt-1">
                    SHOW MORE...
                  </button>
                </div>
              );
            }
          })}
          <div
            className="absolute -translate-x-[-100%] translate-y-[-50%] left-3 text-2xl rounded p-2 bg-black/20 text-black cursor-pointer"
            style={{ color: "black" }}
          >
            <BsChevronCompactLeft onClick={lastSlide} size={50} />
          </div>

          <div
            className="absolute -translate-x-[100%] translate-y-[-50%] right-3 text-2xl rounded p-2 bg-black/20 text-black cursor-pointer"
            style={{ color: "black" }}
          >
            <BsChevronCompactRight onClick={nextSlide} size={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridSlide;
