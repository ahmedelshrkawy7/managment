import React, { useEffect, useState } from "react";
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
  logo,
  Tasks,
  Dep,
  tech,
  admin,
} from "./imports";
import { Link, NavLink, useLocation } from "react-router-dom";
import SideMenu from "../../components/SidebarMenu/SideMenu";
import { PiDotOutlineFill } from "react-icons/pi";

const Nsidebar = ({ toggle, side }) => {
  const role = localStorage.getItem("Roles");
  console.log("🚀 ~ Nsidebar ~ role:", role);
  let arr = [];
  console.log(JSON.parse(role) === "admin");

  if (JSON.parse(role) === "admin") {
    arr = [
      { img: icon1, p: "Home", nav: "/" },
      { img: icon3, p: "My Tasks", nav: "Task Managment" },
      {
        img: icon2,
        p: "Projects",
        sub: [
          { name: "Project List", path: "Project List" },
          { name: "Create", path: "createproject" },
          { name: "Dashboard View", path: "Projects Dashboard" },
        ],
      },
      {
        img: Tasks,
        p: "Tasks",
        sub: [
          { name: "Tasks List", path: "Tasks List" },
          { name: "Create Task", path: "Create Task" },
        ],
      },
      {
        img: Dep,
        p: "Departments",

        sub: [
          { name: "Create", path: "createdep" },
          { name: "List", path: "deplist" },
        ],
      },
      {
        img: icon4,
        p: "Specializations",

        sub: [
          { name: "Create", path: "createsub" },
          { name: "List", path: "sublist" },
        ],
      },
      {
        img: tech,
        p: "Technologies",

        sub: [
          { name: "Create", path: "createtech" },
          { name: "List", path: "techlist" },
        ],
      },
      // {
      //   img: icon4,
      //   p: "Major",
      //   img2: arrowD,

      //   sub:[{name:'Departments'},{name:'Create Department'}]

      // },
      {
        img: icon5,
        p: "Employees",
        sub: [
          { name: "Teams", path: "teamlist" },
          { name: "Add employee", path: "createemployee" },
        ],
      },
      {
        img: admin,
        p: "Admins",
        sub: [
          { name: "Create", path: "createadmin" },
          { name: "List", path: "adminlist" },
        ],
      },
      {
        img: admin,
        p: "Web Services",
        sub: [{ name: "Create", path: "createservice" }],
      },
      {
        img: icon8,
        p: "Roles",
        nav: "role",
      },
      // {
      //   img: icon8,
      //   p: "Projects Management ",
      //   img2: arrowD,
      //   sub:[{name:'Projects Dashboard'},{name:'Task Managment'}],
      // },
      { img: icon6, p: "Settings", nav: "Settings" },
    ];
  } else {
    arr = [{ img: icon3, p: "My Tasks", nav: "Task Managment" }];
  }

  const [value, setValue] = useState([1]);
  const [active, setActive] = useState([]);
  const [parents, setParents] = useState([]);
  const location = useLocation();

  const actv = (index) => {
    setValue(() => {
      let ar = [];
      ar[index] = 1;
      return ar;
    });
    setActive([]);

    return value;
  };

  useEffect(() => {
    setParents(
      document.querySelectorAll(".dash__sidebar-content-icons .parent")
    );
    //   parents.forEach((elment) => {

    //   elment.classList.remove("active");
    // });
  }, []);

  // parents.forEach((elment) => {

  //   elment.classList.remove("active");
  // });

  return (
    <div className={`dash__sidebar ${side ? "" : "hide"}`}>
      <div className="dash__sidebar-container">
        <div
          className="arrow"
          onClick={() => {
            toggle();
          }}
        >
          <img src={arrowR} alt="arrow" />
        </div>

        <div className="dash__sidebar-content">
          <div className="dash__sidebar-content-logo">
            <img src={logo} alt="logo" />
            <div></div>
          </div>

          <div className="dash__sidebar-content-icons ">
            {arr.map((item, index) => {
              // parents.forEach((elment) => {
              //   elment.classList.remove("active");
              // });

              if (!!!item.nav) {
                parents[index]?.classList?.remove("active");
              }

              return (
                <SideMenu item={item} index={index} actv={actv} value={value}>
                  {item.sub && (
                    <ul>
                      {item.sub.map((element) => {
                        return (
                          <li className="flex items-center ml-8">
                            <PiDotOutlineFill size={25} />
                            <NavLink to={`/${element.path}`}>
                              {({ isActive }) => {
                                if (isActive) {
                                  parents[index]?.classList?.add("active");
                                }

                                return <span>{element.name}</span>;
                              }}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </SideMenu>
              );
            })}
          </div>
        </div>
        {/* <div className="dash__sidebar-card">
          <img src={icon7} alt="" />
          <div>
            <h2>Need help ?</h2>
            <p>Please check our docs</p>
          </div>
          <button>DOCUMENTATION</button>
        </div> */}
      </div>
    </div>
  );
};

export default Nsidebar;
