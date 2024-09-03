import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Updated to correct import statement
import {
  Card,
  Typography,
  Button,
  Spin,
  Descriptions,
  message,
  Modal,
} from "antd";

import { useApplication } from "../../hooks/useApplication"; // Assuming you have this hook for application details
import { useScholarship } from "../../hooks/useScholarship";

const { Title, Text } = Typography;

export default function DetailApplicationScholarshipProvider({ id }) {
  const role = localStorage.getItem("role");
  const router = useRouter();
  const { getApplication, putApplication } = useApplication();
  const { getDetailScholarShip } = useScholarship();
  const [application, setApplication] = useState(null);
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchApplicationDetail = async () => {
        setLoading(true);
        try {
          const appDetail = await getApplication(id);
          setApplication(appDetail);
          if (appDetail && appDetail.scholarshipID) {
            const schDetail = await getDetailScholarShip(
              appDetail.scholarshipID
            );
            setScholarship(schDetail);
          }
        } catch (error) {
          console.error("Error fetching details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchApplicationDetail();
    }
  }, [id]);

  const confirmAction = (action) => {
    Modal.confirm({
      title: `Are you sure you want to ${action} this application?`,
      content: `This action will ${action} the application and cannot be undone.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        action === "approve" ? handleApprove() : handleDeny();
      },
    });
  };

  const handleApprove = async () => {
    const updatedApplication = { ...application, status: "Approved" };
    try {
      await putApplication(application.id, updatedApplication);
      message.success("Application approved successfully");
      router.push("/application"); // Adjust the path as needed
    } catch (error) {
      console.error("Error updating application:", error);
      message.error("Failed to approve application");
    }
  };

  const handleDeny = async () => {
    const updatedApplication = { ...application, status: "Denied" };
    try {
      await putApplication(application.id, updatedApplication);
      message.success("Application denied successfully");
      router.push("/application"); // Adjust the path as needed
    } catch (error) {
      console.error("Error updating application:", error);
      message.error("Failed to deny application");
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!application || !scholarship) {
    return <Text>Details not found</Text>;
  }

  const formatBudget = (budget) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(budget);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card bordered={false}>
        <Title level={2}>{scholarship.title || "Title Not Available"}</Title>
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Budget">
            {scholarship.budget ? formatBudget(scholarship.budget) : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {application.status}
          </Descriptions.Item>
          <Descriptions.Item label="Location">
            {scholarship.location || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Application Reason">
            {application.applicationReason || "No reason provided"}
          </Descriptions.Item>
          <Descriptions.Item label="Attached File">
            {application.attachFile ? (
              <a
                href={application.attachFile}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Attached File
              </a>
            ) : (
              "No file attached"
            )}
          </Descriptions.Item>
        </Descriptions>
        {role === "Scholarship Provider" && application.status === "Wait" && (
          <div className="mt-2">
            <Button
              danger
              type="primary"
              onClick={() => confirmAction("approve")}
              style={{ marginRight: 10 }}
            >
              Approve
            </Button>
            <Button danger onClick={() => confirmAction("deny")}>
              Deny
            </Button>
          </div>
        )}
        <Button
          type="primary"
          href={scholarship.url || "#"}
          target="_blank"
          style={{ marginTop: 10 }}
        >
          Visit Scholarship Website
        </Button>
        <Button
          onClick={() => router.push("/calendar/" + id)}
          className="mt-4 ml-2"
        >
          Schedule
        </Button>
        <Button
          onClick={() => router.push(`/message/${application.studentID}`)}
          className="mt-4 ml-2"
        >
          Message
        </Button>
      </Card>
    </div>
  );
}
