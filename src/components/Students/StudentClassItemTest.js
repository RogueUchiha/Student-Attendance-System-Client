import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import classes from "./StudentClassItemTest.module.css";
import { Button } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StudentClassItemTest = ({ item }) => {
  const [expanded, setExpanded] = React.useState(false);

  const notifications = useNotifications();

  const attendHandler = () => {
    // alert(item.crn);
    // notifications.showNotification({
    //   title: "Default notification",
    //   message: "Hey there, your code is awesome! 🤥",
    // });
    // console.log(item.days[0]);
    if (item.days[0].seatNumber == null) {
      notifications.showNotification({
        title: "Error",
        message: "You have not been assigned a seat yet.",
        color: "red",
      });
    } else {
      let userData = JSON.parse(localStorage.getItem("data"));
      axios
        .post("http://localhost:5000/student", {
          userid: userData.userid,
          crn: item.crn,
        })
        .then((response) => {
          console.log(response);
        });
      notifications.showNotification({
        title: "Success",
        message: `You have submitted your attendance for ${item.courseName}`,
        color: "green",
      });
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const convertTime = (time) => {
    const splitTime = time.split(":");
    const date = new Date();
    date.setHours(splitTime[0], splitTime[1], splitTime[2]);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const timeString = date.toLocaleString("en-US", options);
    return timeString;
  };

  return (
    <Card sx={{ width: 400 }} className={classes.card}>
      <CardContent className={classes.cardcontent}>
        <div>{`${item.department} ${item.courseNumber}: ${item.courseName}`}</div>
        {/* <button onClick={attendHandler}>Record Attendance</button> */}
        {/* <Button
          variant="gradient"
          gradient={{ from: "#002855", to: "#eaaa00" }}
          gradient={{ from: "blue", to: "yellow" }}
          onClick={attendHandler}
        >
          Record Attendance
        </Button> */}
        <button className="btn btn-primary">Record Attendance</button>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Instructor: {item.instructor}</Typography>
          <Typography paragraph>Meeting Times:</Typography>
          <Typography>
            {item.days.map((day) => {
              return (
                <div key={item.crn}>
                  <p>{day.day}</p>
                  <ul style={{ listStyle: "none" }}>
                    <li>
                      {day.buildingCode} {day.roomNumber}{" "}
                      {convertTime(day.startTime)} to {convertTime(day.endTime)}
                    </li>
                    <li>
                      Seat:{" "}
                      {day.seatNumber != null
                        ? day.seatNumber
                        : "No seat assigned"}
                    </li>
                  </ul>
                  <br />
                </div>
              );
            })}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default StudentClassItemTest;
