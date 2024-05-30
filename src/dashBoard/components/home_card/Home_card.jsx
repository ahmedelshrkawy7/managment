import React from "react";
import ReactApexChart from "react-apexcharts";
import "./Home_card.css";
import Label from "../label/Label";
import { useNavigate } from "react-router-dom";

const Home_card = ({ project }) => {
  const navigate = useNavigate();

  var options = {
    show: true,

    chart: {
      // height: 100,
      type: "radialBar",
      padding: 0,
      margin: 0,
      animations: {
        enabled: false,
        easing: "easeout",
        speed: 100,
        animateGradually: {
          enabled: false,
          delay: 20,
        },
        dynamicAnimation: {
          enabled: false,
          speed: 20,
        },
      },
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          showOn: "always",
          name: {
            show: false,
          },
          value: {
            show: true,
            fontSize: "20px",
            fontFamily: "Lato",
            offsetY: 9,
            color: "var(--textcolor)",
            // formatter: function (val) {
            //   return val + '%'; // Format the value as a percentage
            // },
          },
          total: {
            show: false,
          },
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
      show: true,
      borderColor: "#000",
      strokeDashArray: 0,
      position: "front",
      xaxis: {
        lines: {
          show: true,
          offsetX: 10,
          offsetY: 10,
        },
      },
      yaxis: {
        lines: {
          show: true,
          offsetX: 10,
          offsetY: 10,
        },
      },
      row: {
        colors: "#000",
        opacity: 1,
      },
      column: {
        colors: "",
        opacity: 1,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };

  return (
    <div
      className="home_card justify-self-center "
      onClick={() => {
        navigate(`/projects/view/${project.id}`);
      }}
    >
      <div className="home_card-1">
        <div
          className="Projectcard_details-data_status-chart"
          style={{ width: "64px" }}
        >
          <ReactApexChart
            options={options}
            series={[project.progress]}
            type="radialBar"
            height="140px"
            width="140px"
          />
        </div>
        <div className="home_card-1_header">
          <h5>{project.title}</h5>
          <p>
            Start Date: &nbsp;{" "}
            <span style={{ color: "var(--blue" }}>{project.start}</span>
          </p>
          <Label text={project.status} />
        </div>
      </div>
      <div className="home_card-2">
        {/* <div className='d-flex'>
                            <Label text={project.status}/>
                            <p style={{fontSize:'14px'}}>
                            | {project.phases_count} 
                            Phases |{project.start}

                            </p>
                        </div> */}

        <div>
          <p>Deadline</p>
          <h6> {project.end} </h6>
        </div>

        <div>
          <p>Num of Phase</p>
          <h6> {project.phases_count} </h6>
        </div>
      </div>
    </div>
  );
};

export default Home_card;
