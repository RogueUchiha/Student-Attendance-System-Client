import FacultyReportsTable from "../components/Faculty/FacultyReportsTable";
import { useLocation, Navigate } from "react-router-dom";
import { Container } from "@mui/material";

const FacultyReportsPage = () => {
  //   const location = useLocation();

  //   if (location.state === null) {
  //     return <Navigate to="/" />;
  //   }
  //   const { id, crn } = location.state;

  return (
    <Container>
      <FacultyReportsTable />
    </Container>
  );
};
export default FacultyReportsPage;
