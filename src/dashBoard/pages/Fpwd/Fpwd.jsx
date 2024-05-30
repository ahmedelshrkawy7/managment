import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  useRef,
} from "react";
import logo from "../../assets/login/2023 alexon logo.svg";
import email from "../../assets/login/lock.svg";
import eyeslash from "../../assets/login/eye-slash.svg";
import eye from "../../assets/login/bi_eye.svg";
import lock from "../../assets/login/sms.svg";
import { serverApi } from "../../../App";
import AuthContext from "../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { notify, error } from "../../notifications/Toast";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import LoadContext from "../../components/loader/LoaderContext";
import { FaArrowLeft } from "react-icons/fa6";
import useAxios from "../../api/Axios";

const Fpwd = () => {
  const navigate = useNavigate();
  const {getData,postData}= useAxios()


  const { loader, setLoader } = useContext(LoadContext);

  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();

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
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await 
      
      postData([`/password/forget-password`,formik.values]);
      
      console.log("🚀 ~ handleSubmit ~ response:", response)
      // setAdmin(response.data.data.user)
      // setAuth(true)
      // setSuccess(true)
      // localStorage.setItem('logged' ,true)
      // console.log(response?.data);
      //Cookies.set('token', JSON.stringify(response.data.data), { expires:365, secure: true });

      notify(response?.data?.messsage);
      setLoader(false);
      navigate("/login/forget/otp", { state: formik.values.email });
    } catch (err) {
      // error('Email or Password is incorrect');
      console.log(err);
      setLoader(false);
      error(err?.response?.data?.message);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string("should be string")
      .email("Invalid email")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (value) => {
      setLoader(true);
      handleSubmit();
    },
  });

  return (
    <div className="dash__login">
      <div className="dash_login-img">
        <div className="cont">
          <div className="dash_login-img_header">
            <h4>Welcome Back !</h4>
          </div>

          <div className="dash_login-img_logo">
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
        <div className="dash_login-content_container">
          <FaArrowLeft
            size={27}
            color="var(--blue)"
            style={{ position: "absolute ", top: "50px", left: "0" }}
            onClick={() => {
              navigate("/login");
            }}
          />

          <div className="dash_login-content_header">
            <h2 style={{ color: "var(--blue)" }}>Forgot you Password ?</h2>
          </div>

          <div className="dash_login-content_input">
            <div className="dash_login-content_input-header">
              {" "}
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
          {/*                  
              <div className='dash_login-content_input'>
                  <div className='dash_login-content_input-header'> <h5>Password</h5></div>

                  <div className='dash_login-content_input-element' >
                     
                   
                  <InputGroup size='lg'>
                    <InputLeftElement pointerEvents='none'>
                        <img  src={email} alt='email'/> 
                        
                    </InputLeftElement>
                    <Input name='password' type={pwdshow?"text":'password'}
                        placeholder='Enter your Password' 
                       
                          onChange={formik.handleChange} onBlur={formik.handleBlur}
                          isInvalid={formik.touched.password &&formik.errors.password}
                          />
                      <InputRightElement>
                          <img   src={pwdshow?eyeslash:eye} alt='email' onClick={()=>{setPwdshow(!pwdshow)}}/>
                      </InputRightElement>    
                  </InputGroup>
                      <span className='error'>{formik.touched.password && formik.errors.password}</span>

                  </div>
          

              </div> */}
          {/* <div className='dash_login-content_conditions d-flex justify-content-between align-items-center w-full'>
                <div className='dash_login-content_conditions-check'>
                   <input type='checkbox'  />
                   <p>Remember Me</p>
                </div>

                <div className='dash_login-content_conditions-check'>
                  <Link to='/'> Forgot your password ?</Link>
                </div>
                

              </div> */}

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
                "Send OTP"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Fpwd;
