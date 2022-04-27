import TestAssignSeatsTable from "../components/FacultySeats/TestAssignSeatsTable";
import { useLocation, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
// import images from "../images";

const AssignSeatsPage = () => {
  const location = useLocation();

  if (location.state === null) {
    return <Navigate to="/" />;
  }
  const { id, crn, room, building } = location.state;
  console.log(room, building, id, crn);

  return (
    <div className="h-full">
      <center>
        <img
          src={require(`../images/${building}/${room}.png`)}
          width="350px"
          height="auto"
        ></img>
      </center>

      <Container>
        {/* <img src={require(`../images/${building}/${room}.png`)}></img> */}
        {/* <div className="flex">
          <img
            src={require(`../images/${building}/${room}.png`)}
            width="40%"
            height="40%"
          ></img>
        </div> */}
        <TestAssignSeatsTable item={{ id, crn, room, building }} />
      </Container>
    </div>
  );
};
export default AssignSeatsPage;
