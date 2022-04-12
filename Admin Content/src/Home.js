import React, { Component } from "react";
 
class Home extends Component {
  render() {
    return (
      <div>
        <div className="mainbody">

          <h1>Database Information</h1>
          <div className = "dtbinf">
            <h2>WVU Tech Database</h2>
            <h3>School Year: </h3>
            <p>2021-2022</p><br />
            <h3>Current Semester: </h3>
            <p>Spring 2022</p><br />
            <h3>Backup Schedule: </h3>
            <p>Every Monday at 8:00 PM</p>
            <a href="/backup">Change</a>
          </div>
        </div>

        <div className="sidebar">
          <h1>Admin Tools</h1>

          <div id="reportModal"></div>

            <button className="button">Generate Report</button><br /><br />

            <button className="button">Push Notification</button><br /><br />

            <button className="button">Backup Database</button><br /><br />

            <button className="button">Update Database</button><br /><br />

            <button className="button">Upload CSV</button><br /><br />
          </div>

          <footer>
            Copyright &copy; 2021 by Benjamin Short, Clayton Akers, and Colton Cross
          </footer>
      </div>
    );
  }
}
 
export default Home;