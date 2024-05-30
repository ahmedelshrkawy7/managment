import React, { useContext, useEffect } from "react";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import App from "../../App";
import AuthContext from "../Auth/AuthProvider";

import {
  Department,
  Createfield,
  CreateSub,
  Allfields,
  CreateTechnology,
  SpecialList,
  Departlist,
  AssignTask,
  Carddetails,
  Viewtask,
  Setting,
  T_home,
  No_member,
  CreateMember,
  Member_details,
  CreateForm,
  Project,
  View_project,
  Newphase,
  Create_task,
  Viewtask_list,
  View_task,
  Project_dash,
  Projectcard_details,
  Task_home,
  Task_view,
  Home,
  Login,
  Fpwd,
  Otp,
  TechnologyList,
  Createadmin,
  Listadmin,
  Role,
  Editproject,
  Employeeview,
  CreateService,
} from "./import";

const Routesfile = () => {
  const { Auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logged = JSON.parse(localStorage.getItem("logged"));

  useEffect(() => {
    if (!logged) {
      if (location.pathname === "/login/forget") {
        return;
      } else if (location.pathname === "/login/forget/otp") {
        return;
      } else {
        navigate("/login");
      }
    } else if (logged) {
      if (location.pathname === "/login") {
        navigate("/");
      }
    }
  }, [location.pathname]);

  // if( Auth && location.pathname === ("/login")){
  //       navigate("/")
  // }

  return (
    <Routes>
      <Route path="/login" element={<Outlet />}>
        <Route index element={<Login />} />
        <Route path="/login/forget" element={<Fpwd />} />
        <Route path="/login/forget/otp" element={<Otp />} />
      </Route>

      <Route path="/" element={<App />}>
        {/* //////////////
             projects
         ////////////// */}

        <Route path="/createproject" element={<CreateForm />} />
        <Route path="/editproject/:id" element={<Editproject />} />
        <Route path="/Project List" element={<Project />} />
        <Route path="/projects/view/:id" element={<View_project />} />
        <Route path="/projects/Phase/:id" element={<Newphase />} />

        {/*           
         //////////////
             fields
         ////////////// */}

        {/* ----------------------  department --------------------*/}

        <Route path="/deplist" element={<Department />} />
        <Route path="/createdep" element={<Createfield />} />
        <Route path="/fields/:id" element={<Allfields />} />
        <Route path="/assignTask/:id/:name" element={<AssignTask />} />
        <Route path="/departlist" element={<Departlist />} />
        <Route path="/viewtask" element={<Viewtask />} />

        {/* ----------------------  specialization -------------------- */}

        <Route path="/createsub" element={<CreateSub />} />
        <Route path="/sublist" element={<SpecialList />} />
        <Route path="/Carddetails" element={<Carddetails />} />

        {/* ----------------------  specialization -------------------- */}
        <Route path="/createtech" element={<CreateTechnology />} />
        <Route path="/techlist" element={<TechnologyList />} />

        {/* //////////////
             settings
         ////////////// */}

        <Route path="/Settings" element={<Setting />} />

        {/* //////////////
             teams
         //////////////     */}

        <Route path="/teamlist" element={<T_home />} />
        <Route path="/createemployee" element={<CreateMember />} />
        <Route path="/empty" element={<No_member />} />
        <Route path="/member_details" element={<Member_details />} />
        <Route path="/member_Alldetails/:id" element={<Employeeview />} />

        {/* 
         //////////////
             project_managment Task Management
         ////////////// */}

        <Route path="/Task Management/list/view/:id" element={<View_task />} />
        <Route path="/Projects Dashboard" element={<Project_dash />} />
        <Route
          path="/Projects Dashboard/details/:projectid"
          element={<Projectcard_details />}
        />

        {/* //////////////
             tasks
         ////////////// */}

        <Route path="/Tasks List" element={<Viewtask_list />} />
        <Route path="/Task Managment" element={<Task_home />} />
        <Route path="/Tasks/view" element={<Task_view />} />
        <Route path="/Create Task" element={<Create_task />} />
        {/* //////////////
             Admin
         ////////////// */}

        <Route path="/createadmin" element={<Createadmin />} />
        <Route path="/adminlist" element={<Listadmin />} />
        {/* //////////////
             Roles
         ////////////// */}
        <Route path="/role" element={<Role />} />

        {/* <Route path="/Tasks List" element={<Viewtask_list />} />
        <Route path="/Task Managment" element={<Task_home />} /> */}

        {/* //////////////
             home
         ////////////// */}

        <Route index element={<Home />} />

        {/* //////////////
             CREATE SERVICE
         ////////////// */}

        <Route path="/createservice" element={<CreateService />} />
      </Route>
    </Routes>
  );
};

export default Routesfile;
