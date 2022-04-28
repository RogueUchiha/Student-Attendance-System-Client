import React, { Component } from "react";
import {
    Routes,
    Route,
    NavLink,
    BrowserRouter
  } from "react-router-dom";
import Home from "./Home";
import AdminReportPage from "./AdminReportPage";
import AdminBackupPage from "./AdminBackupPage";
 
class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <header>
                        <h1>Golden Bear Attendance WebApp - Admin</h1>
                        <h2>Welcome Back.</h2>
                    </header>

                    <ul className="nav">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/report">Attendance Reports</NavLink></li>
                        <li><NavLink to="/backup">Backup Database</NavLink></li>
                    </ul>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home />}/>
                            <Route path="/report" element={<AdminReportPage />}/>
                            <Route path="/backup" element={<AdminBackupPage />}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
 
export default Main;