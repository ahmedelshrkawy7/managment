import React, { useEffect, useState, useContext } from "react";
import "./Allfields.css";
import Location from "../../../includes/location/Location";
import dots from "../../../assets/fields/more.svg";
import user from "../../../assets/fields/solar_user-rounded-linear.svg";
import cardimg from "../../../assets/fields/Ellipse 3260.svg";
import Personcard from "../../../components/personCard/Personcard";
import { useNavigate, useParams } from "react-router-dom";
import plus from "../../../assets/Form/icons.svg";
import { Link } from "react-router-dom";
import useAxios, { Axios } from "../../../api/Axios";
import LoadContext from "../../../components/loader/LoaderContext";
import { Scroll } from "../../../includes/scrollHorizantly/Scroll";
import { Spinner } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { notify, error } from "../../../notifications/Toast";

const Allfields = () => {
  const { setLoader } = useContext(LoadContext);
  const { id } = useParams();
  const [fetch, setFetch] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState([1]);
  const [techactive, setTechactive] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [in1, setI] = useState();

  const scrrollRef = Scroll();
  const scroool = Scroll();

  const navigate = useNavigate();
  const {getData,deleteData}=useAxios()
  const fetchPost = async () => {
    try {
      await
    
      getData(`/departments/${id}/subdepartments`)
      .then((res) => {
        setFetch(res?.specializations);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEmployees = async () => {
    try {
      await
     
      getData(`/technology-employees/${in1}`)
      .then((res) => {
        setEmployees(res?.Employees);
        setSpinner(false);
      });
    } catch (err) {
      console.log(err);
      error(err.response.data.message);
      setSpinner(false);
    }
  };

  useEffect(() => {
    setSpinner(true);
    fetchPost();
    fetchEmployees();
  }, [in1]);

  const handleDelete = async (id) => {
    await
   
    deleteData(`/technologies/${id}`)
      .then(() => {
        setFetch(
          fetch.filter((field, index) => {
            return field.id !== id;
          })
        );
        notify("Deleted successfully");
      })
      .catch((err) => {
        error(err.response.data.message);
      });
  };

  return (
    <>
      <Location main="Major" middle="Specialization" head="Technology" />
      <div className="dash__create">
        <div className="dash__create-head">
          <h4>
            <span>{fetch.length}</span> Total Specialization are added
          </h4>
        </div>
        <Link to="/createsub" className="dash__create-button">
          <img src={plus} alt="plus" />
          <h2>Specialization</h2>
        </Link>
      </div>

      <div className="dashboard_allfields">
        <div className="dashboard_allfields_toggle">
          {fetch.map((sub, index) => {
            return (
              <div
                className={active[index] ? "active" : ""}
                key={sub.id}
                onClick={() => {
                  setIndex(index);
                  setEmployees([]);
                  setI();
                  setTechactive([]);
                  setActive(() => {
                    let arr = [];
                    arr[index] = 1;
                    return arr;
                  });
                }}
              >
                <h5>{sub.title}</h5>
                <p>{sub.technologies.length} Technologies</p>
              </div>
            );
          })}
        </div>

        <form>
          <div className="dashboard_allfields-technology">
            {fetch[index]?.technologies.map((sub, index) => {
              return (
                <div
                  className={`dashboard_allfields-technology-card  ${
                    techactive[index] === 1 ? "active" : ""
                  }`}
                  key={sub.id}
                  onClick={() => {
                    setI(sub.id);
                    setTechactive(() => {
                      let arr = [];
                      arr[index] = 1;
                      return arr;
                    });
                  }}
                >
                  <div className="img">
                    <img src={sub.logo} alt="cardImg" />
                  </div>
                  <div className="dashboard_allfields-technology-card_content">
                    <div>
                      <h6>{sub.name}</h6>

                      {/* <section className="absolute top-5 right-4 ">
                  <Menu >    
                    <MenuButton >
                      <img className="dots"src={dots} alt="dots" />
                    </MenuButton>
                    <MenuList >
                      <MenuItem onClick={()=>{handleDelete(sub.id)}}>Delete</MenuItem>
                      <MenuItem onClick={()=>{navigate(`/`)}} >Edit</MenuItem>
                    </MenuList>
                  </Menu>
                </section> */}
                    </div>
                    <div style={{ gap: "10px" }}>
                      <img src={user} alt="user" />
                      <p> {sub.employees_count}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {spinner ? (
            <div className="flex w-full justify-center ">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="var(--blue)"
                size="xl"
              />{" "}
            </div>
          ) : (
            <div className="dashboard_allfields-employees " ref={scroool}>
              {employees?.map((person) => {
                return (
                  <Personcard
                    name={person.first_name}
                    experience={person.experience}
                    position={person.position}
                    image={person.image}
                    key={person.id}
                    id={person.id}
                  />
                );
              })}
            </div>
          )}
        </form>
        <div className="dash__form-confirm">
          <Link type="submit" hidden>
            Create
          </Link>
          <Link to="/deplist">Back</Link>
        </div>
      </div>
    </>
  );
};

export default Allfields;
