import StudentReportsTable from "../components/Faculty/StudentReportsTable";
import { useLocation, Navigate } from "react-router-dom";
import { Container } from "@mui/material";

const StudentReportsPage = () => {
  //   const location = useLocation();

  //   if (location.state === null) {
  //     return <Navigate to="/" />;
  //   }
  //   const { id, crn } = location.state;

  return (
    <Container>
      <StudentReportsTable />
    </Container>
  );
};
export default StudentReportsPage;
