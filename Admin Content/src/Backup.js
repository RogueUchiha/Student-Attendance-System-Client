import React, { Component } from "react";
import $ from "jquery"

class Backup extends Component {

    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }
    
    async callAPI(route) {
        console.log("callAPI");
        await fetch("http://localhost:9000/" + route)
            .catch(err => err);
    }

  render() {
    return (
      <div>
        <div className="mainbody">
            <h1>Backup Database</h1>
            <div className = "dtbinf">
                <button className="button" onClick={() => this.callAPI("BackupDB")}>Manual Backup</button>
                <button className="button">End Scheduled Backups</button>
                <button className="button" onClick={() => this.callAPI("RestoreDB")}>Restore Backup</button>
                <button className="button" onClick={() => this.callAPI("DeleteDB")}>Delete Backup</button>

                <form>
                    
                    <h2>Schedule Automatic Backup</h2>
                    <label htmlFor="bkupTimesList">Backup database: </label>
                    <select name="bkupTimesList" id="bkupTimesList">
                        <option value ="Daily">Daily</option>
                        <option value ="Weekly">Weekly</option>
                        <option value ="TwiceWeekly">Twice per Week</option>
                        <option value ="Monthly">Monthly</option>
                        <option value ="TwiceMonthly">Twice per Month</option>
                        <option value ="Once">Once</option>
                    </select>

                    <br /><br />
              
                    <div className="formbox Weekly">
                        <label htmlFor="bkupWeekly">Day: </label>
                        <select name="bkupWeekly" id="bkupWeekly">
                            <option value ="Mon">Monday</option>
                            <option value ="Tues">Tuesday</option>
                            <option value ="Wed">Wednesday</option>
                            <option value ="Thurs">Thursday</option>
                            <option value ="Fri">Friday</option>
                            <option value ="Sat">Saturday</option>
                            <option value ="Sun">Sunday</option>
                        </select>
                    </div>
                    
                    <div className="formbox TwiceWeekly">
                        <label htmlFor="bkupTwiceWeekly_1">Day 1: </label>
                        <select name="bkupTwiceWeekly_1" id="bkupTwiceWeekly_1">
                            <option value ="Mon">Monday</option>
                            <option value ="Tues">Tuesday</option>
                            <option value ="Wed">Wednesday</option>
                            <option value ="Thurs">Thursday</option>
                            <option value ="Fri">Friday</option>
                            <option value ="Sat">Saturday</option>
                            <option value ="Sun">Sunday</option>
                        </select>
                        <br />
                        <label htmlFor="bkupTwiceWeekly_2">Day 2: </label>
                        <select name="bkupTwiceWeekly_2" id="bkupTwiceWeekly_2">
                            <option value ="Mon">Monday</option>
                            <option value ="Tues">Tuesday</option>
                            <option value ="Wed">Wednesday</option>
                            <option value ="Thurs">Thursday</option>
                            <option value ="Fri">Friday</option>
                            <option value ="Sat">Saturday</option>
                            <option value ="Sun">Sunday</option>
                        </select>
                    </div>
                    
                    <div className="formbox Monthly">
                        <label htmlFor="bkupMonthly">Day: </label>
                        <input name="bkupMonthly" type="number" min="1" max="31" required />
                        <p>*Backups scheduled on the 29th - 31st of the month will be performed on the last day of the month where applicable</p>
                    </div>
                    
                    <div className="formbox TwiceMonthly">
                        <label htmlFor="bkupTwiceMonthly_1">Day 1: </label>
                        <input name="bkupTwiceMonthly_1" type="number" min="1" max="31" required />
                        <br />
                        <label htmlFor="bkupTwiceMonthly_2">Day 2: </label>
                        <input name="bkupTwiceMonthly_2" type="number" min="1" max="31" required />
                        <p>*Backups scheduled on the 29th - 31st of the month will be performed on the last day of the month where applicable</p>
                    </div>
                    
                    <div className="formbox Once">
                        <label htmlFor="bkupOnce">Day: </label>
                        <input name="bkupOnce" type="date" />
                    </div>

                    <br />
                    
                    <label htmlFor="bkuptime">At time:</label>
                    <input type="time" name="bkuptime" id="bkuptime" required />
                    
                    <br /><br />
                    
                    <label htmlFor="bkupNum">Keep the last</label>
                    <input name="bkupNum" type="number" min="0" />
                    <label htmlFor="bkupNum">backup(s) stored.</label>

                    <br /><br />
                    
                    <label htmlFor="bkupNum_2">Do not automatically delete backups</label>
                    <input type="checkbox" />

                    <br />
                    <button className="button">Schedule Backup</button>
                </form>

                
                
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

  componentDidMount() {
    $("select[name='bkupTimesList']").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            if(optionValue){
                $(".formbox").not("." + optionValue).hide();
                $("." + optionValue).show();
            } 
            else{
                $(".formbox").hide();
            }
        });
    }).change();

  }

}
 
export default Backup;