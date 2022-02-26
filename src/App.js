import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {!authCtx.isLoggedIn && <Route path="/" element={<HomePage />} />}
        {authCtx.isLoggedIn && <Route path="/" element={<StudentPage />} />}
        {/* <Route path="/" element={!authCtx.isLoggedIn && <HomePage />} /> */}
        {/* {authCtx.isLoggedIn && <StudentPage />}
            {!authCtx.isLoggedIn && <HomePage />} */}
        {/* </Route> */}
        {authCtx.isLoggedIn && (
          <Route path="/student" element={<StudentPage />} />
        )}
        {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
