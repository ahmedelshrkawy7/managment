import React, { useState } from "react";
import { Select } from "@chakra-ui/react";
import bin from "../../assets/Form/fluent_delete-28-regular.svg";
import { IoIosArrowDown } from "react-icons/io";

const Select_add = ({ header, name, technologies, options, formik ,oldValues }) => {
  const [arrayshow, setArrayshow] = useState( oldValues || []);
 

  let push = (str, inputName) => {};

  let remove = (index) => {};

  return (
    <>
      <div>
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
          <Select
            type="url"
            name={name}
            onBlur={formik.handleBlur}
            value={`- Select ${header} -`}
            onChange={(e) => {
              setArrayshow((prev) => [...prev, e.target.value]);
              formik.setFieldValue(name, [
                ...formik.values[name],
                + e.target.childNodes[e.target.selectedIndex].getAttribute(
                  "name"
                ),
              ]);
            }}
            iconColor="var(--blue)"
            icon={<IoIosArrowDown />}
            isInvalid={formik.touched[name] && formik.errors[name]}
          >
            <option selected hidden value="">
              - Select {header} -
            </option>
            {options?.map((option, idx) => {
              return (
                <>
                  <option
                    name={option.id}
                    disabled={arrayshow.includes(option.name)}
                  >
                    {option.name}
                  </option>
                </>
              );
            })}
          </Select>
          <span className="error">
            {formik.touched[name] && formik.errors[name]}
          </span>
        </div>
      </div>
      {arrayshow[0] && (
        <section
          className="col-span-4 md:col-span-2 sm:col-span-1 gap-4 dash__form-content_links"
          style={{ width: "100%" }}
        >
          {arrayshow.map((element, index) => {
            return (
              <div className="dash__form-content_links-link">
                <div className="dash__form-content_links-link-a">
                  <a target="blank">{element}</a>
                </div>
                <div
                  className="dash__form-content_links-link-icon"
                  onClick={() => {
                    setArrayshow(
                      arrayshow.filter((val, idx) => {
                        return index !== idx;
                      })
                    );

                    formik.setFieldValue(
                       name ,
                      formik.values[name].filter((val, idx) => {
                        return index !== idx;
                      })
                    );
                  }}
                >
                  <img src={bin} alt="bin" />
                </div>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default Select_add;
