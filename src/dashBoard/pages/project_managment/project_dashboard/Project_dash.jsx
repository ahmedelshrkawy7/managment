import { useContext, useState, useEffect } from "react";
import Project_card from "../../../components/project_card/Project_card";
import Projectnum_card from "../../../components/projectnum_card/Projectnum_card";
import icon4 from "../../../assets/project_managment/bag-tick-2.svg";
import icon2 from "../../../assets/project_managment/bag-cross.svg";
import icon3 from "../../../assets/project_managment/bag-timer.svg";
import icon1 from "../../../assets/project_managment/briefcase.svg";
import { Location } from "../../../routes/import";
import "./Project_dash.css";
import useAxios from "../../../api/Axios";
import LoadContext from "../../../components/loader/LoaderContext";
import { error } from "../../../notifications/Toast";

const Project_dash = () => {
  const { setLoader } = useContext(LoadContext);
  const [projects_count, setProjects_count] = useState([]);
  const [projects, setProjects] = useState([]);
  const {getData}= useAxios()

  // const projectnum = [{ header: "", num: "", icon: "" }];

  const fetchPost = async () => {
   
    try {
     
        getData(`/projects`)
       
      .then(( res) => {
        setProjects_count(res.project_counts);
        setProjects(res.allprojects);
        setLoader(false);
      });
    } catch (err) {
      error("Server Error");
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    fetchPost();
  }, []);

  return (
    <>
      <Location main="Project management" head="Project Dashboard " />

      {/* 
    <div className='dash__create'>
      <div className='dash__create-head'>
        
          <h2>Overview</h2>
      </div>
      
    </div> */}

      <div className="subtitle">
        <h2>Overview</h2>
      </div>

      <div className="w-full gap-4 grid grid-cols-4   md:grid-cols-2 sm:grid-cols-1">
        <Projectnum_card
          header="Total"
          footer="Projects"
          num={
            projects_count.completed_projects +
              projects_count.in_progress_projects +
              projects_count.delayed_projects || "0"
          }
          icon={icon1}
        />
        <Projectnum_card
          header="Completed "
          num={projects_count.completed_projects}
          footer="Projects"
          icon={icon2}
        />
        <Projectnum_card
          header="In Progress "
          num={projects_count.in_progress_projects}
          footer="Projects"
          icon={icon3}
        />
        <Projectnum_card
          header="Delayed "
          num={projects_count.delayed_projects}
          footer="Projects"
          icon={icon4}
        />
      </div>

      <div className="subtitle">
        <h2>Projects</h2>
      </div>

      <div className="w-full gap-4 grid grid-cols-4   md:grid-cols-2 sm:grid-cols-1 ">
        {projects.map((project) => {
          return (
            <>
              <Project_card project={project} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Project_dash;
