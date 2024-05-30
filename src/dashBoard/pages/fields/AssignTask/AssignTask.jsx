import { useEffect, useRef, useState, useContext } from "react";
import Location from "../../../includes/location/Location";
import case1 from "../../../assets/Form/briefcase.svg";
import bin from "../../../assets/Form/fluent_delete-28-regular.svg";
import plus from "../../../assets/Form/icons.svg";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import Selectinput from "../../../components/selectinput/Selectinput";
import Addattachments from "./../../../components/Addattachments/Addattachments";
import useAxios from "../../../api/Axios";
import { Input, Textarea, Select } from "@chakra-ui/react";
import * as Yup from "yup";
import LoadContext from "../../../components/loader/LoaderContext";
import { error, notify } from "../../../notifications/Toast";
import { IoIosArrowDown } from "react-icons/io";

const Assigntask = () => {
  const { id } = useParams();
  const { name } = useParams();
  const { setLoader } = useContext(LoadContext);
  const navigate = useNavigate();

  const linkSchema = Yup.string().url("Invalid URL format");

  const validationSchema = Yup.object().shape({
    title: Yup.string("shuold be string").required("required *"),
    start: Yup.string("shuold be string").required("required *"),
    end: Yup.string("shuold be string").required("required *"),
    links: Yup.array().min(1, "required").of(linkSchema),
    description: Yup.string("shuold be string").required("required *"),
    project_id: Yup.string("shuold be string").required("required *"),
    phase_id: Yup.string().required("required *"),
    employee_id: Yup.string().required("required *"),
    department: Yup.string().required("required *"),
    status: Yup.string().required("required *"),
    priority: Yup.string().required("required *"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
      start: "",
      end: "",
      project_id: "",
      phase_id: "",
      attachments: [],
      links: [],
      employee_id: "",
      department: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setLoader(true);
      handleSubmit();
    },
  });

  let [links, setLinks] = useState([]);
  let [technology, setTechnology] = useState([]);

  const [projects, setProjects] = useState([]);
  const [phases, setPhases] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [members, setMembers] = useState([]);
  const { getData, postData } = useAxios();

  let linkinput = useRef(0);
  let submitBtn = useRef(0);

  //  console.log(technologies)
  //  console.log(data);

  const fetchPost = async () => {
    const endpoints = ["projects", "ProjectPhases", "departments"];
    try {
      Promise.all(
        endpoints.map((endpoint) =>
          getData(`/${endpoint}`).catch((err) => {
            error(err.response.data.message);
          })
        )
      ).then(([{ allprojects }, { Phases }, { Departments }]) => {
        setProjects(allprojects);
        setPhases(Phases);
        setDepartments(Departments);
      });
    } catch (err) {
      error(err?.response.data.message);
    }
  };

  useEffect(() => {
    fetchPost();
    formik.setFieldValue("employee_id", id);
  }, []);

  console.log(formik?.values);

  const updateData = (Allattachments) => {
    formik.setFieldValue("attachments", Allattachments);
  };

  let push = (str, inputName) => {
    if (str !== "") {
      switch (inputName) {
        case "link":
          try {
            // Validate the link using the linkSchema
            if (linkSchema.validateSync(str)) {
              // If validation succeeds, update state and formik values
              formik.setFieldValue("links", [...formik.values.links, str]);
              setLinks((prev) => [...prev, str]);
              linkinput.current.value = "";
            }
          } catch (error) {
            // Handle validation error (invalid link)
            formik.setFieldError("links", error.message);
            // formik.setFieldTouched('links',true)
          }
          break;

        default:
          break;
      }
    }
  };

  let remove = (index1, inputName) => {
    switch (inputName) {
      case "link":
        setLinks(
          links.filter((word, index) => {
            return index1 !== index;
          })
        );
        formik.setFieldValue(
          "links",
          formik.values.links.filter((word, index) => {
            return index1 !== index;
          })
        );

        break;
    }
  };

  const handleSelect = (e, name) => {
    const index =
      e.target.childNodes[e.target.selectedIndex].getAttribute("name");

    formik.setFieldValue(name, index);
  };

  const handleSubmit = async () => {
    await postData([`/Phases/tasks`, formik.values])
      .then(function () {
        setLoader(false);
        notify("Task Added successfully");
        navigate("/Tasks List");
      })
      .catch(function (response) {
        setLoader(false);
        error(response.response.data.message);
      });
  };

  return (
    <>
      <Location main="Technology" head={` Assign New Task to ${name}`} />

      <div className="dash__form">
        <div className="dash__form-header">
          <img src={case1} alt="case" />
          <p style={{ color: "#fff" }}>Create Task</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="dash__form-content">
            <div className="dash__form-content_details grid w-full grid-cols-4 md:grid-cols-2 sm:grid-cols-1   gap-4">
              <div>
                <p>Task Title</p>
                <Input
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="New Task"
                  isInvalid={formik.touched.title && formik.errors.title}
                />
                <span className="error">
                  {formik.touched.title && formik.errors.title}
                </span>
              </div>

              <div>
                <Selectinput
                  name="project_id"
                  fun={handleSelect}
                  header="Project Name"
                  data={projects}
                  isInvalid={
                    formik.touched.project_id && formik.errors.project_id
                  }
                  onBlur={formik.handleBlur}
                />
              </div>

              <div>
                <Selectinput
                  name="phase_id"
                  fun={handleSelect}
                  header="Project Phase"
                  isInvalid={formik.touched.phase_id && formik.errors.phase_id}
                  onBlur={formik.handleBlur}
                  data={phases}
                />
              </div>

              <div>
                <p>Status</p>
                <Select
                  name="status"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.status && formik.errors.status}
                  iconColor="var(--blue)"
                  icon={<IoIosArrowDown />}
                >
                  <option selected hidden>
                    -- select status --
                  </option>
                  <option>Completed</option>
                  <option>In Progress</option>
                  <option>Delayed</option>
                </Select>
                <span className="error">
                  {formik.touched.status && formik.errors.status}
                </span>
              </div>

              <div>
                <p>Priority</p>
                <Select
                  name="priority"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.priority && formik.errors.priority}
                  iconColor="var(--blue)"
                  icon={<IoIosArrowDown />}
                >
                  <option selected hidden>
                    -- select priority --
                  </option>
                  <option>high</option>
                  <option>low</option>
                </Select>
                <span className="error">
                  {formik.touched.priority && formik.errors.priority}
                </span>
              </div>
              <div>
                <p>Start Date</p>
                <Input
                  name="start"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.start && formik.errors.start}
                />
                <span className="error">
                  {formik.touched.start && formik.errors.start}
                </span>
              </div>

              <div>
                <p>Deadline</p>
                <Input
                  name="end"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.end && formik.errors.end}
                />
                <span className="error">
                  {formik.touched.end && formik.errors.end}
                </span>
              </div>

              <div>
                <Selectinput
                  header="Department"
                  name="department"
                  fun={formik.handleChange}
                  data={departments}
                  isInvalid={
                    formik.touched.department && formik.errors.department
                  }
                  onBlur={formik.handleBlur}
                />
              </div>

              <div>
                <p>Task links</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <Input
                    ref={linkinput}
                    placeholder="www.link.com"
                    isInvalid={formik.touched.links && formik.errors.links}
                    name="links"
                    onBlur={formik.handleBlur}
                  />
                  <div
                    className="addLink"
                    onClick={() => {
                      push(linkinput.current.value, "link");
                    }}
                  >
                    <img src={plus} alt="addlink" />
                  </div>
                  <span className="error">
                    {formik.touched.links && formik.errors.links}
                  </span>
                </div>
              </div>

              {links[0] && (
                <section
                  className="dash__form-content_links col-span-4"
                  style={{ width: "100%" }}
                >
                  {links.map((link, index1) => {
                    return (
                      <div
                        className="dash__form-content_links-link"
                        key={index1}
                      >
                        <div className="dash__form-content_links-link-a">
                          <a href={link} target="blank">
                            {link}
                          </a>
                        </div>
                        <div
                          className="dash__form-content_links-link-icon"
                          onClick={() => {
                            remove(index1, "link");
                          }}
                        >
                          <img src={bin} alt="bin" />
                        </div>
                      </div>
                    );
                  })}
                </section>
              )}
            </div>

            <Addattachments fun={updateData} />

            <div className="dash__form-content_projdetails">
              <div className="dash__form-content_projdetails-header">
                <p>Task Details</p>
              </div>
              <div className="dash__form-content_projdetails-input">
                <Textarea
                  className="col-span-4"
                  rows="4"
                  cols="50"
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.description && formik.errors.description
                  }
                />
                {/* <input rows="4" cols="50" type='text'name='description' onBlur={handleChange} /> */}
                <span className="error">
                  {formik.touched.description && formik.errors.description}
                </span>
              </div>
            </div>
          </div>
          <button type="submit" hidden ref={submitBtn}></button>
        </form>

        <div className="dash__form-confirm">
          <Link
            onClick={() => {
              submitBtn.current.click();
            }}
          >
            create
          </Link>
          <Link>back</Link>
        </div>
      </div>
    </>
  );
};

export default Assigntask;
