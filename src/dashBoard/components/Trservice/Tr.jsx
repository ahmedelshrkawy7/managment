import React, { useRef, useState } from "react";

const Tr = ({ handleBody, idx }) => {
  //   const key = useRef(0)
  const key = useRef(0);
  const value = useRef(0);

  const handleChange = () => {
    handleBody(key.current.value, value.current.value, idx);
  };

  return (
    <tr className="">
      <input
        className=""
        placeholder="Key"
        onChange={handleChange}
        ref={key}
        // onBlur={bodyChange}
      />
      <input
        placeholder="Value"
        onChange={handleChange}
        ref={value}
        // onBlur={bodyChange}
      />
      <input className=" " placeholder="Description" />
    </tr>
  );
};

export default Tr;
