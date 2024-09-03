"use client";
import React, { useEffect, useState } from "react";
import { useRoadMap } from "../../../../hooks/useRoadMap";
import { useParams } from "next/navigation";
import MainLayout from "../../../../components/core/layouts/MainLayout";
import MentorLayout from "../../../../components/core/layouts/MentorLayout";
import { Modal, Image } from "antd";

const RoadMapPage = () => {
  const { id } = useParams();
  const { getRoadMapById } = useRoadMap();
  const [roadMaps, setRoadMaps] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRoadMap, setSelectedRoadMap] = useState(null);
  console.log(roadMaps);

  useEffect(() => {
    if (id) {
      getRoadMapById(id).then((data) =>
        setRoadMaps(data.filter((roadMap) => roadMap.isApproved))
      );
    }
  }, [id]);

  const showModal = (roadMap) => {
    setSelectedRoadMap(roadMap);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <MainLayout>
      <MentorLayout>
        {roadMaps.map((roadMap, index) => (
          <div className="my-10 flex rounded border mx-60" key={index}>
            <div className="mt-5 mb-5 w-[50vw] ml-5">
              <h2
                className="text-4xl font-bold cursor-pointer hover:text-[blue]"
                onClick={() => showModal(roadMap)}
              >
                {roadMap.title}
              </h2>
              <p className="text-lg text-[gray]">{roadMap.content}</p>
              <p className="italic text-xl my-3 text-[gray]">
                {roadMap.location}
              </p>
              <p className="text-lg text-[gray]">{roadMap.school}</p>
            </div>
          </div>
        ))}
        <Modal
          title={selectedRoadMap?.title}
          open={visible}
          onOk={handleOk}
          okText=<span className="text-[black]">Ok</span>
          onCancel={handleCancel}
        >
          <Image src={selectedRoadMap?.contentURL} alt="Roadmap" />
        </Modal>
      </MentorLayout>
    </MainLayout>
  );
};

export default RoadMapPage;
