"use client";

import React from "react";
import { Avatar, Badge, Divider, Input, Menu } from "antd";
import Image from "next/image";
import SiderItem from "./SiderItem";
import { SearchOutlined } from "@ant-design/icons";

function Sider({ users }) {
  return (
    <div className="flex flex-col max-w-80 max-h-[calc(100vh-186px)] overflow-auto bg-white border-[0px] border-r-[1px]">
      <div className="p-4 border-b-[1px]">
        <Input
          size="middle"
          placeholder="Tìm liên hệ..."
          prefix={<SearchOutlined />}
        />
      </div>
      {users.filter(item => item).map((item, index) => (
        <SiderItem key={index} information={item}></SiderItem>
      ))}
    </div>
  );
}

export default Sider;
