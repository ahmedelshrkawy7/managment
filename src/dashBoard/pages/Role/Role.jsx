import React, { useContext, useEffect, useRef, useState } from "react";
import { Location } from "../../routes/import";
import Header from "../../components/Header/Header";
import { Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAxios, { Axios } from "../../api/Axios";
import { notify, error } from "../../notifications/Toast";
import LoadContext from "../../components/loader/LoaderContext";
import { Link, useNavigate } from "react-router-dom";
import "./Role.css";

const Role = () => {
  const { setLoader } = useContext(LoadContext);
  const [roles, setRoles] = useState([]);
  const [allchecked, setAllchecked] = useState(undefined);
  const navigate = useNavigate();
  const submitBtn = useRef(0);
  const { getData, postData } = useAxios();

  const validationSchema = Yup.object().shape({
    name: Yup.string("shuold be string").required("required *"),
    permissions: Yup.array().min(1, "select permission").of(Yup.string()),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      permissions: [],
      guard_name: "api",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoader(true);
      await handleSubmit();
    },
  });

  const handleSubmit = async () => {
    await postData([`/roles`, formik.values])
      .then(function () {
        notify("Role Added successfully");
        setLoader(false);
        // navigate("/tech");
      })
      .catch(function (err) {
        setLoader(false);
        error(err.response.data.messsage);
      });
  };

  const fetchPost = async () => {
    try {
      await //  Axios({
      //   method: "Get",
      //   url: ,
      // })
      getData(`/roles`).then((res) => {
        setRoles(res?.permissions);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPost();
    setLoader(true);
  }, []);
  console.log(formik.values);

  const inputs = document.querySelectorAll(
    ".permission_check input[type=checkbox]"
  );

  useEffect(() => {
    if (allchecked) {
      const permissions = [];

      inputs.forEach((inp) => {
        inp.checked = true;
        permissions.push(inp.value);
      });

      formik.setFieldValue("permissions", permissions);
    } else {
      inputs.forEach((inp) => {
        inp.checked = false;

        formik.setFieldValue("permissions", []);
      });
    }
  }, [allchecked]);

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      formik.setFieldValue("permissions", [
        ...formik.values.permissions,
        e.target.value,
      ]);
    } else {
      formik.setFieldValue(
        "permissions",
        formik.values.permissions.filter((el) => el !== e.target.value)
      );
    }
  };

  return (
    <>
      <Location main="Admin" head="Create Role" />

      <Header text="Add Role :" />
      <form
        onSubmit={formik.handleSubmit}
        className="dash__form-content_details grid grid-cols-4 gap-4 bg-white h-100 p-4 rounded border border-black-300"
      >
        <div className="relative ">
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
            <Input
              name="name"
              placeholder="Add Role"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
            />

            <span className="error">
              {formik.touched.name && formik.errors.name}
            </span>
          </div>
        </div>
        <input type="submit" ref={submitBtn} hidden />
      </form>
      <div className="flex w-full px-2">
        <Header text="Add Permissions :" />

        <div className="flex items-center ">
          <input
            className="w-1"
            type="checkbox"
            onChange={() => {
              setAllchecked(!allchecked);
            }}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 relative">
        {roles.map((role) => {
          return (
            <div className="flex w-full justify-between permission my-2 p-2">
              <div className="permission_role">
                <h2> {role.name}</h2>
              </div>
              <div className="permission_check">
                <input
                  type="checkbox"
                  value={role.id}
                  onChange={handleCheckbox}
                />
              </div>
            </div>
          );
        })}
        {/* {Object.keys(roles)?.map((role) => {
          return (
            <div className="flex-col w-full justify-between items-center  ">
              <div className="bg-blue-100 flex-col w-full my-4 p-2">
                <h4 className="text-blue-600 text-2xl	">{role}</h4>
              </div>
              {roles[role].map((role) => {
                return (
                  <div className="flex w-full justify-between permission my-2 p-2">
                    <div className="permission_role">
                      <h2> {role.name}</h2>
                    </div>
                    <div className="permission_check">
                      <input
                        type="checkbox"
                        value={role.id}
                        onChange={handleCheckbox}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })} */}

        <span className="error">
          {formik.touched.permissions && formik.errors.permissions}
        </span>
      </div>
      <div className="dash__form-confirm">
        <input
          type="submit"
          onClick={() => {
            submitBtn.current.click();
          }}
          value={"Create "}
        />

        <Link to="/Project List"> Back</Link>
      </div>
    </>
  );
};

export default Role;
