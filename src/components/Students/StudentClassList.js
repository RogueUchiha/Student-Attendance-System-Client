import StudentClassItem from "./StudentClassItem";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Grid } from "@mui/material";
import StudentClassItemTest from "./StudentClassItemTest";
import cssclasses from "./StudentClassList.module.css";
import axios from "axios";

const StudentClassList = () => {
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
    <Grid>
      <div className={cssclasses.cardlist}>
        {classes.map((item) => (
          <StudentClassItemTest key={item.crn} item={item} />
        ))}
      </div>
    </Grid>
  );
};

export default StudentClassList;
