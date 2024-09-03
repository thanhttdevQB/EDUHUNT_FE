"use client";
import { useEffect, useState } from "react";
import { useApplication } from "../../hooks/useApplication";
import { useScholarship } from "../../hooks/useScholarship";
import Link from "next/link";

export default function ApplicationList() {
  const { getApplications } = useApplication();
  const { getScholarship } = useScholarship();
  const [userApplications, setUserApplications] = useState([]);

  useEffect(() => {
    const fetchApplicationsAndScholarships = async () => {
      try {
        const studentID = localStorage.getItem("userId"); // Assuming userID is stored with this key
        const applications = await getApplications();
        const scholarships = await getScholarship();

        // Filter applications for the current user and merge with scholarship details
        const mergedData = applications
          .filter((app) => app.studentID === studentID)
          .map((app) => {
            const scholarshipDetails = scholarships.find(
              (sch) => sch.id === app.scholarshipID
            );
            return { ...app, scholarshipDetails: scholarshipDetails || {} };
          });

        setUserApplications(mergedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchApplicationsAndScholarships();
  }, []);

  // Helper function to format budget
  const formatBudget = (budget) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(budget);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-[#157f3e]";
      case "Wait":
        return "text-[#f7cb18]";
      case "Denied":
        return "text-[#b81d1d]";
      default:
        return "text-[#364354]";
    }
  };

  console.log(userApplications);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">My Applications</h1>
      <div className="flex flex-col w-[50%] mx-auto">
        {userApplications.length > 0 ? (
          <ul>
            {userApplications.map((application, index) => (
              <Link
                key={index}
                href={`/application/${application.id}`}
                passHref
              >
                <li className="bg-white shadow-lg rounded-lg p-6 mb-4 w-full cursor-pointer">
                  <div className="flex flex-row justify-between  items-bottom pb-3">
                    <p className="flex text-3xl font-semibold">
                      {application.scholarshipDetails.title ||
                        "Scholarship Title Not Available"}
                    </p>
                    <p className="flex text-2xl text-gray-600 mt-1 ml-3">
                      Budget:{" "}
                      {application.scholarshipDetails.budget
                        ? formatBudget(application.scholarshipDetails.budget)
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-row items-bottom pb-3">
                    <p className="flex text-xl text-gray-600">
                      Location:{" "}
                      {application.scholarshipDetails.location || "N/A"}
                    </p>
                  </div>

                  <div className="flex flex-row  justify-between items-baseline">
                    <div className="flex text-xl">
                      <p>Status: </p>
                      <p
                        className={`ml-2 ${getStatusColor(application.status)}`}
                      >
                        {application.status || "Unknown"}
                      </p>
                    </div>
                    <button
                      href={application.scholarshipDetails.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex bg-[#3b82f5] hover:bg-[#1d4ed8] text-[#fff] p-2 rounded-md text-lg"
                    >
                      Scholarship Details
                    </button>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No applications found.</p>
        )}
      </div>
    </div>
  );
}
