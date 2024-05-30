import React, { useContext, useEffect, useState } from "react";
import Location from "../../../includes/location/Location";
import eye from "../../../assets/project/bi_eye.svg";
import pen from "../../../assets/project/edit-2.svg";
import trash from "../../../assets/project/trash.svg";
import setting from "../../../assets/project/setting-2.svg";
import task from "../../../assets/project/task.svg";
import plus from "../../../assets/Form/icons.svg";
import Label from "../../../components/label/Label";
import "./Viewtask_list.css";
import { serverApi } from "../../../../App";
import { Link, useNavigate } from "react-router-dom";
import useAxios, { Axios } from "../../../api/Axios";
import LoadContext from "../../../components/loader/LoaderContext";
import { error, notify } from "../../../notifications/Toast";
import No_member from "../../teams/noMember/No_member";

const Viewtask_list = () => {
  const { setLoader } = useContext(LoadContext);

  const [projects, setProjects] = useState([]);
  const {getData,deleteData} = useAxios()

  const fetchPost = async () => {
    try {
      await
    
      getData(`/tasks`)
      .then((response) => {
        setProjects(response?.tasks);
        setLoader(false);
      });
    } catch (err) {
      console.log(err);
      error(err.response.data.message);
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    fetchPost();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await
  
    deleteData(`Phases/tasks/${id}`)
      .then(() => {
        setProjects(
          projects.filter((project, index) => {
            return project.id !== id;
          })
        );
        notify("Task was deleted Successfully ");
      })
      .catch((err) => {
        error(err.response.data.message);
      });
  };
  console.log(projects);

  return (
    <>
      <Location head="Task List" main="Tasks" />

      {projects.length ? (
        <div className="project_table">
          <table>
            <tr className="project_table-head">
              <th>Task Title</th>
              <th>Project name</th>
              <th>Project Phase</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Member</th>
              <th>Actions</th>
            </tr>

            {projects?.map((project) => {
              return (
                <tr className="project_table-body">
                  <td>{project.title} </td>
                  <td>{project["project name"]}</td>
                  <td>{project.phase_name}</td>
                  <td>
                    <Label text={project.status} />{" "}
                  </td>
                  <td>
                    <Label text={project.priority} />
                  </td>
                  <td
                    className="member_img"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    {" "}
                    <img
                      src={project?.employee?.image}
                      alt="image"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                      }}
                    />{" "}
                    {project.employee?.first_name}&nbsp;
                    {project.employee?.last_name}
                  </td>
                  <td className="project_table-body_icons">
                    <img
                      src={eye}
                      alt="eye"
                      onClick={() => {
                        navigate(`/Task Management/list/view/${project.id}`);
                      }}
                    />
                    <img
                      src={pen}
                      alt="eye"
                      onClick={() => {
                        navigate("/Create Task", { state: project });
                      }}
                    />
                    <img
                      src={trash}
                      alt="eye"
                      onClick={() => {
                        handleDelete(project.id);
                      }}
                    />
                    {/* <img src={setting} alt='eye' /> */}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : (
        <No_member />
      )}
      <div className="dash__form-confirm">
        <Link to="/projects/projectlist" type="submit" hidden>
          Create
        </Link>
        <Link to="/projects" hidden>
          Back
        </Link>
      </div>
    </>
  );
};

export default Viewtask_list;
