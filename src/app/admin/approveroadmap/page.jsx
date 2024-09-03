"use client";
import React, { useState, useEffect } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { useRoadMap } from "../../../hooks/useRoadMap";
import AdminLayout from "../../../components/core/layouts/AdminLayout";
import { useRouter } from "next/navigation";
import { Image } from "antd";

const ApproveRoadMapPage = () => {
  const { getRoadMap, approveRoadMap } = useRoadMap();
  const [roadMapData, setRoadMapData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") {
      router.push("/");
    }
    const fetchData = async () => {
      try {
        const data = await getRoadMap();
        const unapprovedRoadMaps = data.filter(
          (roadMap) => !roadMap.isApproved
        );
        setRoadMapData(unapprovedRoadMaps);
        console.log(unapprovedRoadMaps);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id, isApproved) => {
    try {
      await approveRoadMap(id, isApproved);
      setRoadMapData(roadMapData.filter((item) => item.id !== id));
      message.success("Roadmap approved successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to approve roadmap");
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
          title="Do you want to approve this roadmap?"
          onConfirm={() => handleApprove(record.id, true)}
          onCancel={() => handleApprove(record.id, false)}
          okText="Yes"
          cancelText="No"
          okType="danger"
        >
          <Button type="primary" danger size="small">
            Approve
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1>Approve Roadmaps</h1>
        <Table dataSource={roadMapData} columns={columns} />
      </div>
    </AdminLayout>
  );
};

export default ApproveRoadMapPage;
