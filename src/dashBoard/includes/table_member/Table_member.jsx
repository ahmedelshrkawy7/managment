import React, { useContext, useEffect, useState } from "react";
import eye from "../../assets/project/bi_eye.svg";
import pen from "../../assets/project/edit-2.svg";
import trash from "../../assets/project/trash.svg";
import setting from "../../assets/project/setting-2.svg";
import axios from "axios";
import { serverApi } from "../../../App";
import { Link, useNavigate } from "react-router-dom";
import useAxios, { Axios } from "../../api/Axios";
import { Task_view } from "../../routes/import";
import { error, notify } from "../../notifications/Toast";

const Table_member = ({ th, api, res_key, attributes }) => {
  const [data, setData] = useState([]);
  console.log("🚀 ~ data:", data);
  const [toggle, setToggle] = useState(false);
  const [task_index, setTask_index] = useState();
  const navigate = useNavigate();
  const {getData,deleteData} = useAxios()

  const fetchPost = async () => {
    try {
      await 
    
      getData(`/${api}`)
      .then((res) => {
        setData(res?.[res_key]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [api]);

  const togglefun = (id) => {
    setToggle(!toggle);
  };

  const handleDelete = async (id) => {
    await 
  
    deleteData(`Phases/tasks/${id}`)
      .then(() => {
        setData(
          data.filter((project, index) => {
            return project.id !== id;
          })
        );
        notify("Task was deleted Successfully ");
      })
      .catch((err) => {
        error(err.response.data.message);
      });
  };

  return (
    <div className="project_table">
      {!!data.length && (
        <table>
          <tr className="project_table-head">
            {th?.map((cell) => {
              return <th>{cell}</th>;
            })}

            <th>Actions</th>
          </tr>

          {data?.map((cell, index) => {
            return (
              <tr className="project_table-body">
                <td>{cell.title}</td>
                <td>{cell.start}</td>
                <td>{cell.priority} </td>
                <td>{cell.status} </td>
                <td>{cell.end}</td>
                <td style={{ display: "flex", justifyContent: "space-around" }}>
                  {" "}
                  <img
                    src={cell.employee.image}
                    alt="image"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                    }}
                  />{" "}
                  {cell.employee.first_name}&nbsp;{cell.employee.last_name}
                </td>

                <td className="project_table-body_icons">
                  <img
                    src={eye}
                    alt="eye"
                    onClick={() => {
                      setToggle(true);
                      setTask_index(index);
                    }}
                  />
                  <img src={pen} alt="eye" />
                  <img
                    src={trash}
                    alt="eye"
                    onClick={() => {
                      handleDelete(cell.id);
                    }}
                  />
                  {/* <img src={setting} alt='eye' onClick={()=>{navigate(`/projects/Phase/${cell.id}`)}}/> */}
                </td>
              </tr>
            );
          })}
        </table>
      )}

      {toggle && <Task_view fun={togglefun} task={data[task_index]} />}
    </div>
  );
};

export default Table_member;
