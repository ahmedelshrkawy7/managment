import React, { Component, useEffect, useState } from "react";
// import './Special-list.css'
import Location from "../../../includes/location/Location";
import task from "../../../assets/fields/task.svg";
import pen from "../../../assets/fields/edit-2.svg";
import trash from "../../../assets/fields/trash.svg";
import { Link, useNavigate } from "react-router-dom";
import useAxios, { Axios } from "../../../api/Axios";
import Table from "../../../includes/table/Table";
import Header from "../../../components/Header/Header";
import Label from "../../../components/label/Label";
import { notify, error } from "../../../notifications/Toast";
import eye from "../../../assets/project/bi_eye.svg";

const Listadmin = () => {
  const th = ["Image", "Name", "Role", "Actions"];
  const attributes = ["specialization"];

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const { getData, postData, deleteData } = useAxios();

  const fetchPost = async () => {
    try {
      const response = await getData(`/users`);
      setProjects(response["users"]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleDelete = async (id) => {
    await //  Axios({
    //   method: "Delete",
    //   url:,
    // })
    deleteData(`/users/${id}`)
      .then(() => {
        setProjects(
          projects.filter((project, index) => {
            return project.id !== id;
          })
        );
        notify("Deleted successfully");
      })
      .catch((err) => {
        error(err.response.data.message);
      });
  };

  return (
    <>
      <Location main="Admin" head="Admin List" />
      <div className="dash__form">
        <div className="project_table">
          <table>
            <tr className="project_table-head">
              {th?.map((th) => {
                return <th>{th}</th>;
              })}
            </tr>

            {projects?.map((project) => {
              const role = project?.roles?.reduce((acc, current) => {
                return acc + "," + current;
              });

              return (
                <tr className="project_table-body">
                  <td style={{ fontWeight: "600" }}>
                    <img
                      className="rounded-full"
                      style={{ height: "30px", width: "30px" }}
                      src={project.image}
                      alt="imdage"
                    />
                  </td>
                  <td>
                    {project["title"]}
                    {project["name"]}
                  </td>
                  <td>{role}</td>

                  <td className="project_table-body_icons">
                    {/* <img src={pen} alt="pen" /> */}
                    <img
                      src={trash}
                      alt="trash"
                      onClick={() => {
                        handleDelete(project.id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>

        <div className="dash__form-confirm">
          <Link hidden></Link>
          {/* <Link to='/tech'>back</Link> */}
        </div>
      </div>
    </>
  );
};

export default Listadmin;
