"user client";
import { useEffect, useState } from "react";
import { useApplication } from "../../hooks/useApplication";
import Link from "next/link";

export default function ListApplicationScholarshipProvider() {
  const { getApplicationsByScholarshipProvider } = useApplication();
  const [providerApplications, setProviderApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const providerId = localStorage.getItem("userId"); // Assuming provider ID is stored with this key
        if (!providerId) {
          console.error("Provider ID not found");
          return;
        }

        const applications = await getApplicationsByScholarshipProvider(
          providerId
        );
        setProviderApplications(applications);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    fetchApplications();
  }, []);
  console.log(providerApplications);
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
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Applications to My Scholarships
      </h1>
      {providerApplications.length > 0 ? (
        <div className="flex flex-col w-[60%] mx-auto">
          <ul>
            {providerApplications.map((application, index) => (
              <Link
                key={index}
                href={`/application/${application.applicationId}`}
                passHref
              >
                <li className="bg-white shadow-lg rounded-lg p-6 mb-4 w-full cursor-pointer">
                  <div className="flex flex-row justify-between  pb-3">
                    <p className=" text-3xl font-semibold">
                      {application.scholarshipTitle ||
                        "Scholarship Title Not Available"}
                    </p>
                    <p className=" text-2xl text-gray-600 mt-1 ml-6">
                      Budget: {application.scholarshipBudget || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-row items-bottom pb-3">
                    <p className="flex text-xl text-gray-600">
                      Location: {application.scholarshipLocation || "N/A"}{" "}
                    </p>
                  </div>

                  <div className="flex flex-row justify-between items-baseline">
                    <div className="flex text-xl">
                      <p>Status: </p>
                      <p
                        className={`ml-2 ${getStatusColor(application.status)}`}
                      >
                        {application.status || "Unknown"}
                      </p>
                    </div>
                    <button
                      href={application.Url || "#"}
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
        </div>
      ) : (
        <p className="text-center text-gray-500">No applications found.</p>
      )}
    </div>
  );
}
