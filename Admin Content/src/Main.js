import React, { Component } from "react";
import {
    Routes,
    Route,
    NavLink,
    BrowserRouter
  } from "react-router-dom";
import Home from "./Home";
import ReportGen from "./ReportGen";
import Backup from "./Backup";
import Update from "./Update";
import Upload from "./Upload";
 
class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <header>
                        <h1>Golden Bear Attendance WebApp - Admin</h1>
                        <h2>Welcome Back, (Name)</h2>
                    </header>

                    <ul className="nav">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/report">Attendance Reports</NavLink></li>
                        <li><NavLink to="/backup">Backup Database</NavLink></li>
                        <li><NavLink to="/update">Update Database</NavLink></li>
                        <li><NavLink to="/upload">Upload CSV</NavLink></li>
                    </ul>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Home />}/>
                            <Route path="/report" element={<ReportGen />}/>
                            <Route path="/backup" element={<Backup />}/>
                            <Route path="/update" element={<Update />}/>
                            <Route path="/upload" element={<Upload />}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
 
export default Main;