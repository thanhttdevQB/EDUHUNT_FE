"use client";

import { Typography } from "antd";
import {
  SearchOutlined,
  TeamOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Footer from "../common/Footer";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "../common/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";

const { Text } = Typography;

const MainLayout = ({ children }) => {
  const pathName = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

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
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  var id = null;
  const { data: session } = useSession();
  const route = useRouter();

  if (typeof window !== "undefined") {
    id = localStorage.getItem("userId");
  }

  return (
    <div className="font-sans">
      <NextUIProvider>
        <Header />

        <main className="mx-auto pl-8 pr-8">{children}</main>

        <Footer />
      </NextUIProvider>
    </div>
  );
};

export default MainLayout;
