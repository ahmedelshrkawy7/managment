import React, { useContext, useEffect, useState } from "react";
// import './Special-list.css'
import Location from "../../../includes/location/Location";

import { Link } from "react-router-dom";
import useAxios from "../../../api/Axios";
import Table from "../../../includes/table/Table";
import LoadContext from "../../../components/loader/LoaderContext";
import { error } from "../../../notifications/Toast";

const SpecialList = () => {
  const { setLoader } = useContext(LoadContext);
  const th = ["Specialization", "Department Name", "Actions"];
  const attributes = ["Department"];
  const { getData } = useAxios();

  const [technologies, setTechnologies] = useState([]);

  const fetchPost = async () => {
    try {
      const response = await getData("/technologies");

      setTechnologies(response?.AllTechnologies);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      error(err);
    }
  };

  useEffect(() => {
    fetchPost();
    setLoader(true);
  }, []);

  return (
    <>
      <Location main="Specialization" head="Specialization List" />
      <div className="dash__form">
        {/* <div className='dash__form-header' >
                <img src={task} alt='case'/>
                <p style={{color:'#fff'}}>Specialization List</p>
            </div> */}

        {/* <Header text='Specialization List'/> */}

        <Table
          th={th}
          api="subdepartments"
          res_key="Subdepartments"
          attributes={attributes}
          edit_route="editsub"
          trash_route="true "
        />

        <div className="dash__form-confirm">
          <Link hidden></Link>
          {/* <Link to='/tech'>back</Link> */}
        </div>
      </div>
    </>
  );
};

export default SpecialList;
