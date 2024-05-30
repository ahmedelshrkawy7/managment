import { useContext, useEffect, useState } from "react";
import Projectnum_card from "../../components/projectnum_card/Projectnum_card";
import { Location } from "../../routes/import";
import icon1 from "../../assets/project_managment/briefcase.svg";
import icon2 from "../../assets/home/cpu-setting.svg";
import icon3 from "../../assets/home/task-square.svg";
import icon4 from "../../assets/home/user.svg";
import Home_card from "../../components/home_card/Home_card";
import "./Home.css";
import AuthContext from "../../Auth/AuthProvider";
import useAxios from "../../api/Axios";
import Header from "../../components/Header/Header";
import { error } from "../../notifications/Toast";

const Home = () => {
  const [projects_count, setProjects_count] = useState([]);
  console.log("🚀 ~ Home ~ projects_count:", projects_count);
  const [projects, setProjects] = useState([]);
  const { getData } = useAxios();

  const { Auth } = useContext(AuthContext);
  console.log("🚀 ~ Home ~ Auth:", Auth.user.token);

  const fetchPost = async () => {
    const endpoints = ["projects", "dashboard"];
    try {
      Promise.all(
        endpoints.map((endpoint) =>
          getData(`${endpoint}`).catch((err) => {
            error(err?.response?.data?.message);
          })
        )
      ).then(([{ allprojects }, data]) => {
        setProjects(allprojects);
        setProjects_count(data);
      });
    } catch (err) {
      error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      fetchPost();
    }

    // webSocket("http://localhost:8000");
  }, []);

  return (
    <>
      <Location main="Dashboard" head="Home" />

      <Header text="Overview" />
      <div className="grid w-full grid-cols-4 lg:grid-cols-2  sm:grid-cols-1 gap-6  ">
        <Projectnum_card
          header="Projects Number"
          footer="Projects"
          num={projects_count?.Projects}
          icon={icon1}
          nav="/Project List"
        />
        <Projectnum_card
          header="Fields"
          footer="Fields"
          num={projects_count?.fields}
          icon={icon2}
          nav="/deplist"
        />
        <Projectnum_card
          header="Total Tasks"
          footer="Tasks"
          num={projects_count?.tasks}
          icon={icon3}
          nav="/Tasks List"
        />
        <Projectnum_card
          header="Teams"
          footer="Member"
          num={projects_count?.employees}
          icon={icon4}
          nav="/teamlist"
        />
      </div>

      <Header text=" Projects Summary" />

      <div className=" grid w-full  grid-cols-3   sm:grid-cols-1  xl:grid-cols-2   gap-8  ">
        {projects?.map((project) => {
          return <Home_card project={project} />;
        })}
      </div>
    </>
  );
};

export default Home;
