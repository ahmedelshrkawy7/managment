import React, { Component, useEffect, useContext } from "react";
import { serverApi } from "../../../../App";
import useAxios, { Axios } from "../../../api/Axios";

const Carddetails = () => {
  const {getData}= useAxios()

  const fetchPost = async () => {
    await 
   getData(`subdepartments`)
    .then((res) => console.log(res));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return <></>;
};

export default Carddetails;
