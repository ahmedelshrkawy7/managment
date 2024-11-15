import Location from "../../../includes/location/Location";
import React, { useEffect, useRef, useState, useContext } from "react";
import "./CreateMember.css";
import case1 from "../../../assets/Form/briefcase.svg";
import plus from "../../../assets/Form/icons.svg";
import camera from "../../../assets/Form/solar_camera-linear.svg";
import logo1 from "../../../assets/Form/Frame 1171275978 1.svg";
import bin from "../../../assets/Form/fluent_delete-28-regular.svg";
import dollar from "../../../assets/teams/dollar-circle.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Selectinput from "../../../components/selectinput/Selectinput";
import useAxios from "../../../api/Axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { notify, error } from "../../../notifications/Toast";
import { Input, Select } from "@chakra-ui/react";
import LoadContext from "../../../components/loader/LoaderContext";

const CreateMember = () => {
  const { setLoader } = useContext(LoadContext);
  const { state } = useLocation();
  console.log("🚀 ~ CreateMember ~ state:", state);
  const [phone, setPhone] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [selecttechnology, setSelectTechnology] = useState([]);
  const [selecsub, setSelectsub] = useState([]);
  const [logoImage, setlogoImages] = useState();

  const [positions, setPositions] = useState([]);
  const [worktype, setWorktype] = useState([]);
  const [gender, setGender] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDep, setSelectedDep] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState([]);
  const [governorate, setGovernorate] = useState([]);
  const [roles, setRoles] = useState([]);
  const { postData } = useAxios();

  const phoneInput = useRef(0);
  const techInput = useRef(0);
  const logoImg = useRef(0);
  const submitBtn = useRef(0);
  const currency = useRef(0);

  const navigate = useNavigate();
  const { getData } = useAxios();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const mobileSchema = Yup.string()
    .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(11, "11 number is required")
    .max(25, "25 number is required");

  const validationSchema = Yup.object().shape({
    first_name: Yup.string("shuold be string")
      .matches(/^[A-Za-z]+$/, "Please enter only alphabetic characters")
      .required("required *"),
    last_name: Yup.string("shuold be string")
      .matches(/^[A-Za-z]+$/, "Please enter only alphabetic characters")
      .required("required *"),
    email: Yup.string("shuold be string")
      .email("invalid email")
      .required("required *"),
    workhours: Yup.number()
      .typeError("Please enter a valid number")
      .required("Required *"),
    experience: Yup.string("shuold be string").required("required *"),
    salary: Yup.number()
      .typeError("Salary must be a number")
      .positive("should be positive")
      .required("Salary is required"),

    mobile: Yup.array().min(1, "required").of(mobileSchema),

    position_id: Yup.string("should be string").required("required *"),
    currency_id: Yup.string("should be string").required("required *"),
    gender_id: Yup.string("should be string").required("required *"),
    WorkType_id: Yup.string("should be string").required("required *"),
    government_id: Yup.string("should be string").required("required *"),
    password: Yup.string("should be string").required("required *"),
    address: Yup.string("should be string").required("required *"),
    technologies: Yup.array().min(1, "required"),
    departments: Yup.array().min(1, "required"),
    subdepartments: Yup.array().min(1, "required"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: state?.first_name || "",
      last_name: state?.last_name || "",
      experience: state?.experience_date || "",
      gender_id: state?.gender?.id || "",
      government_id: state?.governorate?.id || "",
      position_id: state?.governorate?.id,
      image: "",
      WorkType_id: state?.workType?.id,
      email: state?.email || "",
      mobile: state?.mobile || [],
      workhours: state?.workhours || "",
      salary: state?.salary || "",
      currency_id: state?.currency?.id,
      address: state?.address || "",
      role_id: state?.role_id,
      password: "",
      technologies: [],
      departments: [],
      subdepartments: [],
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      setLoader(true);

      handleSubmit();
      // navigate('/projects/projectlist')
    },
  });

  //   const handleChange = (e) => {

  //     const value = e.target.value;
  //     console.log(value)

  //         setData({
  //         ...data,
  //         [e.target.name]: value
  //         });

  //  };

  const handleIndex = (e) => {
    let index =
      e.target.childNodes[e.target.selectedIndex].getAttribute("name");

    formik.setFieldValue([e.target.name], index);

    // setData({
    // ...data,
    // [e.target.name]: value
    // });
  };

  const handleIndexes = (e) => {
    const name = e.target.name;
    const index = e.target.selectedIndex;
    const id = e.target.childNodes[index].getAttribute("name");

    formik.setFieldValue([name], [...formik.values[name], id]);
  };

  //  const handleChangeArray=(e)=>{
  //     const value = e.target.value;
  //     const name = e.target.name;

  //         setData({
  //         ...data,
  //         [e.target.name]: value
  //         });

  //  }
  //  const updateArray =(array , name  )=>{

  //   setData((prev)=>{return ({ ...prev ,  [name] : [...array]})}  )
  // }

  useEffect(() => {
    fetchPost();
    setlogoImages(location?.state?.image);

    if (state) {
      formik.setFieldValue("_method", "PUT");
      let depId = state.departments.map((el) => {
        setSelectedDep((prev) => [...prev, el.title]);
        return el.id;
      });

      formik.setFieldValue("departments", depId);

      let subId = state.subdepartments.map((el) => {
        setSelectedSpec((prev) => [...prev, el.title]);
        return el.id;
      });

      formik.setFieldValue("subdepartments", subId);
      let techId = state.technologies.map((el) => {
        setTechnology((prev) => [...prev, el.name]);
        return el.id;
      });

      formik.setFieldValue("technologies", techId);
    }
  }, []);

  const fetchPost = async () => {
    const endpoints = [
      "positions",
      "worktypes",
      "genders",
      "currencies",
      "departments",
      "governments",
      "technologies",
      "subdepartments",
      "roles",
    ];
    try {
      const responses = await Promise.all(
        endpoints?.map((endpoint) =>
          getData(`/${endpoint}`).catch((err) => {
            // Handle individual request error here
            error(err?.response?.data?.message);
            throw error; // Rethrow the error to break Promise.all
          })
        )
      );

      const [
        { Positions },
        { Types },
        { allgenders },
        { Currencies },
        { Departments },
        { governorates },
        { Technologies },
        { Subdepartments },
        { Roles },
      ] = responses;

      setPositions(Positions);
      setWorktype(Types);
      setGender(allgenders);
      setCurrencies(Currencies);
      setDepartments(Departments);
      setGovernorate(governorates);
      setSelectTechnology(Technologies);
      setSelectsub(Subdepartments);
      setRoles(Roles);
    } catch (err) {
      // Handle any error that occurred during the entire Promise.all
      error(err?.response?.data?.message);
      console.error(err);
    }
  };

  //  useEffect(()=>{
  //    setData( { ...data ,  attachments : [...Attachments]} )
  //    ;
  //  },[Attachments]);

  let push = (ref, inputName) => {
    if (true) {
      switch (inputName) {
        case "mobile":
          try {
            if (mobileSchema.validateSync(ref.current.value)) {
              let arr = [...phone, ref.current.value];
              setPhone(arr);
              formik.setFieldValue("mobile", arr);
              ref.current.value = "";
            }
          } catch (error) {
            formik.setFieldError("mobile", error.message);
          }
          // setData({...data , mobile : arr})

          break;

        case "tech":
          setTechnology([...technology, ref.current.value]);

          // setData({...data , technologies : [...data['technologies'], ref.current.selectedIndex]})

          break;
        case "department":
          setSelectedDep([...selectedDep, ref?.target?.value]);

          // setData({...data , departments : [...data['departments'],  ref.target.selectedIndex]})

          break;
        case "spec":
          setSelectedSpec([...selectedSpec, ref.target.value]);

          // setData({...data , subdepartments : [...data['subdepartments'],  ref.target.selectedIndex]})

          break;

        default:
      }
    }
  };

  let removeLink = (index1, inputName) => {
    switch (inputName) {
      case "mobile":
        setPhone(
          phone.filter((word, index) => {
            return index1 !== index;
          })
        );
        formik.setFieldValue(
          "mobile",
          phone.filter((word, index) => {
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
      case "dep":
        setSelectedDep(
          selectedDep.filter((word, index) => {
            return index1 !== index;
          })
        );
        formik.setFieldValue(
          "departments",
          formik.values.departments.filter((word, index) => {
            return index1 !== index;
          })
        );

        break;
      case "spec":
        setSelectedSpec(
          selectedSpec.filter((word, index) => {
            return index1 !== index;
          })
        );
        formik.setFieldValue(
          "subdepartments",
          formik.values.subdepartments.filter((word, index) => {
            return index1 !== index;
          })
        );

        break;

      default:
    }
  };

  const handleSubmit = async () => {
    if (!state) {
      await postData([`/employees`, formik.values]).then(function () {
        notify("Member created successfully");
        setLoader(false);
        navigate("/teamlist");
      });
    } else {
      await postData([`/employees/${state.id}`, formik.values]).then(
        function () {
          notify("Member updated successfully");
          setLoader(false);
          navigate("/teamlist");
        }
      );
    }
  };

  return (
    <>
      <Location head={state ? "Edit Employee" : " Add Employee"} main="Teams" />
      <div className="dash__form">
        <div className="dash__form-header">
          <img src={case1} alt="case" />
          <p style={{ color: "#fff" }}>
            {state
              ? `Edit ${state.first_name} ${state.last_name}`
              : " Create New Member"}
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="sm:flex-col">
          <div className="dash__form-logo">
            <div className="dash__form-logo-img">
              <img src={logoImage || state?.image || logo1} alt="logo" />
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
                accept="image/*"
                hidden
                ref={logoImg}
                onChange={({ target: { files } }) => {
                  setlogoImages(URL.createObjectURL(files[0]));
                  formik.setFieldValue("image", files[0]);
                }}
              />
              <img src={camera} alt="camera" style={{ width: "18px" }} />
              <p>Upload Photo</p>
            </div>
          </div>

          <div className="dash__form-content">
            <div className="dash__form-content_details grid w-full grid-cols-4 md:grid-cols-2 sm:grid-cols-1   gap-4">
              <div>
                <p>First Name</p>
                <Input
                  name="first_name"
                  type="text"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="First Name"
                  isInvalid={
                    formik.touched.first_name && formik.errors.first_name
                  }
                />
                <span className="error">
                  {formik.touched.first_name && formik.errors.first_name}
                </span>
              </div>

              <div>
                <p>Last Name</p>
                <Input
                  name="last_name"
                  value={formik.values.last_name}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Last Name"
                  isInvalid={
                    formik.touched.last_name && formik.errors.last_name
                  }
                />
                <span className="error">
                  {formik.touched.last_name && formik.errors.last_name}
                </span>
              </div>

              <div>
                <p>Email</p>
                <Input
                  name="email"
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Email"
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                <span className="error">
                  {formik.touched.email && formik.errors.email}
                </span>
              </div>
              {/* 
              <Addinput header='Phone Number' placeholder='Add employee phone' keyName='mobile' fun={push}  onBlur={formik.handleBlur}
              isInvalid={formik.touched.mobile && formik.errors.mobile} /> */}

              <div>
                <p>Phone Number</p>
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
                    type="text"
                    placeholder="Phone Number"
                    ref={phoneInput}
                    name="mobile"
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.mobile && formik.errors.mobile}
                  />
                  <div
                    className="addLink"
                    onClick={() => {
                      push(phoneInput, "mobile");
                    }}
                  >
                    <img src={plus} alt="addlink" />
                  </div>
                </div>
                <span className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </span>
              </div>

              {formik.values.mobile[0] && (
                <section className=" col-span-4 md:col-span-2 sm:col-span-1  gap-4 grid grid-cols-4">
                  {formik?.values?.mobile?.map((link, index1) => {
                    return (
                      <div
                        className="dash__form-content_links-link"
                        style={{ width: "100%" }}
                      >
                        <div
                          className="dash__form-content_links-link-a"
                          style={{ width: " 165px" }}
                        >
                          <a href={link} target="blank">
                            {link}
                          </a>
                        </div>
                        <div
                          className="dash__form-content_links-link-icon"
                          onClick={() => {
                            removeLink(index1, "mobile");
                          }}
                        >
                          <img src={bin} alt="bin" />
                        </div>
                      </div>
                    );
                  })}
                </section>
              )}

              <div>
                <p>Work Hours</p>
                <Input
                  name="workhours"
                  type="text"
                  value={formik.values.workhours}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Work Hours"
                  isInvalid={
                    formik.touched.workhours && formik.errors.workhours
                  }
                />
                <span className="error">
                  {formik.touched.workhours && formik.errors.workhours}
                </span>
              </div>

              <div>
                <p>Position</p>

                <Select
                  name="position_id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.position_id && formik.errors.position_id
                  }
                >
                  <option selected hidden>
                    -- Select position --
                  </option>
                  {positions?.map((position) => {
                    return (
                      <option
                        selected={state?.position == position.title}
                        value={position.id}
                      >
                        {position.title}
                      </option>
                    );
                  })}
                </Select>
                <span className="error">
                  {formik.touched.position_id && formik.errors.position_id}
                </span>
              </div>

              <div>
                <p>Start date</p>
                <Input
                  name="experience"
                  type="date"
                  value={formik.values.experience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.experience && formik.errors.experience
                  }
                />
                <span className="error">
                  {formik.touched.experience && formik.errors.experience}
                </span>
              </div>

              <div className="dash__form-content_details-salary">
                <p>Salary</p>

                <div>
                  <Input
                    name="salary"
                    value={formik.values.salary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Salary"
                    isInvalid={formik.touched.salary && formik.errors.salary}
                    onClick={() => {
                      currency.current.click();
                    }}
                    style={{ textAlign: "left", padding: " 0 1.5rem" }}
                  />
                </div>
                <span className="error">
                  {formik.touched.salary && formik.errors.salary}
                </span>
                {/* <img src={dollar} alt='dollar'/> */}
              </div>

              <div>
                <p>Currency</p>
                <Select
                  name="currency_id"
                  onBlur={formik.handleChange}
                  ref={currency}
                  isInvalid={
                    formik.touched.currency_id && formik.errors.currency_id
                  }
                >
                  <option selected hidden>
                    - Select Currency-
                  </option>

                  {currencies?.map((currency) => {
                    return (
                      <option
                        selected={state?.currency?.id == currency.id}
                        value={currency.id}
                      >
                        {currency.currency}
                      </option>
                    );
                  })}
                </Select>
                <span className="error">
                  {formik.touched.currency_id && formik.errors.currency_id}
                </span>
              </div>

              <div>
                <p>Work Type</p>
                <Select
                  name="WorkType_id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.WorkType_id && formik.errors.WorkType_id
                  }
                >
                  <option selected hidden>
                    - Select Work type --
                  </option>
                  {worktype?.map((w) => {
                    return (
                      <option
                        selected={state?.worktype?.id === w.id}
                        value={w.id}
                      >
                        {w.type}
                      </option>
                    );
                  })}
                </Select>
                <span className="error">
                  {" "}
                  {formik.touched.WorkType_id && formik.errors.WorkType_id}
                </span>
              </div>

              <div>
                <Selectinput
                  header="Governorate"
                  name="government_id"
                  data={governorate}
                  fun={handleIndex}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.government_id && formik.errors.government_id
                  }
                  selectedOpt={state?.governorate.id}
                />
              </div>

              <div>
                <p>Role</p>
                <Select
                  name="role_id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.role_id && formik.errors.role_id}
                >
                  <option selected hidden>
                    - Select role --
                  </option>
                  {roles?.map((el) => {
                    return (
                      <option selected={state?.role == el.name} value={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
                </Select>
                <span className="error">
                  {" "}
                  {formik.touched.WorkType_id && formik.errors.WorkType_id}
                </span>
              </div>

              <div>
                <p>Gender</p>
                <Select
                  name="gender_id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.gender_id && formik.errors.gender_id
                  }
                >
                  <option selected hidden>
                    - Select Gender --
                  </option>
                  {gender?.map((g) => {
                    return (
                      <option selected={state?.gender?.id == g.id} value={g.id}>
                        {g.gender}
                      </option>
                    );
                  })}
                </Select>
                <span className="error">
                  {" "}
                  {formik.touched.gender_id && formik.errors.gender_id}
                </span>
              </div>
              <div>
                <p>Address</p>
                <Input
                  name="address"
                  type="text"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Address"
                  isInvalid={formik.touched.address && formik.errors.address}
                />
                <span className="error">
                  {formik.touched.address && formik.errors.address}
                </span>
              </div>
              <div>
                <p>Password</p>
                <Input
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="password"
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                <span className="error">
                  {formik.touched.password && formik.errors.password}
                </span>
              </div>
              <div>
                <p>Department</p>
                <Select
                  name="departments"
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.departments && formik.errors.departments
                  }
                  onChange={(e) => {
                    push(e, "department");
                    handleIndexes(e);
                  }}
                >
                  <option selected hidden>
                    -- select Department --
                  </option>

                  {departments?.map((department) => {
                    return (
                      <option name={department.id}>{department.title}</option>
                    );
                  })}
                </Select>
                <span className="error">
                  {formik.touched.departments && formik.errors.departments}
                </span>
              </div>
              {selectedDep[0] && (
                <section
                  className="col-span-4 md:col-span-2 sm:col-span-1  gap-4 grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1"
                  style={{ width: "100%" }}
                >
                  {selectedDep?.map((link, index1) => {
                    return (
                      <div
                        className="dash__form-content_links-link"
                        style={{ height: "40px" }}
                      >
                        <div
                          className="dash__form-content_links-link-a"
                          style={{ width: " 165px" }}
                        >
                          <a href={link} target="blank">
                            {link}
                          </a>
                        </div>
                        <div
                          className="dash__form-content_links-link-icon"
                          onClick={() => {
                            removeLink(index1, "dep");
                          }}
                        >
                          <img src={bin} alt="bin" />
                        </div>
                      </div>
                    );
                  })}
                </section>
              )}

              <div>
                <p>Specialization</p>
                <Select
                  name="subdepartments"
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.subdepartments &&
                    formik.errors.subdepartments
                  }
                  onChange={(e) => {
                    push(e, "spec");
                    handleIndexes(e);
                  }}
                >
                  <option selected hidden>
                    -- select Specialization --
                  </option>

                  {selecsub?.map((department) => {
                    return (
                      <option name={department.id}>{department.title}</option>
                    );
                  })}
                </Select>
                <span className="error">
                  {formik.touched.subdepartments &&
                    formik.errors.subdepartments}
                </span>
              </div>
              {selectedSpec[0] && (
                <section className="col-span-4 md:col-span-2 sm:col-span-1  gap-4 grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                  {selectedSpec?.map((link, index1) => {
                    return (
                      <div
                        className="dash__form-content_links-link"
                        style={{ height: "40px" }}
                      >
                        <div
                          className="dash__form-content_links-link-a"
                          style={{ width: " 165px" }}
                        >
                          <a href={link} target="blank">
                            {link}
                          </a>
                        </div>
                        <div
                          className="dash__form-content_links-link-icon"
                          onClick={() => {
                            removeLink(index1, "spec");
                          }}
                        >
                          <img src={bin} alt="bin" />
                        </div>
                      </div>
                    );
                  })}
                </section>
              )}

              <div>
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
                  <Select
                    name="technologies"
                    ref={techInput}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.technologies && formik.errors.technologies
                    }
                    onChange={(e) => {
                      push(techInput, "tech");
                      handleIndexes(e);
                    }}
                  >
                    <option selected hidden>
                      -- select Technology --
                    </option>

                    {selecttechnology?.map((department) => {
                      return (
                        <option name={department.id}>{department.name}</option>
                      );
                    })}
                  </Select>
                  <span className="error">
                    {formik.touched.technologies && formik.errors.technologies}
                  </span>
                </div>
              </div>
              {technology[0] && (
                <section className="col-span-4 md:col-span-2 sm:col-span-1  gap-4 grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                  {technology?.map((link, index1) => {
                    return (
                      <div
                        className="dash__form-content_links-link"
                        style={{ height: "40px" }}
                      >
                        <div
                          className="dash__form-content_links-link-a"
                          style={{ width: " 165px" }}
                        >
                          <a href={link} target="blank">
                            {link}
                          </a>
                        </div>
                        <div
                          className="dash__form-content_links-link-icon"
                          onClick={() => {
                            removeLink(index1, "tech");
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
          </div>
          <input type="submit" ref={submitBtn} hidden />
        </form>

        <div className="dash__form-confirm">
          <input
            onClick={() => {
              submitBtn.current.click();
            }}
            value={state ? "Edit" : "Create"}
          />

          <Link to="/teamlist">back</Link>
        </div>
      </div>
    </>
  );
};

export default CreateMember;
