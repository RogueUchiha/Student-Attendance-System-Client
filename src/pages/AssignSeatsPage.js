import TestAssignSeatsTable from "../components/FacultySeats/TestAssignSeatsTable";
import { useLocation, Navigate } from "react-router-dom";
import { Container } from "@mui/material";

const AssignSeatsPage = () => {
  const location = useLocation();

  if (location.state === null) {
    return <Navigate to="/" />;
  }
  const { id, crn } = location.state;

  return (
    <Container>
      <TestAssignSeatsTable item={{ id, crn }} />
    </Container>
  );
};
export default AssignSeatsPage;
