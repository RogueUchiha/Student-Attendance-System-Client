import FacultyClassItem from "./FacultyClassItem";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";

const FacultyClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = () => {
    let userData = JSON.parse(localStorage.getItem("data"));
    axios
      .post("http://localhost:5000/getcourses", {
        userid: userData.userid,
        role: userData.role,
      })
      .then((response) => {
        console.log(response.data);
        setClasses(response.data);
      });
  };

  return (
    <div>
      {classes.map((item) => (
        <FacultyClassItem key={item.crn} item={item} />
      ))}
    </div>
  );
};

export default FacultyClassList;
