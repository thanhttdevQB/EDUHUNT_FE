"use client";
import React, { useState, useEffect } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { useRoadMap } from "../../../hooks/useRoadMap";
import AdminLayout from "../../../components/core/layouts/AdminLayout";
import { useRouter } from "next/navigation";
import { Image } from "antd";

const ManagePostPage = () => {
  const { getRoadMap, deleteRoadMap } = useRoadMap();
  const [postData, setPostData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") {
      router.push("/");
    }
    const fetchData = async () => {
      try {
        const data = await getRoadMap();
        const approvedPosts = data.filter((post) => post.isApproved);
        setPostData(approvedPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRoadMap(id);
      setPostData(postData.filter((item) => item.id !== id));
      message.success("Post deleted successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete post");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "contentURL",
      key: "contentURL",
      render: (text, record) => (
        <Image width={50} src={record.contentURL} alt="Roadmap" />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      ellipsis: true,
    },
    {
      title: "School",
      dataIndex: "school",
      key: "school",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure delete this scholarship?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
          okType="danger"
        >
          <Button type="primary" danger size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1>Roadmap Management</h1>
        <Table dataSource={postData} columns={columns} />
      </div>
    </AdminLayout>
  );
};

export default ManagePostPage;
