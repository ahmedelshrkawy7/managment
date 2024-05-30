import React, {
  Component,
  useRef,
  useEffect,
  useContext,
  useState,
} from "react";
import Location from "../../../includes/location/Location";
import case1 from "../../../assets/Form/briefcase.svg";
import { Link, useParams } from "react-router-dom";

import useAxios from "../../../api/Axios";
import View_attachments from "../../../components/view_attachments/View_attachments";
import LoadContext from "../../../components/loader/LoaderContext";
import { error } from "../../../notifications/Toast";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../../../assets/tasks/Rectangle 42062.svg";

import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Zoom, Navigation, Pagination } from "swiper/modules";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

const View_task = () => {
  let submitBtn = useRef(0);
  const { id } = useParams();
  const { setLoader } = useContext(LoadContext);
  const [task, setTask] = useState([]);
  const [testObj, setTestobj] = useState([]);
  const {getData} = useAxios()

  let string = [];

  task?.technologies?.map((tech) => {
    string.push(tech.name + " , ");
  });

  const fetchPost = async () => {
    try {
      await 
     
      getData(`/Phases/tasks/${id}`)
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res)
        setTask(res?.task);
        // setTestobj(res?.useCases);
      });
    } catch (err) {
      error(err.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPost();
    setLoader(true);

    console.log(task?.attachments);
  }, []);

  const items = [
    { name: "Project Name", data: task.title },
    { name: "Project Phase", data: task.phase_name },
    { name: "Task Title", data: task.title },
    { name: " Start Date ", data: task.start },
    { name: "Deadline ", data: task.end },
    { name: "Status", data: task.status },
    { name: "Priority", data: task.priority },
    { name: "Team Member", data: [...string] },
  ];

  return (
    <>
      <Location main="Task View" head={task.title} />
      <div className="dash__form">
        <div className="dash__form-header">
          <img src={case1} alt="case" />
          <p style={{ color: "#fff" }}>Task Information</p>
        </div>
        <form style={{ padding: "0" }}>
          <div className="dash__viewtask">
            <Swiper
              spaceBetween={30}
              zoom={true}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation, Zoom]}
              className="w-full h-100 flex justify-center items-center bg-blue-50 "
              style={{
                height: "800px",
                zIndex: "1",
              }}
            >
              <SwiperSlide>
                <img
                  src={img1}
                  alt="swiper"
                  style={{ width: "100%", height: "100%" }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={img1}
                  alt="swiper"
                  style={{ width: "100%", height: "100%" }}
                />
              </SwiperSlide>
            </Swiper>

            <div className="dash__viewtask-information">
              <h2 className="head">General Information :</h2>
              <div className="dash__viewtask-information_content grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4 px-4 ">
                {items.map((item) => {
                  return (
                    <div className="dash__viewtask-information_content-item">
                      <h3>{item.name}&nbsp;:</h3>
                      <p>&nbsp;{item.data}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="px-4">
              <View_attachments
                links={task?.links}
                attachs={task?.attachments}
              />
            </div>

            <div className="dash__viewtask-details px-4">
              <h2 className="head">task Description :</h2>
              <div className="dash__viewtask-details_content">
                <h2>{task.description}</h2>
              </div>
            </div>
            {!!testObj.length && (
              <div className="w-full p-4">
                <h2 className="head">Testing Information :</h2>
                <div className="w-full">
                  {testObj.map((usecase) => {
                    return (
                      <>
                        <div className="w-fit min-w-10  flex justify-center items-center p-2 mt-8 border-blue-500 border-2 rounded-2xl">
                          <h2 className="text-xl">{usecase.name}</h2>
                        </div>
                        {usecase.testCases?.map((test) => {
                          return (
                            <div className="w-full  bg-blue-50 flex justify-start items-center  my-4 rounded-2xl">
                              {/* <p className=" w-full text-xl text-nowrap  text-ellipsis overflow-hidden">
                                {test}
                              </p> */}
                              <Accordion
                                allowToggle
                                className="w-full rounded-2xl"
                              >
                                <AccordionItem>
                                  <h2>
                                    <AccordionButton>
                                      <Box as="span" flex="1" textAlign="left">
                                        {test}
                                      </Box>
                                      <AccordionIcon />
                                    </AccordionButton>
                                  </h2>
                                  <AccordionPanel pb={4}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                  </AccordionPanel>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          );
                        })}
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            type="sumbit"
            hidden
            ref={submitBtn}
            onClick={(e) => e.preventDefault()}
          ></button>
        </form>

        <div className="dash__form-confirm">
          <Link hidden type="submit" /*onClick={()=>{handleSubmit()}}*/>
            Create
          </Link>
          <Link to="/Tasks List"> Back </Link>
        </div>
      </div>
    </>
  );
};

export default View_task;
