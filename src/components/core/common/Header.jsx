"use client";
import React, { useState, useEffect } from "react";
import {
  SearchOutlined,
  TeamOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatars from "./Avatar";
import { driver } from "driver.js";
import useAuth from "../../../hooks/useAuth";
import "driver.js/dist/driver.css";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const pathName = usePathname();
  const [role, setRole] = useState(null);
  const { getAccessByUserId, updateAccess } = useAuth();
  const [showGuide, setShowGuide] = useState(false);
  const userId =localStorage.getItem("userId");
  const { data: session } = useSession();
  let roleSession = session?.role
  setTimeout(() => {roleSession = session?.role}, 5000)

  const items = [
    {
      label: (
        <Link
          href={"/"}
          className="no-underline block lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
        >
          HOME
        </Link>
      ),
      labelhighlight: (
        <Link
          href={"/"}
          className="no-underline block lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
        >
          HOME
        </Link>
      ),
      key: "0",
      icon: <SearchOutlined />,
    },
    {
      label: (
        <Link
          href={"/scholarship"}
          className="no-underline block lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
        >
          SCHOLARSHIP
        </Link>
      ),
      labelhighlight: (
        <Link
          href={"/scholarship"}
          className="no-underline block lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
        >
          SCHOLARSHIP
        </Link>
      ),
      key: "1",
      icon: <SearchOutlined />,
    },
    {
      label: (
        <Link
          href={"/message/0"}
          className="no-underline block lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
        >
          CHAT
        </Link>
      ),
      labelhighlight: (
        <Link
          href={"/message/0"}
          className="no-underline block lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
        >
          CHAT
        </Link>
      ),
      key: "2",
      icon: <MessageOutlined />,
    },
  ];

  if (role === "Mentor") {
    items.push(
      {
        label: (
          <Link
            href={"/mentor"}
            className="no-underline block lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
          >
            MENTOR
          </Link>
        ),
        labelhighlight: (
          <Link
            href={"/mentor"}
            className="no-underline block lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
          >
            MENTOR
          </Link>
        ),
        key: "4",
        icon: <TeamOutlined />,
      },
      {
        label: (
          <Link
            href="/roadmap"
            className="no-underline block mr-10 lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
          >
            ROADMAP
          </Link>
        ),
        labelhighlight: (
          <Link
            href="/roadmap"
            className="no-underline block mr-10 lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
          >
            ROADMAP
          </Link>
        ),
        key: "3",
        icon: <MessageOutlined />,
      }
    );
  } else if (role === "Scholarship Provider") {
    items.push(
      {
        label: (
          <Link
            href="/post"
            className="no-underline block lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
          >
            POST
          </Link>
        ),
        labelhighlight: (
          <Link
            href="/post"
            className="no-underline block lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
          >
            POST
          </Link>
        ),
        key: "3",
        icon: <MessageOutlined />,
      },
      {
        label: (
          <Link
            href="/application"
            className="no-underline block mr-10 lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
          >
            APPLICATION
          </Link>
        ),
        labelhighlight: (
          <Link
            href="/application"
            className="no-underline block mr-10 lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
          >
            APPLICATION
          </Link>
        ),
        key: "4",
        icon: <MessageOutlined />,
      }
    );
  } else if (role === "User") {
    items.push(
      {
        label: (
          <Link
            href={"/mentor"}
            className="no-underline block lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
          >
            MENTOR
          </Link>
        ),
        labelhighlight: (
          <Link
            href={"/mentor"}
            className="no-underline block lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
          >
            MENTOR
          </Link>
        ),
        key: "4",
        icon: <TeamOutlined />,
      },
      {
        label: (
          <Link
            href="/application"
            className="no-underline block mr-10 lg:inline-block lg:mt-7 text-black hover:border-b-2 text-center w-200"
          >
            APPLICATION
          </Link>
        ),
        labelhighlight: (
          <Link
            href="/application"
            className="no-underline block mr-10 lg:inline-block lg:mt-7 text-black border-b-2 text-center w-200 font-bold"
          >
            APPLICATION
          </Link>
        ),
        key: "3",
        icon: <MessageOutlined />,
      }
    );
  }

  useEffect(() => {
    const userRole = localStorage.getItem("role") || roleSession;
    setRole(userRole);

    const checkFirstTimeAccess = async () => {
      if (userId) {
        const firstTimeAccessed = await getAccessByUserId(userId);
        setShowGuide(!firstTimeAccessed.firstTimeAccessed);
      }
    };

    checkFirstTimeAccess();
  }, [userId, getAccessByUserId]);

  useEffect(() => {
    if (showGuide) {
      const steps = [
        {
          element: ".nav-0",
          popover: {
            title: "Home",
            description: "Navigate to the home page to explore the main features and latest updates.",
            position: "bottom",
          },
        },
        {
          element: ".nav-1",
          popover: {
            title: "Scholarship",
            description: "View available scholarships and apply for the ones that suit you.",
            position: "bottom",
          },
        },
        {
          element: ".nav-2",
          popover: {
            title: "Chat",
            description: "Open the chat page to communicate with mentors, providers, and other users.",
            position: "bottom",
          },
        },
      ];
      
      if (role === "Mentor") {
        steps.push(
          {
            element: ".nav-3",
            popover: {
              title: "Roadmap",
              description: "Access the roadmap page to view and manage your mentoring plans.",
              position: "bottom",
            },
          },
          {
            element: ".nav-4",
            popover: {
              title: "Mentor",
              description: "Visit the mentor page to find and connect with mentees.",
              position: "bottom",
            },
          }
        );
      } else if (role === "Scholarship Provider") {
        steps.push(
          {
            element: ".nav-3",
            popover: {
              title: "Post",
              description: "Create a new post to announce scholarships or updates.",
              position: "bottom",
            },
          },
          {
            element: ".nav-4",
            popover: {
              title: "Application",
              description: "Manage applications submitted by users for your scholarships.",
              position: "bottom",
            },
          }
        );
      } else if (role === "User") {
        steps.push(
          {
            element: ".nav-4",
            popover: {
              title: "Mentor",
              description: "Find a mentor to guide you through your educational journey.",
              position: "bottom",
            },
          },
          {
            element: ".nav-3",
            popover: {
              title: "Application",
              description: "View and manage your scholarship applications.",
              position: "bottom",
            },
          }
        );
      }

      const driverObj = driver({
        steps: steps,
        onDestroyStarted: async () => {
          if (userId) {
            await updateAccess({userId, firstTimeAccessed: true});
            setShowGuide(false);
            driverObj.destroy();
          }
        },
      });
      driverObj.drive();
    }
  }, [showGuide, role, userId, updateAccess]);

  return (
    <nav className="max-h-28 flex items-center justify-between flex-wrap p-6 z-10">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-extrabold text-6xl tracking-tight text-brown">
          EDUHUNT
        </span>
      </div>
      <div className="flex-grow lg:flex w-[60%]">
        <div className="lg:flex-grow w-[100%]">
          <div className="flex items-center justify-center">
            {items.map((item, index) => {
              const isActive =
                (pathName.includes(item.label.props.href) &&
                  item.label.props.href !== "/") ||
                (pathName === "/" && item.label.props.href === "/");

              return (
                <React.Fragment key={index}>
                  {React.cloneElement(
                    isActive ? item.labelhighlight : item.label,
                    {
                      className: `${item.label.props.className} nav-${item.key}`,
                    }
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
      <div className="z-10" style={{}}>
        <Avatars></Avatars>
      </div>
    </nav>
  );
};

export default NavBar;