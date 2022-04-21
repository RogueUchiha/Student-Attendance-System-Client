import FacultyClassList from "../components/Students/FacultyClassList";
import AssignSeatsTable from "../components/FacultySeats/AssignSeatsTable";
import TestAssignSeatsTable from "../components/FacultySeats/TestAssignSeatsTable";

const FacultyPage = () => {
  return (
    <div className="grid place-items-center">
      <FacultyClassList />
      {/* <TestAssignSeatsTable /> */}
    </div>
  );
  // return (
  //   <div>
  //     <FacultyClassList />
  //     <AssignSeatsTable />
  //   </div>
  // );
};
export default FacultyPage;
