import OverrideAttendanceTable from "../components/Faculty/OverrideAttendanceTable";
import { useLocation, Navigate } from "react-router-dom";
import { Container } from "@mui/material";

const AttendanceOverride = () => {
  //   const location = useLocation();

  //   if (location.state === null) {
  //     return <Navigate to="/" />;
  //   }
  //   const { id, crn } = location.state;

  return (
    <Container>
      <OverrideAttendanceTable />
    </Container>
  );
};
export default AttendanceOverride;
