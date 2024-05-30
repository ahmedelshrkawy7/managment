import React, { Component, useContext, useEffect, useState } from "react";
// import './Special-list.css'
import Location from "../../../includes/location/Location";
import task from "../../../assets/fields/task.svg";
import pen from "../../../assets/fields/edit-2.svg";
import trash from "../../../assets/fields/trash.svg";
import { Link } from "react-router-dom";
import useAxios from "../../../api/Axios";
import Table from "../../../includes/table/Table";
import Header from "../../../components/Header/Header";
import LoadContext from "../../../components/loader/LoaderContext";

const TechnologyList = () => {
  const { setLoader } = useContext(LoadContext);
  const th = ["Technology", "Subdepartment", "Actions"];
  const attributes = ["specialization"];
  const { getData } = useAxios();

  const [technologies, setTechnologies] = useState([]);
  console.log(technologies);

  const fetchPost = async () => {
    try {
      const response = await getData("/technologies");
      setTechnologies(response?.AllTechnologies);
      setLoader(false);
      console.log(response);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };
  

  useEffect(() => {
    fetchPost();
    setLoader(true);
  }, []);

  return (
    <>
      <Location main="Technologies" head="Technologies List" />
      <div className="dash__form">
        {/* <div className='dash__form-header' >
                <img src={task} alt='case'/>
                <p style={{color:'#fff'}}>Specialization List</p>
            </div> */}

        {/* <Header text='Specialization List'/> */}

        <Table
          th={th}
          api="technologies"
          res_key="Technologies"
          attributes={attributes}
          trash_route={true}
          edit_route="createtech"
        />
        {/* <form>
                <table>
                    
                        <tr>
                            <th>Specialization</th>
                            <th>Technology</th>
                            <th>Action</th>
                        </tr>
                
                    
                       
                    
                    {technologies?.map((tech)=>{
                        return(
                            
                        <tr>

                            <td>{tech.specialization}</td>
                            <td>{tech.name}</td>
                            <td><div><img src={pen} alt='pen'/><img src={trash} alt='trash'/></div></td>
                        
                         </tr>
                        )
                    })}
                    
                     
                
                   

                  
                </table>
            </form> */}

        <div className="dash__form-confirm">
          <Link hidden></Link>
          {/* <Link to='/tech'>back</Link> */}
        </div>
      </div>
    </>
  );
};

export default TechnologyList;
