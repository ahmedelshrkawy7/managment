import React, { useEffect, useRef, useState, useContext } from "react";
import case1 from "../../../assets/Form/briefcase.svg";
import bin from "../../../assets/Form/fluent_delete-28-regular.svg";
import plus from "../../../assets/Form/icons.svg";
import Location from "../../../includes/location/Location";
import useAxios from "../../../api/Axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { serverApi } from "../../../../App";
import { notify, error } from "../../../notifications/Toast";
import Header from "../../../components/Header/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadContext from "../../../components/loader/LoaderContext";
import { Select, Input } from "@chakra-ui/react";

const Editsub = () => {
  let [title, setTitle] = useState([]);
  const [options, setOptions] = useState([]);
  const [data, setData] = useState({});
  const { state } = useLocation();
  console.log("🚀 ~ Createsub ~ state:", state);

  let linkinput = useRef(0);

  let submitBtn = useRef(0);
  const navigate = useNavigate();
  const { getData, postData } = useAxios();

  const { setLoader } = useContext(LoadContext);

  const validationSchema = Yup.object().shape({
    Dept_id: Yup.string("title shuold be string").required("required *"),
    title: Yup.string("title shuold be string").required("required *"),
  });

  const formik = useFormik({
    initialValues: {
      Dept_id: state?.department?.id,
      title: state?.title,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoader(true);
      await handleSubmit();
      navigate("/sublist");
    },
  });

  //  setData({...data, subdepartment: title  });

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
    linkinput.current.value = state?.title || "";

    formik.setFieldValue("_method", "PUT");
  }, []);

  const handleSubmit = async () => {
    if (!state) {
      await postData([`/subdepartments`, formik.values]).then(function (
        response
      ) {
        console.log(response);
        notify("Specialization Added successfully");
        setLoader(false);
        navigate("/tech");
      });
    } else {
      await postData([`/subdepartments/${state.id}`, formik.values]).then(
        function () {
          notify("Specialization Added successfully");
          setLoader(false);
          navigate("/tech");
        }
      );
    }
  };

  console.log(formik.values);

  return (
    <>
      <Header text="Specailizations" />
      <div className="dash__form">
        <div className="dash__form-header">
          <img src={case1} alt="case" />
          <p style={{ color: "#fff" }}>Edit Specialization</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="dash__form-content">
            <div className="dash__form-content_details grid grid-cols-3 gap-4">
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
                    name="Dept_id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.Dept_id && formik.errors.Dept_id}
                    disabled
                  >
                    <option selected disabled hidden>
                      {" "}
                      -- Department --
                    </option>

                    {options.map((opt) => {
                      return (
                        <option key={opt.id} value={opt.id} selected={state}>
                          {opt.title}
                        </option>
                      );
                    })}
                  </Select>

                  <span className="error">
                    {formik.touched.Dept_id && formik.errors.Dept_id}
                  </span>
                </div>
              </div>

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
                    {...formik.getFieldProps("title")}
                    placeholder="Back-end"
                    isInvalid={formik.touched.title && formik.errors.title}
                  />

                  <span className="error">
                    {formik.touched.title && formik.errors.title}
                  </span>
                </div>
              </div>
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
            value="Edit"
          />
          <Link to="/sublist">Back</Link>
        </div>
      </div>
    </>
  );
};

export default Editsub;
