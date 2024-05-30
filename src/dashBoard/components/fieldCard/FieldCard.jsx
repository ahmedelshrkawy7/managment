import React, { useEffect, useState, useRef, useContext } from "react";
import "./FieldCard.css";

import dots from "../../assets/fields/more.svg";
import user from "../../assets/fields/solar_user-rounded-linear.svg";
import scroll from "../../assets/fields/scroll.svg";
import { Link, useNavigate } from "react-router-dom";

import useAxios, { Axios } from "../../api/Axios";
import LoadContext from "../loader/LoaderContext";
import { error, notify } from "../../notifications/Toast";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import { No_member } from "../../routes/import";

const FieldCard = ({ api, link, fun, num }) => {
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const { getData } = useAxios();

  const { setLoader } = useContext(LoadContext);

  const fetch = async () => {
    await getData(`/${api}`)
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res)
        setFields(
          res?.Departments || res?.Subdepartments
        );
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        error(err.response.data.message);
      });
  };
  const handleDelete = async (id) => {
    await Axios({
      method: "Delete",
      url: `/${api}/${id}`,
    })
      .then(() => {
        setFields(
          fields.filter((field, index) => {
            return field.id !== id;
          })
        );
        notify("Deleted successfully");
      })
      .catch((err) => {
        error(err.response.data.message);
      });
  };

  useEffect(() => {
    setLoader(true);
    fetch();
  }, []);

  num(fields.length);

  return (
    <>
      {fields ? (
        fields?.map((field) => {
          return (
            <>
              <div className="group  flex relative ">
                <section className="absolute top-5 right-4 ">
                  <Menu>
                    <MenuButton>
                      <img className="dots" src={dots} alt="dots" />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          handleDelete(field.id);
                        }}
                      >
                        Delete
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate("/createdep", {
                            state: {
                              id: field.id,
                              depName: field.title || field.name,
                            },
                          });
                        }}
                      >
                        Edit
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </section>

                <div
                  className="field_card  "
                  onClick={() => {
                    fun(field.id);
                  }}
                >
                  <div>
                    <h6>{field.title || field.name}</h6>
                  </div>
                  <div>
                    <img src={user} alt="user" />
                    <p>
                      {" "}
                      {field.employee_count || field.employees_count} member
                    </p>
                  </div>
                  <div>
                    <img src={scroll} alt="scroll" />
                    <p>{field.technology_count} technologies</p>
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <No_member />
      )}
    </>
  );
};

export default FieldCard;
