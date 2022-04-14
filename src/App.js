import { Routes, Route, Navigate } from "react-router-dom";
import AssignSeatsPage from "./pages/AssignSeatsPage";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import FacultyPage from "./pages/FacultyPage";
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import StudentHeader from "./components/Layout/StudentHeader";
import AdminHeader from "./components/Layout/AdminHeader";
import BackupPage from "./pages/BackupPage";
import HomeRedirect from "./components/Auth/HomeRedirect";
import PrivateRoute from "./components/Auth/PrivateRoute";
import AttendanceOverride from "./pages/AttendanceOverride";
import FacultyHeader from "./components/Layout/FacultyHeader";

function App() {
  return (
    // <Layout>
    <Routes>
      {/* {!authCtx.isLoggedIn && <Route path="/" element={<HomePage />} />} */}
      {/* {authCtx.isLoggedIn && (
          <Route path="/student" element={<StudentPage />} />
        )} */}
      <Route element={<HomeRedirect />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Route>
      <Route element={<StudentHeader />}>
        <Route element={<PrivateRoute allowedRole="Student" />}>
          <Route path="/student" element={<StudentPage />} />
        </Route>
      </Route>
      {/* <Route path="/student" element={<StudentPage />} /> */}
      <Route element={<PrivateRoute allowedRole="Faculty" />}>
        <Route element={<FacultyHeader />}>
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/assign-seats" element={<AssignSeatsPage />} />
          <Route path="/override" element={<AttendanceOverride />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute allowedRole="Admin" />}>
        <Route element={<AdminHeader />}>
          <Route path="/admin" element={<BackupPage />} />
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
    // </Layout>
  );
}

export default App;
