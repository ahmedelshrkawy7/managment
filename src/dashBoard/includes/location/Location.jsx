import React from "react";
import "./Location.css";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";

const Location = ({ main, head, middle }) => {
  return (
    <div className="dash__location">
      <div className="">
        <div className="dash__create-head">
          {/* <img src={task} alt='task'/> */}
          <h2 style={{ fontWeight: "550", fontSize: "24px" }}>{head}</h2>
        </div>
      </div>

      <div className="flex">
        <Breadcrumb spacing="8px" separator={<IoIosArrowForward />}>
          <BreadcrumbItem>
            <BreadcrumbLink>{main}</BreadcrumbLink>
          </BreadcrumbItem>

          {middle && (
            <BreadcrumbItem>
              <BreadcrumbLink>{middle}</BreadcrumbLink>
            </BreadcrumbItem>
          )}

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{head}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default Location;
