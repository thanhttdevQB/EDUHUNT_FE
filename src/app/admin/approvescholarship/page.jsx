"use client";
import React, { useState, useEffect } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { useScholarship } from "../../../hooks/useScholarship";
import AdminLayout from "../../../components/core/layouts/AdminLayout";
import { useRouter } from "next/navigation";
import { Image } from "antd";

const ApproveScholarshipPage = () => {
  const { getScholarship, approveScholarship } = useScholarship();
  const [scholarshipData, setScholarshipData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") {
      router.push("/");
    }
    const fetchData = async () => {
      try {
        const data = await getScholarship();
        const unapprovedScholarships = data.filter(
          (scholarship) => !scholarship.isApproved
        );
        setScholarshipData(unapprovedScholarships);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id, isApproved) => {
    try {
      console.log(id, isApproved);
      await approveScholarship(id, isApproved);
      setScholarshipData(scholarshipData.filter((item) => item.id !== id));
      message.success("Scholarship approved successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to approve scholarship");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
      ellipsis: true,
    },
    {
      title: "School Name",
      dataIndex: "schoolName",
      key: "schoolName",
      ellipsis: true,
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (url) => <a href={url}>{url}</a>,
      ellipsis: true,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url) =>
        url ? <Image width={50} src={url} alt="Roadmap" /> : "No image",
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
            Approved
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1>Approve Scholarships</h1>
        <Table dataSource={scholarshipData} columns={columns} />
      </div>
    </AdminLayout>
  );
};

export default ApproveScholarshipPage;
