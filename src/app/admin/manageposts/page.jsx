"use client";
import React, { useState, useEffect } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { useScholarship } from "../../../hooks/useScholarship";
import AdminLayout from "../../../components/core/layouts/AdminLayout";
import { useRouter } from "next/navigation";
import { Image } from "antd";

const ManageScholarshipPage = () => {
  const { getScholarship, deleteScholarship } = useScholarship();
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
        const approvedScholarships = data.filter(
          (scholarship) => scholarship.isApproved
        );
        setScholarshipData(approvedScholarships);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteScholarship(id);
      // If deletion is successful, update the scholarship data by filtering out the deleted item
      setScholarshipData(scholarshipData.filter((item) => item.id !== id));
      message.success("Scholarship deleted successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete scholarship");
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

  console.log(scholarshipData);
  return (
    <AdminLayout>
      <div>
        <h1>Scholarship Management</h1>
        <Table dataSource={scholarshipData} columns={columns} />
      </div>
    </AdminLayout>
  );
};

export default ManageScholarshipPage;
