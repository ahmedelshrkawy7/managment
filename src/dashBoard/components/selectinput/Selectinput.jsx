import React,{useEffect, useRef, useState} from "react";
import { Select, Spinner } from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";

const Selectinput = ({ name, header, arr, fun, data, isInvalid, onBlur,onChange ,value }) => {


  const selectRef = useRef()


  
  

  return (
    <div className="flex flex-column items-start	" style={{ position: "relative" , gap:'.5rem',flexDirection:'column' }}>
      <p>{header}</p>
      <Select 
        name={name}
        onChange={(e) => {fun(e, name) }}
        iconColor="var(--blue)"
        icon={!!data?.length?<IoIosArrowDown />:<Spinner/>}
        onBlur={onBlur}
        isInvalid={isInvalid}
        disabled={value && ! !!data?.length}
        value={value}
      >
        

        <option selected hidden> -- select {header}</option>

        {data?.map((opt) => {
           
          return (
            <option name={opt.id}
            // disabled={disabled.includes(opt.name)}
            >
              {opt.title}
              {opt.first_name}&nbsp;{opt.last_name}
              {opt.government}
              {opt.name}
            </option>
          );
        })}
      </Select>
      <span className="error">{isInvalid}</span>
    </div>
  );
};

export default Selectinput;
