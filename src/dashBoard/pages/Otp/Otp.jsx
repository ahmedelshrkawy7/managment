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
import { useLocation, useNavigate } from "react-router-dom";
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
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import LoadContext from "../../components/loader/LoaderContext";
import "./Otp.css";
import useAxios from "../../api/Axios";

const Otp = () => {
  const Navigate = useNavigate();
  const {postData}= useAxios()




  const userRef = useRef();
  const subRef = useRef();

  const { state } = useLocation();


  const [data, setData] = useState({});

  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  // Function to handle input changes
  const handleInputChange = (index, value) => {
    const updatedOtpValues = [...otpValues];
    updatedOtpValues[index] = value;
    setOtpValues(updatedOtpValues);
  };

  // console.log(otpValues);

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    userRef.current.focus();
    formik.setFieldValue("email", state);
  }, []);

  document.addEventListener("DOMContentLoaded", function () {
    const otpInputs = document.querySelectorAll(".otpInput");

    otpInputs.forEach((input, index) => {
      input.addEventListener("input", (e) => {
        const value = e.target.value;

        // Move to the next input if a digit is entered
        if (/^\d$/.test(value)) {
          if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
        }

        // Move to the previous input if the value is deleted
        if (value === "") {
          if (index > 0) {
            otpInputs[index - 1].focus();
          }
        }
      });
    });
  });

  const handleSubmit = async () => {
    try {
      const response = await 
   
      postData([`/validate-otp`,formik.values])

      // setAdmin(response.data.data.user)
      // setAuth(true)
      // setSuccess(true)
      // localStorage.setItem('logged' ,true)
      console.log(response);
      //Cookies.set('token', JSON.stringify(response.data.data), { expires:365, secure: true });

      notify(response?.data?.messsage);
      // Navigate('/')
    } catch (err) {
      // error('Email or Password is incorrect');
      console.log(err.response.data.messsage);
      error(err.response.data.messsage);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string("should be string")
      .email("Invalid email")
      .required("Required"),
    otp: Yup.number("should be numbers").min(6, "required *"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: (value) => {
      handleSubmit();
    },
  });

  const sendAgain = async () => {
    console.log("first");
    try {
      const response = await
      postData([`/password/forget-password`,{ email: formik.values.email }])

      notify(response?.data?.messsage);
    } catch (err) {
      console.log(err);
      error(err?.response?.data?.message);
    }
  };
  return (
    <div className="dash__login">
      <div className="dash_login-img w-full">
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
        <div
          className="dash_login-content_container gap-8"
          style={{ width: "350px" }}
        >
          <div
            className="dash_login-content_header gap-2"
            style={{ alignItems: "center" }}
          >
            <h2 style={{ color: "var(--blue)", textAlign: "center" }}>
              Verification
            </h2>
            <p>
              Check your mail{" "}
              <span className="blue">
                {state[0] + state[1]}*************
                {state[state.length - 12] + state[state.length - 11]}@gmail.com{" "}
              </span>
              , you have received a verification code ans it will be ended in{" "}
              <span className="blue">2 mins</span>
            </p>
          </div>
          {/*       
              <div className='dash_login-content_input'>
                <div className='dash_login-content_input-header'> <h5>Email</h5></div>
              
                <div className='dash_login-content_input-element'> 
                  

                    <InputGroup size='lg'>
                    <InputLeftElement pointerEvents='none'>
                      <img  src={lock} alt='lock'/> 
                        
                    </InputLeftElement>
                          <Input name='email'  placeholder='Enter your Email'
                          onChange={formik.handleChange} onBlur={formik.handleBlur}
                          isInvalid={formik.touched.email && formik.errors.email}
                           />
                    
                  </InputGroup>
                  <span className='error'>{formik.touched.email && formik.errors.email}</span>

                    
                </div>
              </div> */}
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

          <div className="dash_login-content_otp flex flex-column gap-8 items-center w-full">
            {/* <div className='flex justify-center items-center'> <h5>OTP</h5></div> */}

            {/*                    
                    <Input style={{width:'40px',padding:'0'}} name='password' type={"text"}
                        placeholder='_' 
                       
                          onChange={formik.handleChange} onBlur={formik.handleBlur}
                          isInvalid={formik.touched.password &&formik.errors.password}
                          /> */}

            <div className="dash_login-content_otp-input flex justify-between w-full  gap-2">
              <PinInput
                name="otp"
                otp
                onChange={formik.handleChange}
                onComplete={(e) => {
                  formik.setFieldValue("otp", e);
                  subRef.current.click();
                }}
                placeholder="__"
              >
                <PinInputField ref={userRef} />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </div>

            <span className="error">
              {formik.touched.password && formik.errors.password}
            </span>
          </div>

          <div className="dash_login-content_header gap-2">
            {/* <h2 style={{color:'var(--blue)'}}>Enter Verification Code</h2> */}
            <p>
              You didn't receive OTP ? &nbsp;
              <span className="blue cursor-pointer	" onClick={sendAgain}>
                Send Again
              </span>
            </p>
          </div>

          <input type="submit" hidden ref={subRef} />
          {/* 
              <div className='dash_login-content_login'>
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
              </div> */}
        </div>
      </form>
    </div>
  );
};

export default Otp;
