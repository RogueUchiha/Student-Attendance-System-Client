import { Routes, Route, Navigate } from "react-router-dom";
import AssignSeatsPage from "./pages/AssignSeatsPage";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import FacultyPage from "./pages/FacultyPage";
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import StudentHeader from "./components/Layout/StudentHeader";
import AdminHeader from "./components/Layout/AdminHeader";
//admin
import AdminPage from "./pages/AdminPage";
import AdminReportPage from "./pages/AdminReportPage";
import AdminBackupPage from "./pages/AdminBackupPage";
//admin
import BackupPage from "./pages/BackupPage";
import HomeRedirect from "./components/Auth/HomeRedirect";
import PrivateRoute from "./components/Auth/PrivateRoute";
import AttendanceOverride from "./pages/AttendanceOverride";
import FacultyReportsPage from "./pages/FacultyReportsPage";
import FacultyHeader from "./components/Layout/FacultyHeader";
import Home from "./pages/Home";
import NewAuthForm from "./components/Auth/NewAuthForm";
import NewFacultyHeader from "./components/Layout/NewFacultyHeader";
import NewStudentHeader from "./components/Layout/NewStudentHeader";
import StudentReportsPage from "./pages/StudentReportsPage";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    // <Layout>
    <>
      <Routes>
        {/* {!authCtx.isLoggedIn && <Route path="/" element={<HomePage />} />} */}
        {/* {authCtx.isLoggedIn && (
          <Route path="/student" element={<StudentPage />} />
        )} */}
        <Route element={<HomeRedirect />}>
          {/* <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route> */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<NewAuthForm />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route element={<NewStudentHeader />}>
          <Route element={<PrivateRoute allowedRole="Student" />}>
            <Route path="/student" element={<StudentPage />} />
            <Route path="/studentreports" element={<StudentReportsPage />} />
          </Route>
        </Route>
        {/* <Route path="/student" element={<StudentPage />} /> */}
        <Route element={<PrivateRoute allowedRole="Faculty" />}>
          <Route element={<NewFacultyHeader />}>
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/assign-seats" element={<AssignSeatsPage />} />
            <Route path="/override" element={<AttendanceOverride />} />
            <Route path="/facultyreports" element={<FacultyReportsPage />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute allowedRole="Admin" />}>
          <Route element={<AdminHeader />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/report" element={<AdminReportPage />}/>
            <Route path="/backup" element={<AdminBackupPage />}/>
          </Route>
        </Route>
        {/* {authCtx.isLoggedIn && (
          <Route path="/faculty" element={<FacultyPage />} />
          )}
          {authCtx.isLoggedIn && (
            <Route path="/assign-seats" element={<AssignSeatsPage />} />
          )} */}
        {/* {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />} */}
        {/* <Route element={<HomeRedirect />}> */}
        {/* </Route> */}
      </Routes>
      {/* <Footer /> */}
    </>
    // </Layout>
  );
}

export default App;
