"use client";

import { Image as ImageAntd } from "antd";
import { VideoCameraFilled } from "@ant-design/icons";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";

function BoxChat({ users }) {
  const { id } = useParams();
  const information = users[+id];

  const router = useRouter();

  return (
    <>
      <div className="bg-white flex-1 border-[1px]">
        <div className="flex flex-row justify-between border-b-[1px] h-[65px] items-center px-4">
          <div className="flex flex-row items-center">
            <ImageAntd
              src={information?.avatar}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            ></ImageAntd>
            <div className="flex flex-col text-lg font-medium ml-2">
              <p>{information?.name}</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Link href={`/message/${id}/meet`} target="_blank">
              <VideoCameraFilled />
            </Link>
          </div>
        </div>
        <div className="flex flex-1 h-[524px] overflow-auto">
          <div>
            <Image
              src="/images/mes.png"
              alt=""
              width={1000}
              height={900}
              className="object-fit"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoxChat;
