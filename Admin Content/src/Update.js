import React, { Component } from "react";
 
class Update extends Component {
  render() {
    return (
      <div>
        <div className="mainbody">

            <h1>Update Database</h1>
            <div className = "dtbinf">
            
            
            </div>
        </div>

        <div className="sidebar">
            <h1>Admin Tools</h1>

            <div id="reportModal"></div>

            <button class="button">Generate Report</button><br /><br />

            <button class="button">Push Notification</button><br /><br />

            <button class="button">Backup Database</button><br /><br />

            <button class="button">Update Database</button><br /><br />

            <button class="button">Upload CSV</button><br /><br />
        </div>

        <footer>
        Copyright &copy; 2021 by Benjamin Short, Clayton Akers, and Colton Cross
        </footer>
      </div>
    );
  }
}
 
export default Update;