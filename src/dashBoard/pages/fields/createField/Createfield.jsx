import React, { useEffect, useRef, useState, useContext } from "react";
import case1 from "../../../assets/Form/briefcase.svg";
import bin from "../../../assets/Form/fluent_delete-28-regular.svg";
import plus from "../../../assets/Form/icons.svg";
import Location from "../../../includes/location/Location";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { serverApi } from "../../../../App";
import { notify, error } from "../../../notifications/Toast";
import useAxios, { Axios } from "../../../api/Axios";
import { useFormik } from "formik";
import { Input } from "@chakra-ui/react";
import * as Yup from "yup";
import Addinput from "../../../components/Addinput/Addinput";
import LoadContext from "../../../components/loader/LoaderContext";

const Createfield = () => {
  let [title, setTitle] = useState([]);
  const navigate = useNavigate();
  const {getData,postData}= useAxios()

  const location = useLocation();

  const { setLoader } = useContext(LoadContext);
  let linkinput = useRef(0);

  let submitBtn = useRef(0);

  useEffect(() => {
    linkinput.current.value = location?.state?.depName || "";
  }, []);

  let pushLink = () => {
    if (linkinput.current.value !== "") {
      formik.setFieldValue("title", [
        ...formik.values.title,
        linkinput.current.value,
      ]);
    }
    linkinput.current.value = "";
  };
  let removeLink = (index1) => {
    formik.setFieldValue(
      "title",
      formik.values.title.filter((word, index) => {
        return index1 !== index;
      })
    );
  };

  const handleSubmit = async () => {
    await
   
     postData([`/departments`,formik.values])
      .then(function () {
        notify("Department Added successfully");
        navigate("/deplist");
      })
      .catch(function ({ response }) {
        error(response.data.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleEdit = async () => {
    await 
    // Axios({
    //   method: "post",
    //   url: ,
    //   data: ,
    //   headers: { "Content-Type": "multipart/form-data" },
    // })
    postData([`/departments/${location?.state?.id}`,{ title: formik.values.title[0], _method: "PUT" }])
      .then(function () {
        notify("Department Edited successfully");
        navigate("/deplist");
      })
      .catch(function ({ response }) {
        error(response.data.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.array().min(1, "required *"),
  });
  const formik = useFormik({
    initialValues: {
      title: [],
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setLoader(true);

      if (location.state) {
        await handleEdit();
      } else {
        await handleSubmit();
      }
    },
  });

  return (
    <>
      <Location
        head={location?.state ? "Edit Department" : "Create New Department"}
        main="Major"
      />
      <div className="dash__form">
        <div className="dash__form-header">
          <img src={case1} alt="case" />
          <p style={{ color: "#fff" }}>
            {location?.state ? "Edit Department" : "Create New Department"}
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="dash__form-content">
            <div className="dash__form-content_details grid grid-cols-4">
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
                  <Input
                    ref={linkinput}
                    name="title"
                    placeholder="Web Developing"
                    disabled={location.state && formik.values.title[0]}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.title && formik.errors.title}
                  />
                  <span className="error">
                    {formik.touched.title && formik.errors.title}
                  </span>
                  {
                    <div className="addLink" onClick={pushLink}>
                      <img src={plus} alt="addlink" />
                    </div>
                  }
                </div>
              </div>
            </div>
            <div
              className="dash__form-content_links col-span-4"
              style={{ width: "100%", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
            >
              {formik.values.title.map((link, index1) => {
                return (
                  <div className="dash__form-content_links-link ">
                    <div className="dash__form-content_links-link-a">
                      <a href={link} target="blank">
                        {link}
                      </a>
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

            {/* <Addinput header='Department' placeholder= "Web Developing" formik={formik} keyName="title"     /> */}
          </div>

          <input type="submit" hidden ref={submitBtn} />
        </form>

        <div className="dash__form-confirm">
          <input
            type="submit"
            onClick={() => {
              submitBtn.current.click();
            }}
            value={location?.state ? "Edit " : "Create "}
          />

          <Link to="/deplist">Back</Link>
        </div>
      </div>
    </>
  );
};

export default Createfield;
