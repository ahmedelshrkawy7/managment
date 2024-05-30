import React, { useEffect, useRef, useState, useContext } from "react";
import Location from "../../../includes/location/Location";
import serviceIcon from "../../../assets/createServerice/send-sqaure-2.svg";
import useAxios from "../../../api/Axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { notify, error } from "../../../notifications/Toast";
import "./CreateService.css";
import plus from "../../../assets/Form/icons.svg";
import empty from "../../../assets/createServerice/illustration-hit-send.svg";
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import * as Yup from "yup";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { act } from "react-dom/test-utils";
import axios from "axios";
import PostmanLoader from "../../../components/postmanLoader/PostmanLoader";
import Tr from "../../../components/Trservice/Tr";

const CreateService = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {getData,postData}= useAxios()

  const linkSchema = Yup.string().url("Invalid URL format");

  const validationSchema = Yup.object().shape({
    link: Yup.string("title shuold be string")
      .url("Invalid URL format")
      .required("required *"),
  });

  const formik = useFormik({
    initialValues: {
      link: "",
      method: "",
      token: "",
      key: "",
      value: "",
      body: {},
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values) => {
      fetchPost();
    },
  });

  let [technologies, setTechnologies] = useState([]);

  let [loader, setLoader] = useState(false);
  let [tr, setTr] = useState([true]);
  let [body, setBody] = useState({});
  console.log("🚀 ~ CreateService ~ body:", body);
  let [params, setParams] = useState({});
  console.log("🚀 ~ CreateService ~ params:", params);

  let submitBtn = useRef(0);
  let method = useRef(0);
  let param = useRef(0);
  let paramValue = useRef(0);

  const fetchPost = async () => {
    setLoader(true);
    console.log(formik.values);
    for (let i = 0; i < Object.entries(body).length; i++) {
      const [key, value] = Object.entries(body)[i];
      formik.setFieldValue("body", {
        ...formik.values.body,
        [value[0]]: value[1],
      });
    }

    try {
      await axios({
        method: `${method.current.value}`,
        url: formik.values.link,
        data: formik.values.body,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${formik.values.token}`,
        },
      }).then((res) => {
        setTechnologies(res);
        setLoader(false);
      });
    } catch (err) {
      setTechnologies(err);
      setLoader(false);
    }
  };

  const addRow = () => {
    setTr((prev) => [...prev, true]);
  };

  const handleBody = (key, value, idx) => {
    setBody({ ...body, [idx]: [key, value] });
  };

  return (
    <>
      <Location
        main="Web Services"
        head={location.state ? " Edit Web Service" : "Create Web Service"}
      />

      <div className="dash__form">
        <div className="dash__form-header">
          <img src={serviceIcon} alt="case" />
          <p style={{ color: "#fff" }}>
            {location.state ? "Edit Web Service" : "Create Web Service"}
          </p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="sm:flex-col sm:items-center"
        >
          <div className="dash__form-content">
            <div className="dash__form-content_details">
              <section className="flex  gap-4">
                <div className="w-full flex postman ">
                  <Input
                    name="link"
                    type="url"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.link}
                    placeholder="URL Link"
                    isInvalid={formik.touched.link && formik.errors.link}
                  />
                  <Select name="method" ref={method}>
                    <option selected>GET</option>
                    <option>POST </option>
                    <option>DELETE</option>
                    <option>PUT</option>
                  </Select>
                </div>

                <button
                  className="button"
                  style={loader ? { background: "gray" } : {}}
                  onClick={() => {
                    loader ? setLoader(false) : submitBtn.current.click();
                  }}
                >
                  {loader ? "Cancel" : "Send"}
                </button>
              </section>
              <section className="my-4">
                <Tabs>
                  <TabList>
                    <Tab>Params</Tab>
                    <Tab>Authorization</Tab>
                    <Tab>Headers</Tab>
                    <Tab>Body</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel className="flex items-end">
                      <table className="w-full rounded-md	">
                        <th className="rounded-md	">
                          <td className=" bg-blue-100">Key</td>
                          <td className=" bg-blue-100">Value</td>
                          <td className=" bg-blue-100">Description</td>
                        </th>
                        <div>
                          {tr.map((t, id) => {
                            return (
                              <tr className="">
                                <input
                                  className=""
                                  placeholder="Key"
                                  ref={param}
                                  onChange={(e) => {
                                    setParams({
                                      ...params,
                                      [id]: { key: e.target.value },
                                    });
                                  }}
                                />
                                <input
                                  placeholder="Value"
                                  ref={paramValue}
                                  onChange={(e) => {
                                    setParams({
                                      ...params,
                                      [id]: {
                                        ...params[id],
                                        value: e.target.value,
                                      },
                                    });
                                  }}
                                />
                                <input
                                  className=" "
                                  placeholder="Description"
                                />
                              </tr>
                            );
                          })}
                        </div>
                      </table>
                      <div className="addLink  ml-4" onClick={addRow}>
                        <img src={plus} alt="addlink" />
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="flex gap-20 my-4">
                        <h4 className="flex justify-center items-center">
                          Token
                        </h4>
                        <Input
                          placeholder="Token"
                          name="token"
                          onChange={formik.handleChange}
                        />
                      </div>
                    </TabPanel>
                    <TabPanel className="flex items-end">
                      <table className="w-full rounded-md	">
                        <th className="rounded-md	">
                          <td className=" bg-blue-100">Key</td>
                          <td className=" bg-blue-100">Value</td>
                          <td className=" bg-blue-100">Description</td>
                        </th>
                        <div>
                          {tr.map(() => {
                            return (
                              <tr className="">
                                <input className="" placeholder="Key" />
                                <input placeholder="Value" />
                                <input
                                  className=" "
                                  placeholder="Description"
                                />
                              </tr>
                            );
                          })}
                        </div>
                      </table>
                      <div className="addLink  ml-4" onClick={addRow}>
                        <img src={plus} alt="addlink" />
                      </div>
                    </TabPanel>
                    <TabPanel className="flex items-end">
                      <table className="w-full rounded-md	">
                        <th className="rounded-md	">
                          <td className=" bg-blue-100">Key</td>
                          <td className=" bg-blue-100">Value</td>
                          <td className=" bg-blue-100">Description</td>
                        </th>
                        <div>
                          {tr.map((bol, index) => {
                            return <Tr handleBody={handleBody} idx={index} />;
                          })}
                        </div>
                      </table>
                      <div className="addLink  ml-4 " onClick={addRow}>
                        <img src={plus} alt="addlink" />
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </section>
            </div>
          </div>
          <input type="submit" hidden ref={submitBtn} />
        </form>
      </div>
      <div className="dash__form">
        <div className="dash__form-header">
          <img src={serviceIcon} alt="case" />
          <p style={{ color: "#fff" }}>Sample Response</p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="sm:flex-col sm:items-center"
        >
          <div className="dash__form-content">
            {!!Object.keys(technologies).length ? (
              <div className="dash__form-content_details">
                <Box
                  padding={4}
                  // backgroundColor="red.200"
                  borderRadius="md"
                  overflow="auto"
                  maxHeight="400px"
                  minHeight="400px"
                >
                  {loader ? (
                    <div className="flex justify-center items-center h-full">
                      <PostmanLoader />
                    </div>
                  ) : (
                    <SyntaxHighlighter language="javascript" style={docco}>
                      {JSON.stringify(technologies, null, 2)}
                    </SyntaxHighlighter>
                  )}
                </Box>
                {/* <pre>

            <code>
            {JSON.stringify(technologies, null, 2)}

            </code>
             </pre> */}
              </div>
            ) : (
              <div className=" w-full flex flex-col justify-center items-center">
                <img src={empty} alt="empty" />
                <p className="text-blue-700 mt-4">
                  Enter your URL then click SEND
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateService;
