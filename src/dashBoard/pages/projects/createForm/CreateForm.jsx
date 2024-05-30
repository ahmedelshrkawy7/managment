import { useEffect, useRef, useState } from "react";
import "./CreateForm.css";
import Location from "../../../includes/location/Location";
import case1 from "../../../assets/Form/briefcase.svg";
import bin from "../../../assets/Form/fluent_delete-28-regular.svg";
import plus from "../../../assets/Form/icons.svg";
import camera from "../../../assets/Form/solar_camera-linear.svg";
import useAxios from "../../../api/Axios";
import logo1 from "../../../assets/Form/Frame 1171275978 1.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Addattachments from "../../../components/Addattachments/Addattachments";
import { useFormik } from "formik";
import { notify, error } from "../../../notifications/Toast";
import { Input, Textarea, Select } from "@chakra-ui/react";
import { MdKeyboardArrowDown } from "react-icons/md";

import * as Yup from "yup";
import Select_add from "../../../components/Select_add/Select_add";

const CreateForm = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const { getData, postData } = useAxios();
  const linkSchema = Yup.string().url("Invalid URL format");

  const validationSchema = Yup.object().shape({
    title: Yup.string("title shuold be string").required("required *"),
    start: Yup.string("start date shuold be string").required("required *"),
    end: Yup.string("deadline shuold be string").required("required *"),
    type: Yup.string("type shuold be string").required("required *"),
    status: Yup.string("type shuold be string").required("required *"),
    description: Yup.string("type shuold be string").required("required *"),

    links: Yup.array().min(1, "required").of(linkSchema),
    technologies: Yup.array().min(1, "required"),
  });
  const technologies_id = [];
  location?.state?.technologies.forEach((el) => {
    technologies_id.push(el.id);
  });

  const formik = useFormik({
    initialValues: {
      title: location?.state?.title,
      description: location?.state?.description,
      status: location?.state?.status,
      type: location?.state?.type,
      start: location?.state?.start,
      end: location?.state?.end,
      attachments: [],
      logo: "",
      links: location?.state?.links || [],
      technologies: [],
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values) => {
      if (location.state) {
        await editSubmit();
      } else {
        await handleSubmit();
        console.log("create");
      }
    },
  });
  console.log(formik.values);

  let [links, setLinks] = useState([]);
  let [technology, setTechnology] = useState([]);
  let [logoImage, setlogoImages] = useState();
  let [technologies, setTechnologies] = useState([]);

  let linkinput = useRef(0);
  let techinput = useRef(0);
  let logoImg = useRef(0);
  let submitBtn = useRef(0);

  const fetchPost = async () => {
    try {
      await getData(`/technologies`).then((res) => {
        setTechnologies(res?.Technologies);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
    formik.setFieldValue("technologies", technologies_id);
  }, []);

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

        case "tech":
          setTechnology((prev) => [...prev, str]);

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
      case "tech":
        setTechnology(
          technology.filter((word, index) => {
            return index1 !== index;
          })
        );
        formik.setFieldValue(
          "technologies",
          formik.values.technologies.filter((word, index) => {
            return index1 !== index;
          })
        );

        break;
      default:
        break;
    }
  };

  const editSubmit = async () => {
    await postData([
      `/projects/${location.state.id}`,
      { ...formik.values, _method: "PUT" },
    ])
      .then(function (response) {
        if (response.status === 200) {
          notify("Project Editied successfully");
          navigate("/Project List");
        }
      })
      .catch(function (response) {
        // console.log(response);
        error(response?.response?.data?.message);
      });
  };

  const handleSubmit = async () => {
    await postData([`/projects`, formik.values])
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          notify("Project added successfully");
          navigate("/Project List");
        }
      })
      .catch(function (response) {
        // console.log(response);
        error(response?.response?.data?.message);
        console.log("dfdsa");
      });
  };

  return (
    <>
      <Location
        main="Projects"
        head={location.state ? " Edit Project" : "Create Project"}
      />

      <div className="dash__form">
        <div className="dash__form-header">
          <img src={case1} alt="case" />
          <p style={{ color: "#fff" }}>
            {location.state ? " Edit Project" : "Create New Project"}
          </p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="sm:flex-col sm:items-center"
        >
          <div className="dash__form-logo ">
            <div className="dash__form-logo-img">
              <img src={logoImage || logo1} alt="logo" />
            </div>
            <div
              className="flex"
              style={{ gap: "10px" }}
              onClick={() => {
                logoImg.current.click();
              }}
            >
              <input
                name="logo"
                type="file"
                accept=".jpg, .jpeg, .png"
                hidden
                ref={logoImg}
                onChange={({ target: { files } }) => {
                  setlogoImages(URL.createObjectURL(files[0]));
                  formik.setFieldValue("logo", files[0]);
                }}
              />
              <img src={camera} alt="camera" style={{ width: "18px" }} />
              <p>Upload Logo</p>
            </div>
          </div>

          <div className="dash__form-content">
            <div className="dash__form-content_details grid w-full grid-cols-4 md:grid-cols-2 sm:grid-cols-1   gap-6">
              <div>
                <p>Project Name</p>
                <Input
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  placeholder="ERP"
                  isInvalid={formik.touched.title && formik.errors.title}
                />

                <span className="error">
                  {formik.touched.title && formik.errors.title}
                </span>
              </div>

              <div>
                <p>Start Date</p>
                <Input
                  name="start"
                  type="date"
                  value={formik.values.start}
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
                  value={formik.values.end}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.end && formik.errors.end}
                />
                <span className="error">
                  {formik.touched.end && formik.errors.end}
                </span>
              </div>
              <div>
                <p>Status</p>
                <Select
                  icon={<MdKeyboardArrowDown color="var(--blue)" />}
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.status && formik.errors.status}
                >
                  <option hidden selected>
                    -- Select Status --
                  </option>
                  <option>Completed</option>
                  <option>Delayed</option>
                  <option>In Progress</option>
                </Select>
                <span className="error">
                  {formik.touched.status && formik.errors.status}
                </span>
              </div>
              <div>
                <p>Project type</p>

                <Select
                  name="type"
                  onChange={formik.handleChange}
                  value={formik.values.type}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.type && formik.errors.type}
                >
                  <option selcted hidden>
                    -- select type --
                  </option>
                  <option>Product</option>
                  <option>Project</option>
                </Select>
                <span className="error">
                  {formik.touched.type && formik.errors.type}
                </span>
              </div>
              <div>
                <p>Project links</p>
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
                    name="links"
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.links && formik.errors.links}
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
              {formik?.values?.links && (
                <section className=" col-span-4 md:col-span-2 sm:col-span-1 gap-4 dash__form-content_links ">
                  {formik?.values?.links.map((link, index1) => {
                    return (
                      <div className="dash__form-content_links-link">
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
              <Select_add
                header="Technologies"
                name="technologies"
                formik={formik}
                options={technologies}
                oldValues={location?.state?.technologies_names}
              />

              {/* <div>
                <p>Technologies</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <Select type="url" name="technologies" ref={techinput} onBlur={formik.handleBlur} onChange={(e)=>{
                     push(e.target.value, "tech");
                     formik.setFieldValue("technologies", [
                       ...formik.values.technologies,
                       e.target.childNodes[e.target.selectedIndex].getAttribute("name")
                     ]);
                  }}
                   isInvalid={formik.touched.technologies && formik.errors.technologies}
                  >
                    <option selected hidden value="">
                      - select technology -
                    </option>
                    {technologies?.map((tech) => {
                      return (
                        <>
                          <option name={tech.id}>{tech.name}</option>
                        </>
                      );
                    })}
                  </Select>
                  <span className="error">{formik.touched.technologies && formik.errors.technologies}</span>

                 
                </div>
              </div>
              {technology[0] && (
                <div
                  className="col-span-4 md:col-span-2 sm:col-span-1 gap-4 dash__form-content_links"
                  style={{ width: "100%" }}
                >
                  {technology.map((tech, index1) => {
                    return (
                      <div className="dash__form-content_links-link">
                        <div className="dash__form-content_links-link-a">
                          <a target="blank">{tech}</a>
                        </div>
                        <div
                          className="dash__form-content_links-link-icon"
                          onClick={() => {
                            remove(index1, "tech");
                          }}
                        >
                          <img src={bin} alt="bin" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}*/}
            </div>

            <Addattachments
              fun={updateData}
              prevFiles={location?.state?.attachments}
            />

            <div className="dash__form-content_projdetails">
              <div className="dash__form-content_projdetails-header">
                <p>Project Details</p>
              </div>
              <div className="dash__form-content_projdetails-input">
                <Textarea
                  rows="4"
                  cols="50"
                  name="description"
                  placeholder="Type here"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  isInvalid={
                    formik.touched.description && formik.errors.description
                  }
                />
                <span className="error">
                  {formik.touched.description && formik.errors.description}
                </span>
              </div>
            </div>
          </div>
          <input type="submit" hidden ref={submitBtn} />
        </form>

        <div className="dash__form-confirm">
          <input
            type="submit"
            onClick={() => {
              submitBtn.current.click();
            }}
            value={location.state ? " Edit " : "Create "}
          />

          <Link to="/Project List"> Back</Link>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
