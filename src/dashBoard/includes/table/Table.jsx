import React, { useContext, useEffect, useState } from "react";
import eye from "../../assets/project/bi_eye.svg";
import pen from "../../assets/project/edit-2.svg";
import trash from "../../assets/project/trash.svg";
import setting from "../../assets/project/setting-2.svg";
import { Link, useNavigate } from "react-router-dom";
import useAxios, { Axios } from "../../api/Axios";
import Label from "../../components/label/Label";
import { error, notify } from "../../notifications/Toast";
import { No_member } from "../../routes/import";
import LoadContext from "../../components/loader/LoaderContext";

const Table = ({
  th,
  api,
  res_key,
  attributes,
  eye_route,
  trash_route,
  edit_route,
}) => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const { setLoader } = useContext(LoadContext);
  const { getData, deleteData } = useAxios();

  const fetchPost = async () => {
    try {
      const response = await getData(`/${api}`);
      setProjects(response[res_key]);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPost();
    setLoader(true);
  }, []);

  const handleDelete = async (id) => {
    await deleteData(`/${api}/${id}`)
      .then(() => {
        setProjects(
          projects.filter((project, index) => {
            return project.id !== id;
          })
        );
      })
      .catch((err) => {
        error(err.response.data.message);
      });
  };

  return (
    <>
      {projects.length ? (
        <div className="project_table">
          <table>
            <tr className="project_table-head">
              {th?.map((th) => {
                return <th>{th}</th>;
              })}
            </tr>

            {projects?.map((project, index) => {
              return (
                <tr className="project_table-body" key={""}>
                  <td style={{ fontWeight: "600" }}>
                    {project["title"]}
                    {project["name"]}
                  </td>

                  {attributes?.map((attribute) => {
                    return <td>{project[attribute]}</td>;
                  })}
                  {project["status"] && (
                    <td>
                      <Label text={project["status"]} />
                    </td>
                  )}

                  <td className="project_table-body_icons">
                    {eye_route && (
                      <img
                        src={eye}
                        alt="eye"
                        onClick={() => {
                          navigate(`${eye_route}/${project.id}`);
                        }}
                      />
                    )}
                    {edit_route && (
                      <img
                        src={pen}
                        alt="pen"
                        onClick={() => {
                          navigate(`/${edit_route}`, {
                            state: projects[index],
                          });
                        }}
                      />
                    )}
                    {trash_route && (
                      <img
                        src={trash}
                        alt="trash"
                        onClick={() => {
                          handleDelete(project.id);
                        }}
                      />
                    )}
                    {eye_route && (
                      <img
                        src={setting}
                        alt="setting"
                        onClick={() => {
                          if (trash_route) {
                            navigate(
                              `${trash_route}/${project.id}?project=${project.title}`
                            );
                          }
                        }}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </table>

          {/* <div className='dash__form-confirm'>
       <Link to ='/projects/projectlist'  type='submit' hidden>create</Link>
       <Link to ='/projects'>back</Link>
        
      </div> */}
        </div>
      ) : (
        <No_member />
      )}
    </>
  );
};

export default Table;
