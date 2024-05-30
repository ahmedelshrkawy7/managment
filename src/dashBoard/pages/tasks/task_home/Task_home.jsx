import React, { useContext, useEffect, useRef, useState } from "react";
import plus from "../../../assets/Form/icons.svg";
import "./Task_home.css";
import star from "../../../assets/tasks/solar_star-outline.svg";
import link from "../../../assets/tasks/et_attachments.svg";
import Label from "../../../components/label/Label";
import progress from "../../../assets/tasks/lucide_clipboard-list.svg";
import delayed from "../../../assets/tasks/system-uicons_document.svg";
import useAxios, { Axios } from "../../../api/Axios";
import { useNavigate } from "react-router-dom";
import Task_view from "../task_view/Task_view";
import { Scroll } from "../../../includes/scrollHorizantly/Scroll";
import { Location, No_member } from "../../../routes/import";
import { Nprojectcard } from "../../../components/Nprojectcard/Nprojectcard";
import LoadContext from "../../../components/loader/LoaderContext";
import { error } from "../../../notifications/Toast";
import Header from "../../../components/Header/Header";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Spinner } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const Task_home = () => {
  const { setLoader } = useContext(LoadContext);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState([1]);
  const [toggle, setToggle] = useState(false);
  const [projects, setProjects] = useState([]);
  const [project_statistics, setProject_statistics] = useState([]);
  const [project_id, setProject_id] = useState();
  const [tasks_count, setTasks_count] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [phases, setPhases] = useState([]);
  const [phase_id, setPhase_id] = useState();
  const [active1, setActive1] = useState(1);
  const [activeClass, seActiveClass] = useState(null);
  const [taskId, setTaskId] = useState();
  const [spinner, setSpinner] = useState(false);

  const { getData } = useAxios();


  const togglefun = (id) => {
    setToggle(!toggle);
    setTaskId(id);
  };

  const fetchPost = async () => {
    const endpoints = ["projects", "tasks"];
    try {
      Promise.all(
        endpoints.map((endpoint) =>
         getData(`/${endpoint}`).catch((err) => {
            error(err?.response?.data?.message);
          })
        )
      ).then(([{ data: projects }, { data: tasks_count }]) => {
        setProjects(projects?.data?.allprojects);
        setTasks_count(tasks_count?.data?.task_counts);
        setLoader(false);
      });
    } catch (err) {
      error(err?.response?.data?.message);
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    fetchPost();
  }, []);

  useEffect(() => {
    if (phase_id) {
      getData(`/projects/${project_id}?phase_id=${phase_id}`)
        .then((res) => {
          setTasks(res?.tasks);
          setSpinner(false);
        })
        .catch((err) => {
          error(err.response.data.message);
          setSpinner(false);
        });
    }
  }, [phase_id]);

  useEffect(() => {
    if (project_id) {
      getData(`/Phases/${project_id}`)
        .then((res) => {
          setPhases(res?.Phases);
          setTasks([]);
        })
        .catch((err) => {
          error(err.response.data.message);
        });
      getData(`/projects/${project_id}`)
        .then((res) => {
          setProject_statistics(res?.data);
          setTasks([]);
        })
        .catch((err) => {
          error(err.response.data.message);
        });
    }
  }, [project_id]);

  const setproject_id = (num) => {
    setProject_id(num);
    seActiveClass(num);
  };


  return (
    <>
      <Location main="Dashboard" head="Tasks" />

      {projects.length ? (
        <div className="task_home-projects">
          {/* <div className="task_title">Projects</div> */}
          <Header text="Projects" />

          <Swiper
            className="task_home-projects-cards"
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true }}
            // autoplay={{ delay: 3000, disableOnInteraction: false }}
            Mousewheel={true}
            breakpoints={{
              // when window width is >= 768px
              300: {
                slidesPerView: 1,
              },
              568: {
                slidesPerView: 2,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {projects?.map((project, index) => {
              return (
                <SwiperSlide>
                  <Nprojectcard
                    project={project}
                    index={index}
                    pro_id={setproject_id}
                    active={activeClass}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* <div className="task_title">Project Statistics</div> */}
          <Header text="Project Statistics" />

          <div className="task_home-Statistics">
            <div className="task_home-Statistics_card">
              <div className="task_home-Statistics_card-icon">
                <img src={star} alt="star" />
              </div>
              <div className="task_home-Statistics_card-content">
                <h6 style={{ color: "#000" }}>Completed Tasks</h6>
                <h4>
                  {tasks_count?.completed_tasks <= 10
                    ? "0" + tasks_count?.completed_tasks
                    : tasks_count?.completed_tasks}
                </h4>
              </div>
            </div>
            <div
              className="task_home-Statistics_card"
              style={{ background: "#21BD1E" }}
            >
              <div className="task_home-Statistics_card-icon">
                <img src={delayed} alt="star" />
              </div>
              <div className="task_home-Statistics_card-content">
                <h6 style={{ color: "#000" }}> In Progress Tasks</h6>
                <h4 style={{ color: "#21BD1E" }}>
                  {tasks_count?.in_progress_tasks <= 10
                    ? "0" + tasks_count?.in_progress_tasks
                    : tasks_count?.in_progress_tasks}
                </h4>
              </div>
            </div>
            <div
              className="task_home-Statistics_card"
              style={{ background: "#F24040" }}
            >
              <div className="task_home-Statistics_card-icon">
                <img src={progress} alt="star" />
              </div>
              <div className="task_home-Statistics_card-content">
                <h6 style={{ color: "#000" }}>Delayed Tasks</h6>
                <h4 style={{ color: "#F24040" }}>
                  {tasks_count?.delayed_tasks <= 10
                    ? "0" + tasks_count?.delayed_tasks
                    : tasks_count?.delayed_tasks}
                </h4>
              </div>
            </div>
          </div>

          <div className="task_home-phases">
            <div
              className="dashboard_allfields_toggle"
              style={{ width: "100%" }}
            >
              {phases?.map((sub, index) => {
                return (
                  <div
                    style={{ flexGrow: "1", maxWidth: "250px" }}
                    className={active[index] ? "active" : ""}
                    key={sub.id}
                    onClick={() => {
                      setIndex(index);
                      setActive(() => {
                        let arr = [];
                        arr[index] = 1;
                        return arr;
                      });
                      setPhase_id(sub.id);
                      setSpinner(true);
                    }}
                  >
                    <h5>{sub.title}</h5>
                  </div>
                );
              })}
            </div>

            <div className="task_home-phases_content">
              <div className="task_title">Tasks Today</div>
              {!spinner ? (
                !!tasks.length ? (
                  <div className="task_home-phases_tasks">
                    {tasks?.map((task, id) => {
                      return (
                        <div
                          className="task_home-phases_tasks-task"
                          onClick={() => togglefun(id)}
                        >
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              padding: "0",
                            }}
                          >
                            <div className="task_home-phases_tasks-task_person">
                              <img src={task.employee.image} alt="aaa" />
                              <div>
                                <h6>Start from</h6>
                                <p>{task.start}</p>
                              </div>
                            </div>

                            <div className="task_home-phases_tasks-task_name">
                              <h4>{task.title}</h4>
                              <div className="task_home-phases_tasks-task_name-content">
                                <div className="task_home-phases_tasks-task_name-content_link">
                                  <img src={link} alt="link" />
                                  <h4>{task.links[0]}</h4>
                                </div>{" "}
                                <span className="span_space" />
                                <div className="task_home-phases_tasks-task_name-content_status">
                                  <h4>Status :</h4>
                                  <Label text={task.status} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="task_home-phases_tasks-task_priority">
                            <h2>Priority :</h2>
                            <Label text={task.priority} />
                          </div>
                          <div className="task_home-phases_tasks-task_progress">
                            <h6>
                              Progress <span>{Math.floor(task.progress)}%</span>
                            </h6>
                            <progress
                              value={task.progress}
                              max="100"
                            ></progress>
                          </div>
                          <div className="task_home-phases_tasks-task_deadline">
                            <h5>Deadline</h5>
                            <h5 style={{ color: "var(--blue)" }}>{task.end}</h5>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="w-full ">
                    {" "}
                    <h4 className="font-medium text-blue">
                      No Tasks Today for this Phase
                    </h4>{" "}
                  </div>
                )
              ) : (
                <Spinner size="lg" color="var(--blue)" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <No_member />
      )}

      {toggle && <Task_view fun={togglefun} task={tasks[taskId]} />}
    </>
  );
};

export default Task_home;
