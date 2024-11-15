import React, { useEffect, useRef, useState, useContext } from "react";
import Location from "../../../includes/location/Location";
import case1 from "../../../assets/Form/briefcase.svg";
import bin from "../../../assets/Form/fluent_delete-28-regular.svg";
import upload from "../../../assets/Form/documentupload.svg";
import plus from "../../../assets/Form/icons.svg";
import camera from "../../../assets/Form/solar_camera-linear.svg";
import trash from "../../../assets/Form/trash.svg";
import material from "../../../assets/Form/material-symbols_zoom-out-map-rounded.svg";
import logo1 from "../../../assets/Form/Frame 1171275978 1.svg";
import pdf from "../../../assets/Form/pdf.svg";
import p from "../../../assets/project/svgexport-18 1.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Selectinput from "../../../components/selectinput/Selectinput";
import Addattachments from "./../../../components/Addattachments/Addattachments";
import useAxios from "../../../api/Axios";
import {
  Input,
  Textarea,
  Select,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Accordion,
} from "@chakra-ui/react";
import * as Yup from "yup";
import LoadContext from "../../../components/loader/LoaderContext";
import { error, notify } from "../../../notifications/Toast";
import { IoIosArrowDown } from "react-icons/io";

const Create_task = () => {
  const { setLoader } = useContext(LoadContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("🚀 ~ state:", state);
  const { getData, postData } = useAxios();
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
    // department: Yup.string().required("required *"),
    status: Yup.string().required("required *"),
    priority: Yup.string().required("required *"),
  });

  const formik = useFormik({
    initialValues: {
      title: state?.title,
      description: state?.description,
      status: state?.status,
      priority: state?.priority,
      start: state?.start,
      end: state?.end,
      project_id: state?.project?.id,
      phase_id: state?.phase_id,
      attachments: [],
      links: state?.links || [],
      employee_id: state?.employee?.id,
      department: "",
      usecase: "",
      testcase: "",
      use_cases: [],
      uiScreens: [],
    },
    validationSchema: validationSchema,

    onSubmit: () => {
      setLoader(true);
      handleSubmit();
    },
  });

  console.log(formik.values);

  let [links, setLinks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [phases, setPhases] = useState([]);
  // const [departments, setDepartments] = useState([]);
  const [members, setMembers] = useState([]);
  const [testcase, setTestcase] = useState("");
  const [spinner, setSpinner] = useState(false);

  const [testObj, setTestObj] = useState({});

  let [images, setImages] = useState([]);
  let [scaleimg, setScaleimg] = useState();

  let fileInput = useRef(0);
  let linkinput = useRef(0);
  let submitBtn = useRef(0);

  //  console.log(technologies)
  //  console.log(data);

  const fetchPost = async () => {
    const endpoints = ["projects"];
    try {
      Promise.all(
        endpoints.map((endpoint) =>
          getData(`/${endpoint}`).catch((err) => {
            error(err.response.data.message);
          })
        )
      ).then(([{ allprojects }]) => {
        setProjects(allprojects);
        // setDepartments(Departments);
      });
    } catch (err) {
      error(err?.response.data.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const result = [];

  useEffect(() => {
    Object.entries(testObj).forEach(([key, value]) => {
      const obj = {
        name: key,
        test_cases: value,
      };
      result.push(obj);
      formik.setFieldValue("use_cases", result);
    });
  }, [testObj]);

  useEffect(() => {
    if (!!formik?.values?.project_id) {
      getData(`/Phases/${formik.values.project_id}`)
        .then((res) => {
          setPhases(res?.Phases);
          setMembers([]);
          if (!state) {
            formik.setFieldValue("phase_id", "");
          }
        })
        .catch((err) => {
          error(err);
        })
        .finally(() => setSpinner(false));
    }
  }, [formik?.values?.project_id]);

  useEffect(() => {
    if (!!formik?.values?.phase_id) {
      getData(`ProjectPhases/${formik?.values?.phase_id}`).then((res) => {
        setMembers(res?.Employees);

        //  setPhases(res?.data?.data?.Phases);
        console.log("res?.data?.data");
      });
    }
  }, [formik?.values?.phase_id]);

  // useEffect(() => {
  //   Axios.get('/ProjectPhases').then((res)=>  setPhases(res?.response?.phases?.data?.Phases) )

  // }, [formik.values.project_id]);

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
      case "test":
        // formik.setFieldValue('technologies',  formik.values.technologies.filter(( word ,index)=>{return (index1 !== index)})  )

        break;
      default:
        break;
    }
  };

  const handleSelect = (e, name) => {
    const index =
      e.target.childNodes[e.target.selectedIndex].getAttribute("name");

    formik.setFieldValue(name, index);
  };

  const handleSubmit = async () => {
    console.log(formik.values);

    // const { testcase, usecase, ...formData } = formik.values;
    if (!state) {
      await postData([`/Phases/tasks`, formik.values]).then(function () {
        setLoader(false);
        notify("Task Added successfully");
        navigate("/Tasks List");
      });
    } else {
      await postData([`/Phases/tasks/${state.id}`, formik.values]).then(
        function () {
          setLoader(false);
          notify("Task Updated successfully");
          navigate("/Tasks List");
        }
      );
    }

    // .catch(function (response) {
    //   console.log(response);
    //   setLoader(false);
    //   error(response.response.data.message);
    // });
  };

  let addAttach = ({ target: { files } }) => {
    for (let i of files) {
      setImages((prev) => [...prev, URL.createObjectURL(i)]);
      formik.setFieldValue("uiScreens", [...formik.values.uiScreens, i]);
    }
  };

  let removeAttach = (index2) => {
    setImages(
      images.filter((word, index) => {
        return index2 !== index;
      })
    );
    formik.setFieldValue("uiScreens", [
      formik.values.uiScreens.filter((attach, index) => {
        return index2 !== index;
      }),
    ]);
  };

  return (
    <>
      <Location
        main="Technology"
        head={state ? `Edit Task ${state.title}` : " Assign New Task"}
      />

      <div className="dash__form">
        <form
          onSubmit={formik.handleSubmit}
          className="flex-col"
          style={{ padding: "0" }}
        >
          <div className="dash__form-header">
            <img src={case1} alt="case" />
            <p style={{ color: "#fff" }}>
              {state ? `Edit Task ${state.title}` : "Create Task"}
            </p>
          </div>
          <div className="dash__form-content px-6">
            <div className="dash__form-content_details grid w-full grid-cols-4 md:grid-cols-2 sm:grid-cols-1   gap-4">
              <div>
                <p>Task Title</p>
                <Input
                  name="title"
                  type="text"
                  value={formik.values.title}
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
                  value={formik.values["project name"]}
                  data={projects}
                  isInvalid={
                    formik.touched.project_id && formik.errors.project_id
                  }
                  onBlur={formik.handleBlur}
                  selectedOpt={state?.project?.id}
                />
              </div>

              <div>
                <Selectinput
                  name="phase_id"
                  fun={handleSelect}
                  // value={formik.values.phase_name}
                  header="Project Phase"
                  isInvalid={formik.touched.phase_id && formik.errors.phase_id}
                  onBlur={formik.handleBlur}
                  data={phases}
                  selectedOpt={state?.phase_id}
                />
              </div>

              <div>
                <p>Status</p>
                <Select
                  name="status"
                  onChange={formik.handleChange}
                  value={formik.values.status}
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
                {/* <p>Priority</p>
                <Select
                  name="priority"
                  onChange={formik.handleChange}
                  value={formik.values.priority}
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
                </span> */}
                <Selectinput
                  header="Priority"
                  name="priority"
                  fun={formik.handleChange}
                  data={[
                    { id: 0, name: "high" },
                    { id: 1, name: "low" },
                    { id: 2, name: "medium" },
                  ]}
                  isInvalid={formik.touched.priority && formik.errors.priority}
                  onBlur={formik.handleBlur}
                  selectedOpt={0}
                />
              </div>
              <div>
                <p>Start Date</p>
                <Input
                  name="start"
                  value={formik.values.start}
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
                  value={formik.values.end}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.end && formik.errors.end}
                />
                <span className="error">
                  {formik.touched.end && formik.errors.end}
                </span>
              </div>

              {/* <div>
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
              </div> */}
              <div>
                <Selectinput
                  header="Member"
                  name="employee_id"
                  fun={handleSelect}
                  data={members}
                  isInvalid={
                    formik.touched.employee_id && formik.errors.employee_id
                  }
                  onBlur={formik.handleBlur}
                  selectedOpt={state?.employee?.id}
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
              {formik?.values?.links[0] && (
                <div
                  className="dash__form-content_links col-span-4 grid grid-cols-4"
                  style={{ width: "100%" }}
                >
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
                </div>
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
                  value={formik.values.description}
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
          <div className="dash__form-header">
            <img src={case1} alt="case" />
            <p style={{ color: "#fff" }}>
              {state ? `Edit Task ${state.title}` : "Testing"}
            </p>
          </div>
          <div className="dash__form-content px-6">
            <div className="dash__form-content_projdetails">
              <div className="dash__form-content_projdetails-header">
                <p>Use Case</p>
              </div>
              <div className="dash__form-content_projdetails-input">
                <Textarea
                  className="col-span-4"
                  rows="4"
                  cols="50"
                  name="usecase"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // value={formik.values.description}
                  isInvalid={formik.touched.usecase && formik.errors.usecase}
                />
                {/* <input rows="4" cols="50" type='text'name='description' onBlur={handleChange} /> */}
                <span className="error">
                  {formik.touched.usecase && formik.errors.usecase}
                </span>
              </div>
            </div>
            <div className="dash__form-content_projdetails">
              <div className="dash__form-content_projdetails-header">
                <p>Test Case</p>
              </div>
              <div className="dash__form-content_projdetails-input">
                <Textarea
                  className="col-span-4"
                  rows="4"
                  cols="50"
                  name="testcase"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.testcase}
                  isInvalid={formik.touched.testcase && formik.errors.testcase}
                />
                {/* <input rows="4" cols="50" type='text'name='description' onBlur={handleChange} /> */}
                <span className="error">
                  {formik.touched.testcase && formik.errors.testcase}
                </span>
              </div>
            </div>
            <div className="dash__form-confirm">
              <input
                disabled={!formik.values.usecase || !formik.values.testcase}
                value="Add"
                onClick={() => {
                  setTestObj({
                    ...testObj,
                    [formik.values.usecase]: [
                      ...(testObj[formik.values.usecase] || []),
                      formik.values.testcase,
                    ],
                  });

                  formik.values.testcase = "";
                }}
              />
            </div>
            <div className="w-full">
              {Object.keys(testObj).map((usecase) => {
                return (
                  <>
                    <div className="w-full min-w-10 p-2 flex justify-center items-center  mt-8 border-blue-500 border-2 rounded-2xl relative  ">
                      <h2 className="text-lg w-full">{usecase}</h2>
                      <div
                        className="absolute bg-blue-500 w-full h-full  justify-center items-center rounded-2xl hidden"
                        onClick={() => {
                          setTestObj((prev) => {
                            let objN = { ...prev };
                            delete objN[usecase];
                            return objN;
                          });
                        }}
                      >
                        <img src={bin} alt="bin" />
                      </div>
                    </div>
                    {testObj[usecase].map((test, index1) => {
                      return (
                        <div className="w-full  bg-blue-50 flex justify-start items-center  my-4 rounded-2xl">
                          <Accordion allowToggle className="w-full rounded-2xl">
                            <AccordionItem className="rounded-2xl w-full ">
                              <Box
                                as="span"
                                flex="1"
                                textAlign="left"
                                className="h-full w-full"
                              >
                                <h2 className="w-full h-full p-6">{test}</h2>
                              </Box>
                            </AccordionItem>
                          </Accordion>
                          <div
                            className="dash__form-content_links-link-icon w-15 h-15"
                            onClick={() => {
                              setTestObj({
                                ...testObj,
                                [usecase]: testObj[usecase].filter(
                                  (word, index) => {
                                    return index1 !== index;
                                  }
                                ),
                              });
                            }}
                          >
                            <img src={bin} alt="bin" />
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            <div className="dash__form-content_attach">
              <div className="dash__form-content_attach-header">
                <p>UI Screens</p>
              </div>
              <div
                className="dash__form-content_attach_upload flex"
                style={{
                  gap: "25px",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  className="dash__form-content_attach_upload-card"
                  onClick={() => {
                    fileInput.current.click();
                  }}
                >
                  <img src={upload} alt="upload" />
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    ref={fileInput}
                    onChange={(e) => addAttach(e)}
                    multiple
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Uploading Images
                  </button>
                </div>
                {/* <div className='dash__form-content_attach_upload-images flex 'style={{gap:'10px',width:'100%' , height:'100%' ,flexWrap:'wrap' */}

                {images.map((word, index) => {
                  return (
                    <div
                      className="dash__form-content_attach_upload-image"
                      key={index}
                    >
                      <div className="dash__form-content_attach_upload-image_file">
                        <img src={images[index]} alt="attach img" />
                      </div>

                      <div className="dash__form-content_attach_upload-image_hover">
                        <img
                          src={material}
                          alt="material"
                          onClick={() => {
                            setScaleimg(images[index]);
                          }}
                        />
                        <img
                          src={trash}
                          alt="trash"
                          onClick={() => {
                            removeAttach(index);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}

                {scaleimg && (
                  <div
                    className="imageScaled"
                    onClick={() => {
                      setScaleimg();
                    }}
                  >
                    <img src={scaleimg} alt="img" />
                  </div>
                )}

                {/* </div> */}
              </div>
            </div>
          </div>

          <button type="submit" hidden ref={submitBtn}></button>
        </form>

        <div className="dash__form-confirm">
          <input
            onClick={() => {
              submitBtn.current.click();
            }}
            value={state ? "Edit" : "Create"}
          />

          {/* <Link>back</Link> */}
        </div>
      </div>
    </>
  );
};

export default Create_task;
