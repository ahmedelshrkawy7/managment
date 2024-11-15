import React, { useContext, useEffect, useRef, useState } from "react";
import case1 from "../../assets/Form/briefcase.svg";
import bin from "../../assets/Form/fluent_delete-28-regular.svg";
import plus from "../../assets/Form/icons.svg";
import { serverApi } from "../../../App";
import { Input } from "@chakra-ui/react";

const Addinput = ({
  header,
  placeholder,
  keyName,
  fun,
  isInvalid,
  onBlur,
  data,
}) => {
  console.log("🚀 ~ data:", data);
  let [title, setTitle] = useState([]);
  console.log("🚀 ~ title:", title);
  let linkinput = useRef(0);
  let submitBtn = useRef(0);

  //   console.log({api})
  //   console.log({arrName})

  let push = (str, name) => {
    if (str !== "") {
      setTitle([...title, str]);
    }

    linkinput.current.value = "";
  };

  let removeLink = (index1) => {
    setTitle(
      title.filter((word, index) => {
        return index1 !== index;
      })
    );
  };

  useEffect(() => {
    fun(title, keyName);
  }, [title]);

  useEffect(() => {
    if (data) {
      setTitle(data);
    }
  }, [keyName, data]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <p>{header}</p>
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
            placeholder={placeholder}
            name={keyName}
            onBlur={onBlur}
            isInvalid={isInvalid}
          />
          <div
            className="addLink"
            onClick={() => push(linkinput.current.value, { keyName })}
          >
            <img src={plus} alt="addlink" />
          </div>
          <span className="error">{isInvalid}</span>
        </div>
      </div>

      <section className="dash__form-content_links col-span-4 md:col-span-2 sm:col-span-1 ">
        {title?.map((link, index1) => {
          return (
            <div className="dash__form-content_links-link ">
              <div
                className="dash__form-content_links-link-a"
                style={{ width: "165px" }}
              >
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
      </section>
    </>
  );
};

export default Addinput;
