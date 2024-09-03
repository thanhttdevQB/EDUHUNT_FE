"use client";
import React, { useState, useEffect } from "react";
import MainLayout from "../../components/core/layouts/MainLayout";
import { Image, Select, Input, Button, Spin } from "antd";
import FPTU from "../../../public/images/FPTU.png";
import { useScholarship } from "../../hooks/useScholarship";
import { useProfile } from "../../hooks/useProfile";
import { useLocation } from "../../hooks/useLocation";
import Toasify from "../../components/core/common/Toasify";

const Scholarship = () => {
  const [scholarshipData, setScholarshipData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const role = localStorage.getItem("role");
  const [isVip, setIsVip] = useState(false);
  const { getScholarship, searchScholarships, getRecommendedScholarships, findRecommendedScholarships } = useScholarship();
  const { getProfile } = useProfile();
  const { Option } = Select;
  const { getCountries, countries } = useLocation();
  const [toasify, setToasify] = useState({ message: "", type: "" });
  const filterOption = (input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  const [searchParams, setSearchParams] = useState({
    schoolname: "",
    budget: "",
    location: "",
    level: "",
    smartSearch: "",
  });
  const [searchType, setSearchType] = useState('regular');
  const [isLoading, setIsLoading] = useState(false);

  const handleCountryChange = (value) => {
    setSearchParams({
      ...searchParams,
      location: value,
    });
  };

  const handleLevelChange = (value) => {
    setSearchParams({
      ...searchParams,
      level: value,
    });
  };

  const handleInputChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getScholarship();

        const scholarships = data.filter(
          (scholarship) => scholarship.isApproved
        );
        setScholarshipData(scholarships);
        setOriginalData(scholarships);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchVipStatus = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await getProfile(userId);
        setIsVip(response.isVIP);
      } catch (error) {
        console.error(error);
      }
    };

    getCountries();
    fetchData();
    fetchVipStatus();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const locationSearch = searchParams.location
      .trim()
      .toLowerCase()
      .replace(/,+$/, "");
    const filteredData = originalData.filter((scholarship) => {
      let matchSchoolName = true;
      let matchBudget = true;
      let matchLocation = true;
      let matchLevel = true;
      if (searchParams.schoolname && scholarship.schoolName) {
        matchSchoolName = scholarship.schoolName
          .toLowerCase()
          .includes(searchParams.schoolname.toLowerCase());
      }
      if (searchParams.budget && scholarship.budget) {
        const budget = Number(scholarship.budget.replace(/[^0-9.-]+/g, ""));
        matchBudget = budget <= Number(searchParams.budget);
      }
      if (locationSearch && scholarship.location) {
        matchLocation = scholarship.location
          .toLowerCase()
          .includes(locationSearch);
      }
      if (searchParams.level && scholarship.level) {
        matchLevel = scholarship.level
          .toLowerCase()
          .includes(searchParams.level.toLowerCase());
      }
      return matchSchoolName && matchBudget && matchLocation && matchLevel;
    });
    console.log(searchParams);
    setScholarshipData(filteredData);
  };

  const handleSmartSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const string = searchParams.smartSearch.trim();
      const filteredData = await searchScholarships(string);
      console.log(filteredData);
      setScholarshipData(filteredData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecommend = async () => {
    if (!isVip && role === "User") {
      setToasify({ message: "You need to be a VIP to use this feature", type: "error" });
    } else
      setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      let recommendedData = await getRecommendedScholarships(userId);
      console.log(recommendedData);
      if (recommendedData.length === 0) {
        recommendedData = await findRecommendedScholarships(userId);
      }
      setScholarshipData(recommendedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSearchType = () => {
    setSearchType(searchType === 'regular' ? 'smart' : 'regular');
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow-md p-4">
        {toasify.message && (
          <Toasify message={toasify.message} type={toasify.type} />
        )}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Search for Scholarships</h2>
          <Button className="h-[40px] text-[16px]" onClick={toggleSearchType}>
            Switch to {searchType === 'regular' ? 'Smart' : 'Regular'} Search
          </Button>
        </div>

        {searchType === 'regular' ? (
          <div>
            <form action="#" onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <Select
                    id="country"
                    name="country"
                    className="w-full h-[41px] border border-[black] rounded-lg "
                    defaultValue="Select a country"
                    onChange={handleCountryChange}
                    showSearch
                    filterOption={filterOption}
                  >
                    <Option value="">All Countries</Option>
                    {countries.map((country, index) => (
                      <Option key={index} value={country}>
                        {country}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-700">
                    Level
                  </label>
                  <Select
                    id="level"
                    name="level"
                    className="w-full h-[41px] border border-[black] rounded-lg "
                    defaultValue="Select a level"
                    onChange={handleLevelChange}
                    showSearch
                    filterOption={filterOption}
                  >
                    <Option value="">All Levels</Option>
                    <Option value="High School">High School</Option>
                    <Option value="Undergraduate"> Undergraduate</Option>
                    <Option value="Postgraduate">Postgraduate</Option>
                  </Select>
                </div>

                <div>
                  <label htmlFor="schoolname" className="block mb-2 text-sm font-medium text-gray-700">
                    School Name
                  </label>
                  <input
                    type="text"
                    id="schoolname"
                    name="schoolname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter school name"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block mb-2 text-sm font-medium text-gray-700">
                    Budget
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter budget"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg px-4 py-2"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={handleRecommend}
                  className="bg-green-500 hover:bg-green-700 text-white font-semibold text-sm rounded-lg px-4 py-2 ml-2"
                >
                  Recommend
                </button>
              </div>
            </form>
          </div>
        ) : (
          !isVip && role === "User" ? (
            <Toasify message="You need to be a VIP to use this feature" type="error" />
          ) : (
            <div>
              <form action="#" onSubmit={handleSmartSearch}>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="smartSearch"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Enter your search query
                    </label>
                    <Input
                      type="text"
                      id="smartSearch"
                      name="smartSearch"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Enter search query"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg px-4 py-2"
                  >
                    Smart Search
                  </button>
                </div>
              </form>
            </div>
          )
        )}
      </div>

      <div className="flex flex-col items-center justify-center">
        {isLoading ? (
          <Spin size="large" tip="Loading scholarships..." />
        ) : (
          <div className="w-[100%] p-4">
            <div className="flex flex-wrap items-center justify-center">
              {scholarshipData.map((scholarship, index) => (
                <div key={index} className="p-4">
                  <div className="bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col items-center justify-center p-8 w-[400px]">
                      <Image
                        className="object-cover"
                        src={scholarship.imageUrl || FPTU.src}
                        alt={scholarship.schoolName || scholarship.school_name}
                        width={300}
                        height={300}
                      />
                      <h1 className="text-2xl font-bold text-gray-800">
                        {scholarship.schoolName || scholarship.school_name}
                      </h1>
                      <p className="text-md text-gray-600">{scholarship.title}</p>
                      <div className="flex flex-row justify-between mt-4">
                        <div className="flex flex-col items-center justify-center">
                          <p className="text-lg font-bold text-gray-800 text-center">
                            {scholarship.budget}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between mt-4 gap-4">
                        {/* <a
                        href={scholarship.url}
                        target="_blank"
                        className="btn btn-primary font-bold"
                      >
                        SAVE SCHOOL
                      </a> */}
                        <a
                          href={scholarship.url}
                          target="_blank"
                          className="btn btn-secondary font-bold"
                        >
                          <button
                            style={{
                              backgroundColor: "White",
                              borderRadius: "10px",
                              padding: "10px",
                              boxShadow:
                                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            }}
                            id="visitScholarshipWebsite"
                            className="btn btn-secondary font-bold"
                          >
                            Visit Scholarship Website
                          </button>
                        </a>
                        {scholarship.isInSite && (
                          <a
                            href={`/scholarship/${scholarship.id}`}
                            target="_blank"
                            className="btn btn-primary font-bold"
                          >
                            <button
                              style={{
                                backgroundColor: "White",
                                borderRadius: "10px",
                                padding: "10px",
                                boxShadow:
                                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                              }}
                              id="visitScholarshipWebsite"
                              className="btn btn-secondary font-bold"
                            >
                              Detail
                            </button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Scholarship;