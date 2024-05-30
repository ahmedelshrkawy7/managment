import React, { useState } from "react";
import Label from "../label/Label";
import "./Nprojectcard.css";

export const Nprojectcard = ({ project, index, pro_id, active }) => {
  return (
    <div
      className={`task_home-projects-cards_card ${
        active === project.id ? "pro_active" : ""
      } `}
      onClick={() => {
        pro_id(project.id);
      }}
    >
      <div className="task_home-projects-cards_card-1">
        <div className="task_home-projects-cards_card-img rounded-full">
          <img src={project.logo} alt="img" />
        </div>
        <div className="d-flex flex-column w-full">
          <div className="task_home-projects-cards_card-name">
            <h3>{project.title}</h3>
            <Label text={project.status} active={ active === project.id} />
          </div>
          <p style={{ fontSize: "14px" }}>
           
            <span
              className="blue font-weight-bold"
              style={{ fontSize: "16px" }}
            >
              {project.phases_count} &nbsp;
            </span>
            Phases
          </p>
        </div>
        {/* <div><p>{project.end}</p></div> */}
      </div>

      <div className="d-flex flex-col justify-between w-full  ">
        {/* <p style={{fontSize:'14px'}}>
            | {project.phases_count} 
            Phases |{project.start}

            </p> */}
        <div className="flex justify-between">
          <span> Start Date :</span>
          <p>{project.start}</p>
        </div>

        <div className="flex justify-between">
          <span> Deadline :</span>
          <p className="blue" style={{ fontWeight: "600" }}>
            {project.end}
          </p>
        </div>
      </div>

      <div className="task_home-projects-cards_card-2">
        <h2>Progress :{project.progress}%</h2>
        <progress
          value={project.progress}
          max="100"
          style={{ heigth: "30px" }}
        ></progress>
      </div>
    </div>
  );
};
