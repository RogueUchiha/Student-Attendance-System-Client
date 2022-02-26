import StudentClassItem from "./StudentClassItem";
import studentClasses from "../Data/StudentData";
// import
import { useState } from "react";

const StudentClassList = () => {
  const [classes, setClasses] = useState(studentClasses);

  return (
    <div>
      {classes.map((item) => (
        <StudentClassItem key={item.crn} item={item} />
      ))}
    </div>
  );
};

export default StudentClassList;
