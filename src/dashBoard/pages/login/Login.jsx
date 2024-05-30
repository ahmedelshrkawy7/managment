import React, { useContext, useEffect, useState, useRef } from "react";
import logo from "../../assets/login/Group 1000011514.svg";
import email from "../../assets/login/lock.svg";
import eyeslash from "../../assets/login/eye-slash.svg";
import eye from "../../assets/login/bi_eye.svg";
import lock from "../../assets/login/sms.svg";
import "./Login.css";
import { serverApi } from "../../../App";
import AuthContext from "../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { replace, useFormik } from "formik";
import * as Yup from "yup";
import { notify, error } from "../../notifications/Toast";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import LoadContext from "../../components/loader/LoaderContext";
import { Spinner } from "@chakra-ui/react";
import useAxios from "../../api/Axios";

const Login = () => {
  const navigate = useNavigate();
  const { postData } = useAxios();

  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const { loader, setLoader } = useContext(LoadContext);

  const [sucsess, setSuccess] = useState(false);

  const server = useContext(serverApi);
  const [data, setData] = useState({});
  const [admin, setAdmin] = useState({});
  const [pwdshow, setPwdshow] = useState(false);

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    userRef.current.focus();
    setLoader(false);
  }, []);

  const handleSubmit = async () => {
    try {
      await postData(["/login", formik.values]).then((response) => {
        console.log("🚀 ~ awaitpostData ~ response:", response)
        setAdmin(response.data.data.user);
        setAuth(response.data.data);
        localStorage.setItem("logged", true);
        localStorage.setItem("token", JSON.stringify(response.data.data));
        localStorage.setItem(
          "Roles",
          JSON.stringify(response.data.data.user.role)
        );
        notify("Loggedin Successfully");
        setLoader(false);
        navigate("/", { replace: true });
      });
    } catch (err) {
      // error("Email or Password is incorrect");
      setLoader(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string("should be string")
      .email("Invalid email")
      .required("Required"),
    password: Yup.string("should be string").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (value) => {
      setLoader(true);
      handleSubmit();
    },
  });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-1">
      <div className="dash_login-img flex lg:hidden">
        <div className="cont">
          <div className="dash_login-img_header">
            <h4>Welcome Back !</h4>
          </div>

          <div className="dash_login-img_logo ">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
      <form
        className="dash_login-content"
        onSubmit={formik.handleSubmit}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="dash_login-content_container " style={{ gap: "0" }}>
          <div className="dash_login-content_header">
            <h2 style={{ color: "var(--blue)" }}>Log In</h2>
          </div>

          <div className="dash_login-content_input">
            <div className="dash_login-content_input-header">
              <h5>Email</h5>
            </div>

            <div className="dash_login-content_input-element">
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <img src={lock} alt="lock" />
                </InputLeftElement>
                <Input
                  name="email"
                  placeholder="Enter your Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  ref={userRef}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
              </InputGroup>
              <span className="error">
                {formik.touched.email && formik.errors.email}
              </span>
            </div>
          </div>

          <div className="dash_login-content_input">
            <div className="dash_login-content_input-header">
              {" "}
              <h5>Password</h5>
            </div>

            <div className="dash_login-content_input-element">
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <img src={email} alt="email" />
                </InputLeftElement>
                <Input
                  name="password"
                  type={pwdshow ? "text" : "password"}
                  placeholder="Enter your Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.password && formik.errors.password}
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
          <div
            className="dash_login-content_conditions d-flex justify-content-between align-items-center w-full"
            style={{ marginTop: "16px", marginBottom: "40px" }}
          >
            <div className="dash_login-content_conditions-check">
              <div className="flex gap-4 items-center">
                <input type="checkbox" />
                <p>Remember Me</p>
              </div>
              <Link to="/login/forget" className="blue">
                {" "}
                Forgot your password ?
              </Link>
            </div>

            <div className="dash_login-content_conditions-check"></div>
          </div>

          <div className="dash_login-content_login">
            <button disabled={loader} type="submit ">
              {loader ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="md"
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
