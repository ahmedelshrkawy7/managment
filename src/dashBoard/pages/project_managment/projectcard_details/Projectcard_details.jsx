import React, { useEffect, useContext, useState } from "react";
import "./Projectcard_details.css";
import { Location } from "../../../routes/import";
import ReactApexChart from "react-apexcharts";

import { useNavigate, useParams } from "react-router-dom";

import Table_member from "../../../includes/table_member/Table_member";
import View_attachments from "../../../components/view_attachments/View_attachments";
import useAxios from "../../../api/Axios";
import LoadContext from "../../../components/loader/LoaderContext";
import pen from "../../../assets/project/edit-2.svg";
import trash from "../../../assets/project/trash.svg";

const Projectcard_details = () => {
  const { projectid } = useParams();
  const { setLoader } = useContext(LoadContext);

  const { getData, deleteData } = useAxios();
  const [table_data, setTable_data] = useState([]);
  const [project, setProject] = useState([]);
  const [projectphase, setProjectphase] = useState([]);
  const [phase_index, setPhase_index] = useState();
  const [phase_id, setPhase_id] = useState();
  const [active, setActive] = useState([1]);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      await getData(`/projects`).then((res) => {
        setTable_data(res?.allprojects);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchhead = async () => {
    try {
      await getData(`/projects/${projectid}`).then((res) => {
        setProject(res?.project);
        setProjectphase(res.project.phases);
        setLoader(false);
      });
    } catch (err) {
      setLoader(false);
    }
  };

  const handleDelete = (id) => {
    deleteData(`/ProjectPhases/${id}`);
    setProjectphase((prev) => prev.filter((el) => el.id !== id));
    setPhase_index();
  };

  useEffect(() => {
    fetchPost();
    fetchhead();
    setLoader(true);
  }, []);

  var options = {
    show: true,
    series: [Math.floor(project?.progress)],
    chart: {
      type: "radialBar",
      padding: 0,
      margin: 0,
    },
    plotOptions: {
      track: {
        background: "#fff",
        strokeWidth: "97%",
        margin: 0, // Remove track margin
      },
      dataLabels: {
        show: false, // Hide the data labels
      },

      radialBar: {
        labels: {
          show: false,
          name: {
            show: false,
          },
          dataLabels: {
            name: {
              show: false,
            },
          },
          total: {
            show: false,
          },
          value: {
            show: true,
            fontSize: "50px",
            fontFamily: "Lato",
          },
        },
        hollow: {
          margin: 0,
          size: "45%",
          background: "#fff",
        },
      },
    },
    colors: ["#1370E4"],
    labels: ["Progress "],
    stroke: {
      show: true,
      lineCap: "round",
      curve: "smooth",
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };

  const th = [
    "Task Title",
    "Start Date",
    "Priority",
    "Status",
    "End Date",
    "Member",
  ];
  const attributes = ["title", "type", "start", "end", "status"];

  return (
    <>
      <Location main="Dashboard View " head={project.title} />

      <div className="Projectcard_details-data flex gap-8 w-full justify-between">
        <div className="Projectcard_details-data_status  ">
          <div className="Projectcard_details-data_status-header">
            <h4>Project Status</h4>
            <div>
              <h4>{project.status}</h4>
            </div>
          </div>

          <div className="Projectcard_details-data_status-chart">
            <ReactApexChart
              options={options}
              series={options.series}
              // stroke={options.stroke}
              grid={options.grid}
              plotOptions={options.plotOptions}
              type="radialBar"
              height={250}
              width={250}
            />
          </div>
        </div>

        <div className="Projectcard_details-data_information ">
          <h2>Project Information</h2>
          <div className="Projectcard_details-data_information-content">
            <div className="Projectcard_details-data_information-content_img">
              <img src={project.logo} alt="" />
            </div>
            <div className="Projectcard_details-data_information-content_list">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span /> <h2> Project Name &nbsp; : &nbsp; </h2>{" "}
                <p> {project.title}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span /> <h2> Start Date &nbsp; : &nbsp; </h2>{" "}
                <p> {project.start}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span /> <h2> End Date &nbsp; : &nbsp; </h2>{" "}
                <p> {project.end}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span /> <h2> Phase Number &nbsp; : &nbsp; </h2>{" "}
                <p> {project.phases_count} &nbsp;Phases</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span /> <h2> Team Number &nbsp; : &nbsp; </h2>{" "}
                <p> {project.employee_count} &nbsp;Members</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" dash__form">
        <div className="dashboard_allfields_toggle gap-4">
          {projectphase?.map((sub, index) => {
            return (
              <>
                <div
                  className={`relative rounded-none	 ${
                    active[index] && "active"
                  }`}
                  key={sub.id}
                  onClick={() => {
                    setPhase_index(index);
                    setPhase_id(sub.id);
                    setActive(() => {
                      let arr = [];
                      arr[index] = 1;
                      return arr;
                    });
                  }}
                >
                  <h5>{sub.title}</h5>
                  <div
                    className="absolute phaseedit border-b-0  w-full justify-center gap-4 hidden 	"
                    style={{ flexDirection: "row" }}
                  >
                    <img
                      src={pen}
                      alt="person"
                      onClick={() => {
                        navigate(
                          `/projects/Phase/${project.id}?project=${project.title}&phaseid=${sub.id}`,
                          {
                            state: { projectphase },
                          }
                        );
                      }}
                    />
                    <img
                      src={trash}
                      alt="person"
                      onClick={() => {
                        handleDelete(sub.id);
                      }}
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>

        {projectphase[phase_index] != undefined ? (
          <form style={{ flexDirection: "column" }}>
            <h2 style={{ fontSize: "24px" }}>
              {projectphase[phase_index]?.description}
            </h2>

            <div
              className="Projectcard_details-data_information-content_list"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ background: "#1370E4" }} />{" "}
                <h2> Deadline &nbsp; : &nbsp; </h2>{" "}
                <p>{projectphase ? projectphase[phase_index]?.end : ""} </p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ background: "#1370E4" }} />{" "}
                <h2> Progress &nbsp; : &nbsp; </h2>{" "}
                <p>
                  {" "}
                  {projectphase
                    ? Math.floor(projectphase[phase_index]?.progress)
                    : ""}
                  &nbsp;%
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ background: "#1370E4" }} />{" "}
                <h2> No.of Members &nbsp; : &nbsp; </h2>{" "}
                <p>
                  {" "}
                  {projectphase
                    ? projectphase[phase_index]?.employee_count
                    : ""}
                </p>
              </div>
            </div>

            {/* <Table th={th} api='projects' res_key='allprojects'
                 attributes={attributes} eye_route='/projects/view' trash_route='/projects/Phase'  /> */}

            <Table_member
              th={th}
              api={`projects/${projectid}?phase_id=${phase_id}`}
              res_key="tasks"
              attributes={attributes}
              eye_route="/projects/view"
              trash_route="/projects/Phase"
            />

            <View_attachments
              links={projectphase ? projectphase[phase_index]?.links : []}
              attachs={
                projectphase ? projectphase[phase_index]?.attachments : []
              }
            />
          </form>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Projectcard_details;
