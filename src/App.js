import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AssignSeatsPage from "./pages/AssignSeatsPage";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import FacultyPage from "./pages/FacultyPage";
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  const role = "Student";

  return (
    <Layout>
      <Routes>
        {/* {!authCtx.isLoggedIn && <Route path="/" element={<HomePage />} />} */}
        {authCtx.isLoggedIn && (
          <Route path="/student" element={<StudentPage />} />
        )}
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/student" element={<StudentPage />} /> */}
        {authCtx.isLoggedIn && (
          <Route path="/faculty" element={<FacultyPage />} />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/assign-seats" element={<AssignSeatsPage />} />
        )}
        {/* {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />} */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
