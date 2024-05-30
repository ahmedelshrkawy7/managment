import React, { useEffect, useRef, useState, useContext } from "react";
import case1 from "../../../assets/Form/briefcase.svg";
import bin from "../../../assets/Form/fluent_delete-28-regular.svg";
import plus from "../../../assets/Form/icons.svg";
import Location from "../../../includes/location/Location";
import useAxios from "../../../api/Axios";
import { Link, useNavigate } from "react-router-dom";
import { serverApi } from "../../../../App";
import { notify, error } from "../../../notifications/Toast";
import Header from "../../../components/Header/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadContext from "../../../components/loader/LoaderContext";
import {
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import logo1 from "../../../assets/Form/Frame 1171275978 1.svg";
import camera from "../../../assets/Form/solar_camera-linear.svg";
import eyeslash from "../../../assets/login/eye-slash.svg";
import eye from "../../../assets/login/bi_eye.svg";

const Createadmin = () => {
  let [title, setTitle] = useState([]);
  const [options, setOptions] = useState([]);
  const [data, setData] = useState({});
  const [pwdshow, setPwdshow] = useState(false);
  let [logoImage, setlogoImages] = useState(logo1);

  let linkinput = useRef(0);
  let logoImg = useRef(0);

  let submitBtn = useRef(0);
  const navigate = useNavigate();
  const { getData, postData } = useAxios();

  const { setLoader } = useContext(LoadContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string("shuold be string").required("required *"),
    email: Yup.string("should be string")
      .email("Invalid email")
      .required("Required"),
    password: Yup.string("shuold be string").required("required *"),
    role: Yup.string("shuold be string").required("required *"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      role_id: "",
      password_confirmation: "",
      //   image:"",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoader(true);
      await handleSubmit();
    },
  });

  //  setData({...data, subdepartment: title  });
  let pushLink = () => {
    if (linkinput.current.value !== "") {
      formik.setFieldValue("subdepartments", [
        ...formik.values.subdepartments,
        { title: linkinput.current.value },
      ]);
    }
    linkinput.current.value = "";
  };
  let removeLink = (index1) => {
    formik.setFieldValue(
      "subdepartments",
      formik.values.subdepartments.filter((word, index) => {
        return index1 !== index;
      })
    );
  };
  const fetchPost = async () => {
    try {
      await getData(`/roles`).then((res) => {
        setOptions(res?.Roles);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    setData({ ...data, subdepartments: title });
  }, [title]);

  const handleSubmit = async () => {
    console.log(data);

    await postData([`/users`, formik.values])
      .then(function () {
        notify("Admin Added successfully");
        setLoader(false);
        navigate("/adminlist");
      })
      .catch(function (err) {
        setLoader(false);
        error(err.response.data.messsage);
      });
  };

  return (
    <>
      <Header text="Admins" />
      <div className="dash__form">
        <div className="dash__form-header">
          <img src={case1} alt="case" />
          <p style={{ color: "#fff" }}>Create New Admin</p>
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
                  //   setObj({ ...obj, logo: files[0] });
                }}
              />
              <img src={camera} alt="camera" style={{ width: "18px" }} />
              <p>Upload Image</p>
            </div>
          </div>

          <div className="dash__form-content">
            <div className="dash__form-content_details grid grid-cols-2 gap-4">
              <div>
                <p>Name</p>
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
                    name="name"
                    placeholder="Enter a name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.name && formik.errors.name}
                  />

                  <span className="error">
                    {formik.touched.name && formik.errors.name}
                  </span>
                </div>
              </div>
              <div>
                <p>Role</p>
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
                    name="role"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.role && formik.errors.role}
                  >
                    <option selected disabled hidden>
                      {" "}
                      -- Role --
                    </option>

                    {options?.map((opt) => {
                      return <option key={opt.id}>{opt.name}</option>;
                    })}
                  </Select>

                  <span className="error">
                    {formik.touched.role && formik.errors.role}
                  </span>
                </div>
              </div>
              <div>
                <p>Email</p>
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
                    name="email"
                    placeholder="Alexon@admin.com"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.email && formik.errors.email}
                  />

                  <span className="error">
                    {formik.touched.email && formik.errors.email}
                  </span>
                </div>
              </div>
              <div>
                <p>Password</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <InputGroup size="lg">
                    <Input
                      name="password"
                      type={pwdshow ? "text" : "password"}
                      placeholder="Enter your Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.password && formik.errors.password
                      }
                    />
                    <InputRightElement>
                      <img
                        src={pwdshow ? eyeslash : eye}
                        alt="email"
                        onClick={() => {
                          setPwdshow(!pwdshow);
                        }}
                      />
                    </InputRightElement>
                  </InputGroup>

                  <span className="error">
                    {formik.touched.password && formik.errors.password}
                  </span>
                </div>
              </div>
              <div>
                <p>Password Confirm</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <InputGroup size="lg">
                    <Input
                      name="password"
                      type={pwdshow ? "text" : "password"}
                      placeholder="Enter your Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.password_confirmation &&
                        formik.errors.password_confirmation
                      }
                    />
                    <InputRightElement>
                      <img
                        src={pwdshow ? eyeslash : eye}
                        alt="email"
                        onClick={() => {
                          setPwdshow(!pwdshow);
                        }}
                      />
                    </InputRightElement>
                  </InputGroup>

                  <span className="error">
                    {formik.touched.password_confirmation &&
                      formik.errors.password_confirmation}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <input type="submit" hidden ref={submitBtn} />
        </form>

        <div className="dash__form-confirm">
          <Link
            type="submit"
            onClick={() => {
              submitBtn.current.click();
            }}
          >
            Create
          </Link>
          <Link to="/Departments">Back</Link>
        </div>
      </div>
    </>
  );
};

export default Createadmin;
