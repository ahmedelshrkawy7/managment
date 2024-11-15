import React, { useEffect, useRef, useState, useContext } from "react";
import "./CreateTechnology.css";
import case1 from "../../../assets/Form/briefcase.svg";
import bin from "../../../assets/Form/fluent_delete-28-regular.svg";
import plus from "../../../assets/Form/icons.svg";
import Location from "../../../includes/location/Location";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo1 from "../../../assets/Form/Frame 1171275978 1.svg";
import camera from "../../../assets/Form/solar_camera-linear.svg";
import "react-toastify/dist/ReactToastify.css";
import useAxios, { Axios } from "../../../api/Axios";
import { notify, error } from "../../../notifications/Toast";
import Header from "../../../components/Header/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadContext from "../../../components/loader/LoaderContext";
import { Input, Select } from "@chakra-ui/react";

const CreateTechnology = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getData, postData } = useAxios();

  const { setLoader } = useContext(LoadContext);

  let [options, setOptions] = useState([]);
  let [departments, setDepartments] = useState({});
  let [logoImage, setlogoImages] = useState(logo1);
  let [tech, setTech] = useState(false);
  let [technologies, setTechnologies] = useState([]);
  let [obj, setObj] = useState({});

  let linkinput = useRef(0);
  let logoImg = useRef(0);

  let submitBtn = useRef(0);
  let selected = useRef(0);

  const validationSchema = Yup.object().shape({
    technologies: Yup.array().min(1, "required *"),
  });

  const formik = useFormik({
    initialValues: {
      technologies: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoader(true);

      !!location.state ? handleEdit(location.state.id) : await handleSubmit();
    },
  });

  // subdepartment_id: '4', name: 'www'

  let pushLink = () => {
    if (linkinput.current.value !== "") {
      setObj({ ...obj, name: linkinput.current.value });

      let item = departments[selected.current.value] || [];
      item.push(linkinput.current.value);
      setDepartments({ ...departments, [selected.current.value]: item });
      setTech(true);
      setlogoImages(logo1);
    }

    linkinput.current.value = "";
  };

  const handleEdit = (id) => {
    // Axios({
    //   method: "post",
    //   url: ,
    //   data: ,
    //   headers: { "Content-Type": "multipart/form-data" },
    // })
    postData([`/technologies/${id}`, { ...formik.values, _method: "PUT" }])
      .then((res) => {
        setLoader(false);
        navigate("/techlist");
        notify("technologies Editted successfully");
      })

      .catch((response) => {
        setLoader(false);
        error(response.response.data.message);
      });
  };

  const handleSubmit = async () => {
    postData([`/technologies`, formik.values])
      .then(() => {
        setLoader(false);
        navigate("/techlist");
        notify("technologies addedd successfully");
      })

      .catch((response) => {
        setLoader(false);
        error(response.response.data.message);
      });
  };
  const fetchPost = async () => {
    try {
      await getData(`/subdepartments`).then((res) => {
        setOptions(res?.Subdepartments);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
    if (location.state) {
      formik.setFieldValue("_method", "PUT");
      linkinput.current.value = location.state.name;
      // selected.current.value  =  location.state.specialization ;

      console.log(location.state.specialization);
      setDepartments({
        ...departments,
        [selected.current.value]: departments[selected.current.value] || [],
      });

      setObj({ ...obj, subdepartment_id: location.state.specialization_id });
    }
  }, []);

  useEffect(() => {
    if (tech) {
      setTechnologies([...technologies, obj]);
      formik.setFieldValue("technologies", [
        ...formik.values.technologies,
        obj,
      ]);
    }
  }, [obj.name]);

  const selectChange = (e) => {
    setDepartments({
      ...departments,
      [selected.current.value]: departments[selected.current.value] || [],
    });

    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute("id");

    setObj({ ...obj, subdepartment_id: option });
  };

  return (
    <>
      <Header text="Technologies" />

      <div className="dash__form">
        <div className="dash__form-header">
          <img src={case1} alt="case" />
          <p style={{ color: "#fff" }}>
            {location.state ? "Edit Technology" : "Create New Technology"}
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="dash__form-logo">
            <div className="dash__form-logo-img">
              <img src={logoImage} alt="logo" />
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
                  setObj({ ...obj, logo: files[0] });
                }}
              />
              <img src={camera} alt="camera" style={{ width: "18px" }} />
              <p>Upload image</p>
            </div>
          </div>
          <div className="dash__form-content">
            <div
              className="dash__form-content_details grid grid-cols-4 gap-4"
              style={{ justifyContent: "flex-start" }}
            >
              <div>
                <p>Specialization</p>
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
                    name="subdepartment_id"
                    ref={selected}
                    onChange={selectChange}
                    isInvalid={formik.touched.tech && formik.errors.tech}
                  >
                    <option hidden value={location?.state?.specialization}>
                      {location.state?.specialization || " -- select sub --"}
                    </option>
                    {options.map((opt) => {
                      return <option id={opt.id}>{opt.title}</option>;
                    })}
                  </Select>

                  <span className="error">
                    {formik.touched.technologies && formik.errors.technologies}
                  </span>
                </div>
              </div>

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
                  <Input
                    name="tech"
                    ref={linkinput}
                    onBlur={formik.handleBlur}
                    disabled={!!!Object.keys(departments).length}
                    placeholder="Backend"
                    isInvalid={
                      formik.touched.technologies && formik.errors.technologies
                    }
                  />
                  <div className="addLink" onClick={pushLink}>
                    <img src={plus} alt="addlink" />
                  </div>
                  <span className="error">
                    {formik.touched.technologies && formik.errors.technologies}
                  </span>
                </div>
              </div>
            </div>
            <div className="allDepartments" style={{ width: "100%" }}>
              {Object.keys(departments).map((dep) => {
                return (
                  <div className="department">
                    <div className="department_header">
                      <h5>{dep}</h5>
                    </div>

                    {departments[dep].map((link, index1) => {
                      return (
                        <div className="department_technology">
                          <h6>{link}</h6>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
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
            value={location.state ? "Edit" : "Create"}
          />
          <Link to="/techlist">Back</Link>
        </div>
      </div>
    </>
  );
};

export default CreateTechnology;
