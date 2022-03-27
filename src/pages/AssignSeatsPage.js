import TestAssignSeatsTable from "../components/FacultySeats/TestAssignSeatsTable";
import { useLocation } from "react-router-dom";
import { Container } from "@mui/material";

const AssignSeatsPage = () => {
  const location = useLocation();
  const { id, crn } = location.state;
  return (
    <Container>
      <TestAssignSeatsTable item={{ id, crn }} />
    </Container>
  );
};
export default AssignSeatsPage;
