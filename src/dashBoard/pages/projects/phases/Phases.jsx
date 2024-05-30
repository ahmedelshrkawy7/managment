import React, { useEffect, useRef, useState, useContext } from "react";
import "./Phases.css";
import Location from "../../../includes/location/Location";
import case1 from "../../../assets/Form/briefcase.svg";
import bin from "../../../assets/Form/fluent_delete-28-regular.svg";
import upload from "../../../assets/Form/documentupload.svg";
import plus from "../../../assets/Form/icons.svg";

import axios from "axios";
import { Link } from "react-router-dom";
import { serverApi } from "../../../../App";
import Addinput from "../../../components/Addinput/Addinput";
import Selectinput from "../../../components/selectinput/Selectinput";
import { IoIosClose } from "react-icons/io";
import word from "../../../assets/Form/svgexport-18 1.svg";
import p from "../../../assets/Form/svgexport-10 (18) 1.svg";
import rar from "../../../assets/Form/svgexport-6 (2) 1.svg";
import Addattchments from "../../../components/Addattachments/Addattachments";
import useAxios from "../../../api/Axios";

const Phase = () => {
  const server = useContext(serverApi);

  let [links, setLinks] = useState([]);
  let [technology, setTechnology] = useState([]);
  let [images, setImages] = useState([]);
  let [docs, setDocs] = useState([]);
  let [docfiles, setDocfiles] = useState([]);
  let [Attachments, setAttachments] = useState([]);
  let [dependencies, setDependencies] = useState([]);
  let [allattachments, setAllattachments] = useState([]);
  let [departments, setDepartments] = useState([]);
  let [selectedDep, setSelectedDep] = useState([]);
  let [depIndex, setDepIndex] = useState([1]);
  let [subdepartments, setSubdepartments] = useState([]);
  let [employees, setEmployees] = useState([]);
  let [obj_view, setObj_view] = useState({});
  let [obj_api, setObj_api] = useState({});
  const {getData,postData}= useAxios()

  console.log(subdepartments);
  //  console.log(obj_view);

  let submitBtn = useRef(0);

  let [data, setData] = useState({
    title: "",
    description: "",
    status: "On going",
    start: "",
    end: "",
    attachments: [],
    links: [],
    project_teams: [],
  });

  console.log(data);

  const updateData = (Allattachments) => {
    setData({ ...data, attachments: [...Allattachments] });
  };

  const updateArray = (array, name) => {
    setData((prev) => {
      return { ...prev, [name]: [...array] };
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };
  let index;
  const handleSelect = (e, name, id) => {
    switch (name) {
      case "department_id":
        index =
          e.target.childNodes[e.target.selectedIndex].getAttribute("name");
        // setDepIndex(e.target.selectedIndex +1);
        handleParam(index);

        setSelectedDep(e.target.value);

        setObj_view((prev) => {
          return { ...prev, [e.target.value]: prev[e.target.value] || [] };
        });
        setObj_api((prev) => {
          return { ...prev, [name]: index };
        });
        break;

      case "subdepartment_id":
        index =
          e.target.childNodes[e.target.selectedIndex].getAttribute("name");

        employee(index);
        setObj_api((prev) => {
          return { ...prev, [name]: index };
        });

        break;

      case "employee_ids":
        index =
          e.target.childNodes[e.target.selectedIndex].getAttribute("name");

        setObj_view({
          ...obj_view,
          [selectedDep]: [
            ...obj_view[selectedDep],
            employees[e.target.selectedIndex - 1],
          ],
        });

        setObj_api((prev) => {
          return { ...prev, [name]: index };
        });

        let obj = { ...obj_api, [name]: index };

        setData({ ...data, project_teams: [...data["project_teams"], obj] });

        break;
    }
    // setObj_api( {[name] : e.target.selctedIndex} );
  };

  // useEffect(()=>{

  //   setData({...data , project_teams:[...data[ 'project_teams'],  obj_api  ]  })

  // },[obj_api['employee_ids']])

  const fetchPost = async () => {
    try {
      // await
      //  axios({
      //   method: "Get",
      //   url: `${server}/departments`,

      //   //  headers: headers, params:data
      // })
      getData(`/departments`)
      .then((res) => {
        setDepartments(res?.Departments);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleParam = async (id) => {
    try {
      await axios({
        method: "Get",
        url: `${server}/subdepartments`,
        params: {
          departments: [id],
        },
      }).then((res) => {
        setSubdepartments(res?.data?.data.Subdepartments);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const employee = async (id) => {
    try {
      await axios({
        method: "Get",
        url: `${server}/subdepartments/${id}/employees`,
      }).then((res) => {
        setEmployees(res?.data?.data?.employees);
        console.log(res);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // useEffect(()=>{
  //   setData( { ...data ,  attachments :[ ...Attachments]} )
  //   ;
  // },[Attachments]);

  useEffect(() => {
    setAllattachments([...Attachments, ...docfiles]);
  }, [Attachments, docfiles]);

  //   let push=(str,inputName)=>{

  //     if( str !==''){

  //        switch(inputName){

  //            case 'link' :
  //                let arr = [...links,str];
  //                setLinks((prev)=> [...prev ,str]);
  //                setData({...data , links : arr})
  //               linkinput.current.value='';
  //            break ;

  //            case 'tech' :

  //               //  let arr1 = [...technology,str];
  //                setTechnology((prev)=>[...prev , str]);
  //               //  setData({...data , technologies : arr1})

  //            break ;

  //            case 'dependencies' :

  //              setDependencies((prev)=>[...prev , str]);
  //               let arr2 = [...dependencies,str];
  //                setData({...data , dependencies : arr2})

  //            break ;
  //        }

  //     }
  //  }

  let remove = (index1, inputName) => {
    switch (inputName) {
      case "link":
        setLinks(
          links.filter((word, idx) => {
            return index1 !== idx;
          })
        );
        break;
      case "tech":
        setTechnology(
          technology.filter((word, idx) => {
            return index1 !== idx;
          })
        );
        break;
      case "images":
        setImages((prev) =>
          prev.filter((word, idx) => {
            return index1 !== idx;
          })
        );
        setAttachments((prev) =>
          prev.filter((word, idx) => {
            return index1 !== idx;
          })
        );

        break;
      case "docs":
        setDocs((prev) =>
          prev.filter((word, idx) => {
            return index1 !== idx;
          })
        );
        setDocfiles((prev) =>
          prev.filter((word, idx) => {
            return index1 !== idx;
          })
        );

        break;
    }
  };

  //    let addAttach =({target:{files}})=> {

  //     for (let i of files){
  //       // console.log(i)

  //       if(i.type.startsWith('image/')){
  //         setImages((prev)=>[...prev , URL.createObjectURL(i)]);
  //         setAttachments((prev)=>[ ...prev , i]);

  //       }

  //       else if(i.type.endsWith('pdf')){

  //         setDocs((prev)=>[...prev , {name: i.name , img: p ,type: 'pdf' }]);
  //         setDocfiles((prev)=> [...prev , i]);

  //       }
  //       else if(i.type.endsWith('document')){

  //         setDocs((prev)=>[...prev , {name: i.name , img: word ,type: 'word'}]);
  //         setDocfiles((prev)=> [...prev , i]);

  //       }
  //       else {

  //         setDocs((prev)=>[...prev , {name: i.name , img: rar ,type: 'rar'}]);
  //         setDocfiles((prev)=> [...prev , i]);

  //       }

  //     };

  // }

  //    let removeAttach=(index2)=>{
  //       setImages(images.filter(( word ,index)=>{return (index2 !== index)}));
  //       setAttachments(Attachments.filter((attach,index)=>{return(index2 !== index)}) );

  //    }

  const handleSubmit = async () => {
    submitBtn.current.click();
    console.log(data);
    await axios({
      method: "post",
      url: `${server}/ProjectPhases/1/phases`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  return (
    <>
      <Location main="Projects " head="Project List / Project Phases" />
      <div className="dash__create">
        <div className="dash__create-head">
          <h2> &nbsp; Project Phases</h2>
        </div>
        <div className="dash__create-button" hidden>
          <img src={plus} alt="plus" />
          <h2>Create new project</h2>
        </div>
      </div>
      <div className="dash__form">
        <div className="dash__form-header">
          <img src={case1} alt="case" />
          <p style={{ color: "#fff" }}>Project Phases</p>
        </div>
        <form>
          <div className="dash__form-content">
            <div className="dash__form-content_details">
              <div style={{ width: "50%" }}>
                <p>Phase</p>
                <input name="title" type="text" onChange={handleChange}></input>
              </div>

              <div>
                <p>Start Date</p>
                <input name="start" type="date" onChange={handleChange}></input>
              </div>

              <div>
                <p>Deadline</p>
                <input name="end" type="date" onChange={handleChange}></input>
              </div>
              <div>
                <p>Status</p>
                <select name="status" onChange={handleChange}>
                  <option>Completed</option>
                  <option>Delayed</option>
                  <option>On going</option>
                  <option>At risk</option>
                </select>
              </div>

              <div>
                <p>Priority</p>
                <select name="priority" onChange={handleChange}>
                  <option>low</option>
                  <option>high</option>
                </select>
              </div>

              <Addinput
                header="Dependencies"
                placeholder="Create home page and its product"
                fun={updateArray}
                keyName="dependencies"
              />
            </div>

            <div className="dash__form-content_projdetails">
              <div className="dash__form-content_projdetails-header">
                <p>Phase Discription</p>
              </div>
              <div className="dash__form-content_projdetails-input">
                <textarea
                  rows="4"
                  cols="50"
                  name="phase_discription"
                  onChange={handleChange}
                ></textarea>
                {/* <input rows="4" cols="50" type='text'name='description' onChange={handleChange} /> */}
              </div>
            </div>

            <Addattchments fun={updateData} />

            <Addinput
              header="Phase URLs"
              placeholder="http//:www.project.com"
              fun={updateArray}
              keyName="links"
            />
            <Addinput
              header="Phase Delivrables"
              placeholder="Create home page"
              fun={updateArray}
              keyName="targets"
            />

            <div className="dash__form-content_details">
              <Selectinput
                header="Department"
                fun={handleSelect}
                data={departments}
                name="department_id"
              />
              <Selectinput
                header="Specialization"
                fun={handleSelect}
                data={subdepartments}
                name="subdepartment_id"
              />
              <Selectinput
                header="Team Members"
                fun={handleSelect}
                data={employees}
                name="employee_ids"
              />
            </div>
            <div className="phase_team">
              {Object.keys(obj_view).map((field) => {
                return (
                  <>
                    <div className="phase_team-header">
                      <h4>{field}</h4>
                    </div>
                    <div className="phase_team-cards">
                      {obj_view[field].map((member) => {
                        return (
                          <div className="phase_team-cards_card">
                            <IoIosClose
                              color=" #1370E4"
                              size={24}
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                              }}
                              onClick={remove}
                            />
                            <div className="phase_team-cards_card-img">
                              <img src={member.image} alt="upload" />
                            </div>
                            <div className="phase_team-cards_card-conrent">
                              <h5>
                                {member.first_name} &nbsp;{member.last_name}
                              </h5>
                              <p>{member.technologies[0].name}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <button
            type="sumbit"
            hidden
            ref={submitBtn}
            onClick={(e) => e.preventDefault()}
          ></button>
        </form>

        <div className="dash__form-confirm">
          <Link
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
            style={{ width: "160px" }}
          >
            Save & Create New{" "}
          </Link>
          <Link>back</Link>
        </div>
      </div>
    </>
  );
};

export default Phase;
