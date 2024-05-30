import * as Yup from "yup";
import { useEffect, useRef, useState, useContext } from "react";
import Location from "../../../includes/location/Location";
import case1 from "../../../assets/Form/briefcase.svg";

import useAxios, { Axios } from "../../../api/Axios";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Addinput from "../../../components/Addinput/Addinput";
import Selectinput from "../../../components/selectinput/Selectinput";
import { IoIosClose } from "react-icons/io";
import Addattchments from "../../../components/Addattachments/Addattachments";
import { Input, Select, Textarea } from "@chakra-ui/react";
import { useFormik } from "formik";
import { notify } from "../../../notifications/Toast";

// title: '',
// start:'',
// end:'',
// status:'',
// priority:'',
// attachments:[],
// target:[],
// project_teams:[]

const Newphase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [search] = useSearchParams();

  let [links, setLinks] = useState([]);
  let [technology, setTechnology] = useState([]);
  let [images, setImages] = useState([]);
  let [docs, setDocs] = useState([]);
  let [docfiles, setDocfiles] = useState([]);
  let [Attachments, setAttachments] = useState([]);
  let [allattachments, setAllattachments] = useState([]);
  let [departments, setDepartments] = useState([]);
  let [selectedDep, setSelectedDep] = useState([]);
  let [depIndex, setDepIndex] = useState([1]);
  let [subdepartments, setSubdepartments] = useState([]);
  let [employees, setEmployees] = useState([]);
  let [obj_view, setObj_view] = useState({});
  let [obj_api, setObj_api] = useState({});
  const { getData } = useAxios();

  let submitBtn = useRef(0);

  let [data, setData] = useState({
    title: "",
    description: "",
    status: "On going",
    start: "",
    end: "",
    attachments: [],
    links: [],
    project_teams: [],
  });

  const updateData = (Allattachments) => {
    formik.setFieldValue("attachments", Allattachments);
  };

  const updateArray = (array, name) => {
    formik.setFieldValue(name, array);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  let index;

  const handleSelect = (e, name, id) => {
    switch (name) {
      case "department_id":
        setEmployees([]);
        index =
          e.target.childNodes[e.target.selectedIndex].getAttribute("name");
        // setDepIndex(e.target.selectedIndex +1);
        handleParam(index);
        setSelectedDep(e.target.value);
        setObj_view((prev) => {
          return { ...prev, [e.target.value]: prev[e.target.value] || [] };
        });
        setObj_api((prev) => {
          return { ...prev, [name]: index };
        });
        break;

      case "subdepartment_id":
        index =
          e.target.childNodes[e.target.selectedIndex].getAttribute("name");
        setEmployees([]);
        employee(index);
        setObj_api((prev) => {
          return { ...prev, [name]: index };
        });

        break;
      default:
        break;

      case "employee_ids":
        index =
          e.target.childNodes[e.target.selectedIndex].getAttribute("name");
        if (true) {
          setObj_view({
            ...obj_view,
            [selectedDep]: [
              ...obj_view[selectedDep],
              employees[e.target.selectedIndex - 1],
            ],
          });
          setObj_api((prev) => {
            return { ...prev, [name]: index };
          });
          formik.setFieldValue("project_teams", [
            ...formik.values.project_teams,
            { ...obj_api, [name]: index },
          ]);
        } else {
          break;
        }

        break;
    }
    // setObj_api( {[name] : e.target.selctedIndex} );
  };

  // useEffect(()=>{

  //   setData({...data , project_teams:[...data[ 'project_teams'],  obj_api  ]  })

  // },[obj_api['employee_ids']])

  const fetchPost = async () => {
    try {
      await //  Axios({
      //   method: "Get",
      //   url: ,

      //  headers: headers, params:data
      getData(`/departments`).then((res) => {
        setDepartments(res?.Departments);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleParam = async (id) => {
    try {
      await Axios({
        method: "Get",
        url: `/subdepartments`,
        params: {
          departments: [id],
        },
      }).then((res) => {
        setSubdepartments(res?.data?.data.Subdepartments);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const employee = async (id) => {
    try {
      await Axios({
        method: "Get",
        url: `/subdepartments/${id}/employees`,
      }).then((res) => {
        setEmployees(res?.data?.data?.employees);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // useEffect(()=>{
  //   setData( { ...data ,  attachments :[ ...Attachments]} )
  //   ;
  // },[Attachments]);

  useEffect(() => {
    setAllattachments([...Attachments, ...docfiles]);
  }, [Attachments, docfiles]);

  let remove = (index1, inputName) => {
    switch (inputName) {
      case "link":
        setLinks(
          links.filter((word, idx) => {
            return index1 !== idx;
          })
        );
        break;
      case "tech":
        setTechnology(
          technology.filter((word, idx) => {
            return index1 !== idx;
          })
        );
        break;
      case "images":
        setImages((prev) =>
          prev.filter((word, idx) => {
            return index1 !== idx;
          })
        );
        setAttachments((prev) =>
          prev.filter((word, idx) => {
            return index1 !== idx;
          })
        );

        break;
      case "docs":
        setDocs((prev) =>
          prev.filter((word, idx) => {
            return index1 !== idx;
          })
        );
        setDocfiles((prev) =>
          prev.filter((word, idx) => {
            return index1 !== idx;
          })
        );

        break;

      default:
        break;
    }
  };

  const removeEmployee = (index1, dep) => {
    setObj_view({
      ...obj_view,
      [dep]: obj_view[dep].filter((word, idx) => {
        return index1 !== idx;
      }),
    });
    // setObj_api((prev) => prev.filter((word, idx) => {
    //   return index1 !== idx;
    // })
    // );

    formik.setFieldValue(
      "project_teams",
      formik.values.project_teams.filter((word, idx) => {
        return index1 !== idx;
      })
    );

    console.log(formik.values.project_teams);
  };

  const handleSubmit = async () => {
    await Axios({
      method: "post",
      url: `/ProjectPhases/${id}/phases`,
      data: formik.values,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function () {
      notify("Phase Added successfully");
      navigate(`/Projects Dashboard/details/${id}`);
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string("shuold be string").required("required *"),
    start: Yup.string("shuold be string").required("required *"),
    end: Yup.string("shuold be string").required("required *"),
    status: Yup.string("shuold be string").required("required *"),
    priority: Yup.string("shuold be string").required("required *"),
    phase_discription: Yup.string("shuold be string").required("required *"),
    links: Yup.array().min(1, "required"),
    target: Yup.array().min(1, "required"),
    dependencies: Yup.array().min(1, "required"),
    // department_id: Yup.string().required("Department is required"),
    // subdepartment_id: Yup.string().required("Department is required"),
    employee_ids: Yup.array().required("Department is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      start: "",
      end: "",
      status: "",
      priority: "",
      attachments: [],
      phase_discription: "",
      target: [],
      project_teams: [],
      employee_ids: [],
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      handleSubmit();
    },
  });

  return (
    <>
      <Location main="Projects " head={search.get("project")} />

      <div className="dash__form">
        <div className="dash__form-header">
          <img src={case1} alt="case" />
          <p style={{ color: "#fff" }}>{search.get("project")} Phases</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="dash__form-content">
            <div className="dash__form-content_details  grid grid-cols-4 gap-4">
              <div>
                <p>Phase</p>
                <Input
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Phase Name"
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
                <p>Status</p>
                <Select
                  name="status"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.status && formik.errors.status}
                >
                  <option selected hidden>
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
                <p>Priority</p>
                <Select
                  name="priority"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.priority && formik.errors.priority}
                >
                  <option selected hidden>
                    -- select priority --
                  </option>
                  <option>low</option>
                  <option>high</option>
                </Select>
                <span className="error">
                  {formik.touched.priority && formik.errors.priority}
                </span>
              </div>

              <Addinput
                header="Dependencies"
                placeholder="Create home page and its product"
                fun={updateArray}
                keyName="dependencies"
                isInvalid={
                  formik.touched.dependencies && formik.errors.dependencies
                }
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="dash__form-content_projdetails">
              <div className="dash__form-content_projdetails-header">
                <p>Phase Discription</p>
              </div>
              <div className="dash__form-content_projdetails-input">
                <Textarea
                  rows="4"
                  cols="50"
                  name="phase_discription"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.phase_discription &&
                    formik.errors.phase_discription
                  }
                ></Textarea>
                <span className="error">
                  {formik.touched.phase_discription &&
                    formik.errors.phase_discription}
                </span>

                {/* <input rows="4" cols="50" type='text'name='description' onChange={handleChange} /> */}
              </div>
            </div>

            <Addattchments fun={updateData} />

            <Addinput
              header="Phase URLs"
              placeholder="http//:www.project.com"
              fun={updateArray}
              keyName="links"
              isInvalid={formik.touched.links && formik.errors.links}
              onBlur={formik.handleBlur}
            />
            <Addinput
              header="Phase Delivrables"
              placeholder="Create home page"
              fun={updateArray}
              keyName="target"
              isInvalid={formik.touched.target && formik.errors.target}
              onBlur={formik.handleBlur}
            />

            <div className=" grid grid-cols-3 gap-8">
              <Selectinput
                header="Department"
                fun={handleSelect}
                data={departments}
                name="department_id"
              />
              <Selectinput
                header="Specialization"
                fun={handleSelect}
                data={subdepartments}
                name="subdepartment_id"
              />
              <Selectinput
                value=""
                header="Team Members"
                fun={handleSelect}
                data={employees}
                name="employee_ids"
                isInvalid={
                  formik.touched.employee_ids && formik.errors.employee_ids
                }
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="phase_team">
              {Object.keys(obj_view).map((input) => {
                return (
                  <>
                    <div className="phase_team-header">
                      <h4>{input}</h4>
                    </div>
                    <div className="phase_team-cards">
                      {obj_view[input].map((member, index) => {
                        return (
                          <div className="phase_team-cards_card">
                            <IoIosClose
                              color=" #1370E4"
                              size={24}
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                              }}
                              onClick={() => {
                                removeEmployee(index, input);
                              }}
                            />
                            <div className="phase_team-cards_card-img">
                              <img src={member.image} alt="upload" />
                            </div>
                            <div className="phase_team-cards_card-conrent">
                              <h5>
                                {member.first_name} &nbsp;{member.last_name}
                              </h5>
                              <p>{member.technologies[0].name}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <button
            type="submit"
            ref={submitBtn}
            style={{ width: "50px", height: "50px" }}
            hidden
          ></button>
        </form>

        <div className="dash__form-confirm">
          <input
            type="submit"
            onClick={() => {
              submitBtn.current.click();
            }}
            style={{ width: "160px" }}
            value={` Save & Create New`}
          />

          <Link to="/Project List">Back</Link>
        </div>
      </div>
    </>
  );
};

export default Newphase;
