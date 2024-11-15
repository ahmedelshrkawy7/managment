import React, { useEffect, useState, useContext } from "react";
import "./Member_details.css";
import { IoMdClose } from "react-icons/io";
import person from "../../../assets/teams/Imagem.png";
import projects from "../../../assets/teams/eos-icons_project-outlined.svg";
import position from "../../../assets/teams/uil_bag-alt.svg";
import fields from "../../../assets/teams/mingcute_department-line.svg";
import experience from "../../../assets/teams/streamline_interface-favorite-star-reward-rating-rate-social-star-media-favorite-like-stars.svg";
import gender from "../../../assets/teams/ph_gender-male-light.svg";
import email from "../../../assets/teams/mdi-light_email.svg";
import hours from "../../../assets/teams/prime_stopwatch.svg";
import salary from "../../../assets/teams/material-symbols_attach-money.svg";
import phone from "../../../assets/teams/solar_phone-outline.svg";
import useAxios from "../../../api/Axios";
import { useNavigate } from "react-router-dom";
import pen from "../../../assets/project/edit-2.svg";
import trash from "../../../assets/project/trash.svg";
import { notify, error } from "../../../notifications/Toast";

const Member_details = ({ toggle, employeeId, handleDelete }) => {
  const [employee, setEmployee] = useState([]);
  console.log("🚀 ~ employee:", employee?.projects);
  console.log(employee);
  const [id, setid] = useState([]);
  const navigate = useNavigate();
  const { getData, postData } = useAxios();

  const fetchEmployee = async () => {
    try {
      await getData(`/employees/${employeeId}`).then((res) => {
        setEmployee(res?.employee);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  return (
    <>
      {
        <div className="dash__member-details">
          <div className="member_details ">
            <div className="member_details-header h-10 ">
              <h3>Member Information</h3>
              <IoMdClose
                size={22}
                onClick={() => {
                  toggle(false);
                }}
              />
            </div>
            <div className="member_details-content h-full">
              <div className="member_details-content-name">
                <img src={employee?.image} alt="person" />
                <div className="flex w-full justify-center gap-4 employee_edit">
                  <img
                    src={pen}
                    alt="person"
                    onClick={() => {
                      navigate(`/createemployee`, { state: employee });
                    }}
                  />
                  <img
                    src={trash}
                    alt="person"
                    onClick={() => {
                      handleDelete(employee.id);
                    }}
                  />
                </div>

                <h4>
                  {employee?.first_name} &nbsp;{employee.last_name}
                </h4>
                <p>
                  {employee.technologies && employee?.technologies[0]?.name}
                </p>
                <p>{employee?.governorate?.governorate}</p>
              </div>
              <hr />
              <div className="member_details-content-general">
                <h4>General Information</h4>
                <div className="flex gap-1 w-full">
                  <img src={projects} alt="projects" />
                  <h3>Projects:</h3>
                  {/* <p>{!!employee && employee?.projects[0]}</p> */}
                  {employee?.projects && employee.projects[0]}
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex gap-1">
                    <img src={position} alt="projects" />
                    <h3>Position:</h3>
                    <p>{employee?.position}</p>
                  </div>
                  <div className="flex gap-1">
                    <img src={fields} alt="projects" />
                    <h3>field:</h3>
                    <p>
                      {employee.technologies && employee?.technologies[0]?.name}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex" style={{ gap: "5px" }}>
                    <img src={experience} alt="projects" />
                    <h3>Experience:</h3>
                    <p>{employee.experience}</p>
                  </div>
                  <div className="flex gap-1">
                    <img src={gender} alt="projects" />
                    <h3>Gender:</h3>
                    <p>{employee?.gender?.gender}</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="member_details-content-personal">
                <h4>Person Information</h4>
                <div className="flex gap-1 w-full">
                  <img src={email} alt="projects" />
                  <h3>Email:</h3>
                  <p>{employee.email}</p>
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex gap-1">
                    <img src={hours} alt="projects" />
                    <h3>Work Hours:</h3>
                    <p>{employee.workhours}</p>
                  </div>
                  <div className="flex gap-1">
                    <img src={salary} alt="projects" />
                    <h3>Salary:</h3>
                    <p>{employee.salary}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <img src={phone} alt="projects" />
                  <h3>Phone:</h3>
                  <p>{employee.mobile && employee.mobile[0]}</p>
                </div>
              </div>
            </div>
            <div className="member_details-btn">
              <button
                type="button"
                onClick={() => {
                  navigate(`/member_Alldetails/${employee.id}`, {
                    state: employee,
                  });
                }}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Member_details;
