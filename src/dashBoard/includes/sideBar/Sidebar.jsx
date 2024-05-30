import React, { useRef, useState } from "react";
import "./Sidebar.css";
import {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  arrowR,
  arrowD,
  logo,
} from "./imports";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ toggle, side }) => {
  let arr = [
    { img: icon1, p: "Home", nav: "" },
    {
      img: icon4,
      p: "Major",
      img2: arrowD,
      sub1: "Departments",
      sub2: "Create Department",
    },
    {
      img: icon5,
      p: "Teams",
      img2: arrowD,
      sub1: "Teams",
      sub2: "Add employee",
    },
    {
      img: icon2,
      p: "Projects",
      img2: arrowD,
      sub1: "Project List",
      sub2: "Create Project",
    },
    {
      img: icon8,
      p: "Projects Management ",
      img2: arrowD,
      sub1: "Projects Dashboard",
      sub2: "Task Managment",
    },
    {
      img: icon3,
      p: "Tasks",
      img2: arrowD,
      sub1: "Tasks List",
      sub2: "Create Task",
    },
    { img: icon6, p: "Settings", nav: "Settings" },
  ];

  const [value, setValue] = useState([1]);
  const [active, setActive] = useState([]);

  const location = useLocation();

  return (
    <div className={`dash__sidebar ${side ? "" : "hide"}`}>
      <div className="dash__sidebar-container">
        {/* <div className='arrow' onClick={()=>{(toggle())}}><img src={arrowR} alt='arrow'/></div> */}

        <div className="dash__sidebar-content">
          <div className="dash__sidebar-content-logo">
            <img src={logo} alt="logo" />
            <div></div>
          </div>
          <div className="dash__sidebar-content-icons ">
            {arr.map((item, index) => {
              return (
                <>
                  <Link
                    to={item.nav}
                    className={value[index] ? "active" : ""}
                    onClick={() => {
                      setValue(() => {
                        let ar = [];
                        ar[index] = 1;
                        return ar;
                      });
                      setActive([]);
                    }}
                    key={item.index}
                  >
                    <div className="image">
                     
                      <img src={item.img} alt="" />
                    </div>
                    <p> {item.p} </p>
                    <img
                      src={item.img2 ? item.img2 : ""}
                      alt=""
                      style={{ marginTop: "7px" }}
                    />
                  </Link>
                  <div className={value[index] && item.sub1 ? "sub" : "hide"}>
                    {item.sub1 && (
                      <div
                        className={active[0] ? "active1" : ""}
                        onClick={() => {
                          setActive([1, 0]);
                        }}
                      >
                        <Link to={item.sub1}>{item.sub1}</Link>
                      </div>
                    )}
                    {item.sub2 && (
                      <div
                        className={active[1] ? "active1" : ""}
                        onClick={() => {
                          setActive([0, 1]);
                        }}
                      >
                        <Link to={item.sub2}>{item.sub2}</Link>
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="dash__sidebar-card">
          <img src={icon7} alt="" />
          <div>
            <h2>Need help ?</h2>
            <p>Please check our docs</p>
          </div>
          <button>DOCUMENTATION</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
