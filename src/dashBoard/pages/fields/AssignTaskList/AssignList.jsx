import { useEffect, useState } from "react";
import Location from "../../../includes/location/Location";
import task from "../../../assets/fields/task.svg";
import pen from "../../../assets/fields/edit-2.svg";
import trash from "../../../assets/fields/trash.svg";
import { Link } from "react-router-dom";
import useAxios from "../../../api/Axios";

const AssignList = () => {
  const [technologies, setTechnologies] = useState([]);
  const { getData } = useAxios();

  const fetchPost = async () => {
    try {
      const response = await getData(`/technologies`);
      setTechnologies(response.AllTechnologies);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <Location />
      <div className="dash__form">
        <div className="dash__form-header">
          <img src={task} alt="case" />
          <p style={{ color: "#fff" }}>Specialization List</p>
        </div>
        <form>
          <table>
            <tr>
              <th>Specialization</th>
              <th>Technology</th>
              <th>Action</th>
            </tr>

            {technologies.map((tech) => {
              return (
                <tr>
                  <td>{tech.specialization}</td>
                  <td>{tech.name}</td>
                  <td>
                    <div>
                      <img src={pen} alt="pen" />
                      <img src={trash} alt="trash" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
        </form>

        <div className="dash__form-confirm">
          <Link hidden></Link>
          <Link to="/tech">back</Link>
        </div>
      </div>
    </>
  );
};

export default AssignList;
