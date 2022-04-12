import React, { Component } from "react";
 
class Upload extends Component {
  render() {
    return (
      <div>
        <div className="mainbody">

            <h1>Upload CSV to Database</h1>
            <div className = "dtbinf">
                <h3>Last Upload: </h3>
                <p>2/11/2022</p>
                <h3>Upload CSV:</h3>
                <input type="file" accept=".csv" />
                <br /><br />
                <label htmlFor="csvcheck">Save backup of current database?</label>
                <input className="csvcheck" id="csvcheck" type="checkbox" />
                <br />
                <button className="button">Upload</button>
                <br />
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
 
export default Upload;