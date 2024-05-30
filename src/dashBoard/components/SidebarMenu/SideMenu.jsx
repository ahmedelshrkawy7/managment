import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const SideMenu = ({ item, index, actv, value, children }) => {
  const [active, setActive] = useState([]);
  const [collapse, setCollapse] = useState(false);

  const location = useLocation();


  return (
    <>
      <NavLink
        to={item.nav}
        className="parent"
        // className={value[index] ? "active" : ""}
        // className={({isActive})=> isActive ? 'active' : ''}
        // style={({isActive})=> console.log(isActive) }
        onClick={() => {
          setCollapse(!collapse);
        }}
        key={item.index}
      >
        <div className="image">
          <img src={item.img} alt="" />
        </div>
        <p> {item.p} </p>

        {item.sub ? collapse ? <IoIosArrowUp  color="var(--blue)"  /> : <IoIosArrowDown color="var(--blue)" /> : <></>}
      </NavLink>

      {collapse && children   }

      {/* <div className={value[index] && item.sub1 ? "sub" : "hide"}>
                    {item.sub1 && (
                      <div
                        className={active[0] ? "active1" : ""}
                        onClick={() => {
                          setActive([1, 0]);
                        }}
                      >
                        <NavLink to={item.sub1}>{item.sub1}</NavLink>
                      </div>
                    )}
                    {item.sub2 && (
                      <div
                        className={active[1] ? "active1" : ""}
                        onClick={() => {
                          setActive([0, 1]);
                        }}
                      >
                        <NavLink to={item.sub2}>{item.sub2}</NavLink>
                      </div>
                    )}
                  </div> */}
    </>
  );
};

export default SideMenu;
