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
import { Link } from "react-router-dom";

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

const FacultyClassItem = ({ item }) => {
  const [expanded, setExpanded] = React.useState(false);

  let userData = JSON.parse(localStorage.getItem("data"));

  const attendHandler = () => {
    // alert(item.crn);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // console.log(item.days[0].buildingCode);
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
    <Card sx={{ maxWidth: 500 }} className={classes.card}>
      <CardContent className={classes.cardcontent}>
        <div>{`${item.department} ${item.courseNumber}: ${item.courseName}`}</div>
        <Link
          to="/assign-seats"
          state={{
            id: userData.userid,
            crn: item.crn,
            room: item.days[0].roomNumber,
            building: item.days[0].buildingCode,
          }}
        >
          <button onClick={attendHandler} className="btn btn-primary">
            Assign Seats
          </button>
        </Link>
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
          <Typography paragraph>Meeting Times:</Typography>
          <Typography>
            {item.days.map((day) => {
              return (
                <div>
                  <p>{day.day}</p>
                  <ul>
                    <li>
                      {day.buildingCode} {day.roomNumber}{" "}
                      {convertTime(day.startTime)} to {convertTime(day.endTime)}
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

export default FacultyClassItem;
