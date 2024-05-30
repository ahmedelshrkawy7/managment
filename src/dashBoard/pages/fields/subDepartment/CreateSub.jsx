import React, { useEffect, useRef, useState, useContext } from "react";
import case1 from "../../../assets/Form/briefcase.svg";
import bin from "../../../assets/Form/fluent_delete-28-regular.svg";
import plus from "../../../assets/Form/icons.svg";
import Location from "../../../includes/location/Location";
import useAxios, { Axios } from "../../../api/Axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { serverApi } from "../../../../App";
import { notify, error } from "../../../notifications/Toast";
import Header from "../../../components/Header/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadContext from "../../../components/loader/LoaderContext";
import { Select, Input } from "@chakra-ui/react";

const Createsub = () => {
  let [title, setTitle] = useState([]);
  const [options, setOptions] = useState([]);
  const [data, setData] = useState({});
  const location = useLocation();

  let linkinput = useRef(0);

  let submitBtn = useRef(0);
  const navigate = useNavigate();
  const { getData, postData } = useAxios();

  const { setLoader } = useContext(LoadContext);

  const validationSchema = Yup.object().shape({
    department_id: Yup.string("title shuold be string").required("required *"),
    subdepartments: Yup.array().min(1, "required *"),
  });

  const formik = useFormik({
    initialValues: {
      department_id: "",
      subdepartments: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoader(true);
      await handleSubmit();
      navigate("/sublist");
    },
  });

  console.log(formik.values);

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
      await getData(`/departments`).then((res) => {
        setOptions(res?.Departments);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
    linkinput.current.value = location?.state?.title || "";
  }, []);

  useEffect(() => {
    setData({ ...data, subdepartments: title });
  }, [title]);

  const handleSubmit = async () => {
    console.log(data);

    await postData([`/subdepartments`, formik.values])
      .then(function (response) {
        console.log(response);
        notify("Specialization Added successfully");
        setLoader(false);
        navigate("/tech");
      })
      .catch(function (response) {
        console.log(response);
        setLoader(false);
        error("Server Error");
      });
  };

  return (
    <>
      <Header text="Specailizations" />
      <div className="dash__form">
        <div className="dash__form-header">
          <img src={case1} alt="case" />
          <p style={{ color: "#fff" }}>
            {location?.state
              ? "Edit Specialization"
              : "Create New Specialization"}
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="dash__form-content">
            <div className="dash__form-content_details grid grid-cols-3 gap-4">
              {!location?.state && (
                <div>
                  <p>Department</p>
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
                      name="department_id"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.department_id &&
                        formik.errors.department_id
                      }
                    >
                      <option selected disabled hidden>
                        {" "}
                        -- Department --
                      </option>

                      {options.map((opt) => {
                        return (
                          <option key={opt.id} value={opt.id}>
                            {opt.title}
                          </option>
                        );
                      })}
                    </Select>

                    <span className="error">
                      {formik.touched.department_id &&
                        formik.errors.department_id}
                    </span>
                  </div>
                </div>
              )}
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
                  <Input
                    ref={linkinput}
                    placeholder="Back-end"
                    disabled={!!!formik.values.department_id}
                    isInvalid={
                      formik.touched.subdepartments &&
                      formik.errors.subdepartments
                    }
                  />
                  <div className="addLink" onClick={pushLink}>
                    <img src={plus} alt="addlink" />
                  </div>
                  <span className="error">
                    {formik.touched.subdepartments &&
                      formik.errors.subdepartments}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-8 w-full ">
              {formik.values.subdepartments.map((link, index1) => {
                return (
                  <div className="dash__form-content_links-link w-full ">
                    <div
                      className="dash__form-content_links-link-a"
                      style={{ width: "100%" }}
                    >
                      <a href="/">{link.title}</a>
                    </div>
                    <div
                      className="dash__form-content_links-link-icon"
                      onClick={() => {
                        removeLink(index1);
                      }}
                    >
                      <img src={bin} alt="bin" />
                    </div>
                  </div>
                );
              })}
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
          <Link to="/sublist">Back</Link>
        </div>
      </div>
    </>
  );
};

export default Createsub;
