"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import MainLayout from "../../../components/core/layouts/MainLayout";
import { useParams } from "next/navigation";
import { useApplication } from "../../../hooks/useApplication";
import { VideoCameraFilled } from "@ant-design/icons";
import Toasify from "../../../components/core/common/Toasify";
import Link from "next/link";
import { set } from "react-hook-form";

export default function Home() {
  const { id } = useParams();
  const { getApplication, putApplication, getApplicationsByScholarshipProvider } = useApplication();
  const role = localStorage.getItem("role");
  const [toasify, setToasify] = useState({ message: "", type: "" });
  const [canAddEvent, setCanAddEvent] = useState(true);
  const [studentId, setStudentId] = useState(null);
  const [scholarshipId, setScholarshipId] = useState(null);
  const [status, setStatus] = useState(null);
  const [meetLink, setMeetLink] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [applications, setApplications] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    allDay: false,
    id: 0,
    //meet: "",
  });
  console.log(id);
  console.log(role);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await getApplication(id);
        setStudentId(response.studentID);
        setStatus(response.status);
        setScholarshipId(response.scholarshipID);
        setMeetLink(response.meetingURL);
        console.log(response);
        if (
          role === "User" &&
          response.scholarshipProviderAvailableStartDate === null &&
          response.scholarshipProviderAvailableEndDate === null
        ) {
          setCanAddEvent(false);
        }

        if (
          (response.scholarshipProviderAvailableStartDate &&
            response.scholarshipProviderAvailableEndDate) ||
          response.studentChooseDay
        ) {
          const start = response.scholarshipProviderAvailableStartDate
            ? new Date(
                new Date(
                  response.scholarshipProviderAvailableStartDate
                ).getTime() -
                  new Date(
                    response.scholarshipProviderAvailableStartDate
                  ).getTimezoneOffset() *
                    60000
              ).toISOString()
            : new Date(
                new Date(response.studentChooseDay).getTime() -
                  new Date(response.studentChooseDay).getTimezoneOffset() *
                    60000
              ).toISOString();
          const end = response.scholarshipProviderAvailableEndDate
            ? new Date(
                new Date(
                  response.scholarshipProviderAvailableEndDate
                ).getTime() -
                  new Date(
                    response.scholarshipProviderAvailableEndDate
                  ).getTimezoneOffset() *
                    60000
              ).toISOString()
            : "";

          const newEvent = {
            title: "MEETING",
            start: start,
            end: end,
            allDay: true,
            id: new Date().getTime(),
          };

          setAllEvents((prevEvents) => [...prevEvents, newEvent]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchApplication();
  }, []);

  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("data");
          let start = eventEl.getAttribute("start");
          return { title, id, start };
        },
      });
    }
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      const userId = localStorage.getItem("userId");
      const role = localStorage.getItem("role");
      if (role == "Scholarship Provider") {
        const response = await getApplicationsByScholarshipProvider(userId);
        setApplications(response);
      }
    };

    fetchApplications();
  }, [setApplications]);

  function handleSelect(arg) {
    if (!canAddEvent) {
      return;
    }
    console.log(applications);
    const isOverlapping = applications.some(app => {
      const appStart = new Date(app.studentChooseDay).getTime();
      return (appStart >= arg.start.getTime() && appStart <= arg.end.getTime());
    });

    if (isOverlapping) {
      setToasify({message: "You had an argument with another student today.", type: "error"});
      return;
    }

    setNewEvent({
      ...newEvent,
      start: arg.start,
      end: arg.end,
      allDay: arg.allDay,
      id: new Date().getTime(),
      //meet: arg.meet,
    });
    setShowModal(true);
  }

  function addEvent(data) {
    const event = {
      ...newEvent,
      start: data.start.toISOString(),
      end: data.end.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime(),
      //meet: data.meet.toISOString(),
    };
    setAllEvents([...allEvents, event]);
  }

  function handleDeleteModal(data) {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  }

  function handleDelete() {
    setAllEvents(
      allEvents.filter((event) => Number(event.id) !== Number(idToDelete))
    );
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      allDay: false,
      id: 0,
      //meet: "",
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      title: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (role === "User") {
      putApplication(id, {
        id: id,
        studentID: studentId,
        scholarshipID: scholarshipId,
        meetingURL: `/message/${id}/meet`,
        studentChooseDay: new Date(
          new Date(newEvent.start).getTime() -
            new Date(newEvent.start).getTimezoneOffset() * 60000
        ).toISOString(),
        status: status,
      });
    }
    if (role === "Scholarship Provider") {
      putApplication(id, {
        id: id,
        studentID: studentId,
        scholarshipID: scholarshipId,
        scholarshipProviderAvailableStartDate: new Date(
          new Date(newEvent.start).getTime() -
            new Date(newEvent.start).getTimezoneOffset() * 60000
        ).toISOString(),
        scholarshipProviderAvailableEndDate: new Date(
          new Date(newEvent.end).getTime() -
            new Date(newEvent.end).getTimezoneOffset() * 60000
        ).toISOString(),
        status: status,
      });
    }
    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      allDay: false,
      id: 0,
    });
  }
  return (
    <MainLayout>
      {toasify.message && (
        <Toasify message={toasify.message} type={toasify.type} />
      )}
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "resourceTimelineWook, dayGridMonth,timeGridWeek",
              }}
              events={allEvents}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              select={handleSelect}
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
            />
          </div>

          <div
            id="draggable-el"
            className="ml-8 w-full border-2 p-2 rounded-md lg:h-1/4 "
          >
            <h1 className="font-bold text-lg text-center">Link meet</h1>
            {meetLink && (
              <div className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white">
                <Link href={meetLink} passHref>
                  <VideoCameraFilled />
                </Link>
              </div>
            )}
          </div>
        </div>
        <Transition.Root show={showDeleteModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={setShowDeleteModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel
                    className="relative transform overflow-hidden rounded-lg
                   bg-[#fff] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div
                          className="mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                      justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                        >
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Delete Event
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure, you want to delete this event?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#fff] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Add Event
                        </Dialog.Title>
                        <form action="submit" onSubmit={handleSubmit}>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="title"
                              className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 
                            focus:ring-inset focus:ring-violet-600 
                            sm:text-sm sm:leading-6"
                              value={newEvent.title}
                              onChange={(e) => handleChange(e)}
                              placeholder="Title"
                            />
                          </div>
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                              disabled={newEvent.title === ""}
                            >
                              Create
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                              onClick={handleCloseModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main>
    </MainLayout>
  );
}
