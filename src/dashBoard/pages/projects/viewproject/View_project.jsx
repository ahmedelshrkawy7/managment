import React, {
  Component,
  useRef,
  useEffect,
  useContext,
  useState,
} from "react";
import "./View_project.css";
import Location from "../../../includes/location/Location";
import case1 from "../../../assets/Form/briefcase.svg";
import { Link, useParams } from "react-router-dom";
import attach from "../../../assets/fields/Attach.png";
import plus from "../../../assets/fields/Plus Math.png";
import document from "../../../assets/fields/document-text.svg";
import trash from "../../../assets/Form/trash.svg";
import material from "../../../assets/Form/material-symbols_zoom-out-map-rounded.svg";
import download from "../../../assets/fields/import.svg";

import word from "../../../assets/Form/svgexport-18 1.svg";
import pdf from "../../../assets/Form/svgexport-10 (18) 1.svg";
import rar from "../../../assets/Form/svgexport-6 (2) 1.svg";
import useAxios, { Axios } from "../../../api/Axios";
import LoadContext from "../../../components/loader/LoaderContext";
import View_attachments from "../../../components/view_attachments/View_attachments";

const View_project = () => {
  let submitBtn = useRef(0);
  const { id } = useParams();
  const { setLoader } = useContext(LoadContext);
  const{getData} =useAxios()


  const [project, setProject] = useState([]);
  console.log("🚀 ~ file: View_project.jsx:25 ~ project:", project);

  let string = [];

  project?.technologies?.map((tech) => {
    string.push(tech.name + " , ");
  });

  const fetchPost = async () => {
    try {
      await
     
      getData(`/projects/${id}`)
      .then((res) => {
        setProject(res?.project);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPost();
    setLoader(true);
  }, []);

  //  for(technology of project?.technologies){
  //     console.log("🚀 ~ file: View_project.jsx:48 ~ technology:", technology)
  //     }

  const items = [
    { name: "Project Name", data: project.title },
    { name: "Project Type", data: project.type },
    { name: " Start Date ", data: project.start },
    { name: "Deadline ", data: project.end },
    { name: "Status", data: project.status },
    { name: "Technologies", data: [...string] },
  ];

  return (
    <>
      <Location main="Project List" head={project.title} />
      <div className="dash__form">
        <div className="dash__form-header">
          <img src={case1} alt="case" />
          <p style={{ color: "#fff" }}>{project.title}</p>
        </div>
        <form>
          <div className="dash__viewtask">
            <div className="dash__viewtask-img">
              <img src={project?.logo} alt="title" />
            </div>

            <div className="dash__viewtask-information">
              <h2 className="head">General Information :</h2>
              <div className="grid grid-cols-2 w-full bold">
                {items.map((item) => {
                  return (
                    <div className="flex gap-2 justify-start w-full">
                      <h3>{item.name}&nbsp;:</h3>
                      <p>&nbsp;{item.data}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="dash__viewtask-attachments">
              <View_attachments
                links={project?.links}
                attachs={project?.attachments}
              />
              {/* 
            <h2 className="head">URL :</h2>
           
                
                <div  className='dash__viewtask-attachments_content'>
                    <div>
                       <div className='attach-head'>
                         <img src={attach} alt=''/>
                         <h3 >Document Links</h3>
                       </div>
                       <div className='dash__form-content_links'>
                        
                        {
                                project?.links?.map((link)=>{
                                    return(
                                        <div className='dash__form-content_links-view'>
                                             <h3>{link}</h3>
                                        </div>
                                    )
                                })
                            }
                    

                                          
                          
                           
                       </div>
                    </div>



                    <div>
                        <div className='attach-head'>
                            <img src={attach} alt=''/>
                            <h3 >Attachments</h3>
                        </div>
                       
                        <div className='dash__form-content_attach_upload flex' style={{gap:'25px', flexWrap:'wrap', justifyContent:'flex-start'}} >

                            
                            
    
                                
                                    
                                    {project?.attachments?.map((attachment)=>{

                                      if( attachment.attachment_type == 'image'){

                                          return(
                                            <div className='dash__form-content_attach_upload-image' key={project.id}>
  
                                            <div className='dash__form-content_attach_upload-image_file'>
                                              
                                            <img src={attachment.attachment_path} alt='attach img'/>
                                            </div>

                                        </div>
              
                                          )
                                      }
                                    })}
    
                        </div>
                
                    </div>
              

                    <div>
                         <div className='attach-head'>
                            <img src={document} alt=''/>
                            <h3 > Documents</h3>
                        </div>


                        <div className='attach-files'>
                              
                        {project?.attachments?.map((attachment)=>{

                            if( attachment.attachment_type != 'image'){

                        

                                return(

                                    <div className='attach-file'>
                                        <div>
                                            <img src={pdf} alt='files'/>
                                        </div>
                                        <div>
                                            <h3>Project Details</h3>
                                            <p>20 page . 4,4 MB</p>
                                        </div>
                                        <div style={{marginLeft:'auto'}}>
                                            <img src={download} alt=''/>
                                        </div>
                                        
                                    </div>
                                )


                            }
                            })  }
                          
                        </div>
                        
                       
                    </div>
                </div> */}
            </div>

            <div className="dash__viewtask-details">
              <h2 className="head">Project Description :</h2>
              <div className="dash__viewtask-details_content">
                <h2>{project.description}</h2>
              </div>
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
          <Link hidden type="submit" /*onClick={()=>{handleSubmit()}}*/>
            {" "}
            create{" "}
          </Link>
          <Link to="/Project List"> back </Link>
        </div>
      </div>
    </>
  );
};

export default View_project;
