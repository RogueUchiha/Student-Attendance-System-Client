import { Card } from "@mui/material";
import { Box } from "@mui/material";
import classes from "./StudentClassItem.module.css";

const StudentClassItem = ({ item }) => {
  const attendHandler = () => {
    alert(item.crn);
  };

  return (
    <Box>
      <Card className={classes.card}>
        <div>{`${item.dep}:${item.classNum} ${item.className}`}</div>
        <button onClick={attendHandler}>Record Attendance</button>
      </Card>
    </Box>
  );
};

export default StudentClassItem;
