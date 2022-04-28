import React, { Component } from "react";
import $ from "jquery";

class AdminBackupPage extends Component {

    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }
    
    async callAPI(route) {
        console.log("callAPI");
        await fetch("http://localhost:5000/" + route)
            .catch(err => err);
    }

    //TODO: FIX THIS - NOT SENDING STRING TO SERVER

    handleSubmit = (async event => {

        event.preventDefault();

        //alert("Backup Scheduled.");

        var form = event.target;

        var data = {
            schedule: parseForm(form)
        };

        await fetch("http://localhost:5000/AutomaticBackup", {
            method: "POST",
            body: JSON.stringify(data),
            mode: "cors",
            headers:{          
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        })
            .then(res => res.text())
            .then(body => {
                console.log(body)
            })
            .catch(err => err);

    })

  render() {
    return (
      <div>
        <div className="mainbody">
            <h1>Backup Database</h1>
            <div className = "dtbinf">
                <button className="button" onClick={() => this.callAPI("BackupDB")}>Manual Backup</button>
                <button className="button" onClick={() => this.callAPI("RestoreDB")}>Restore Backup</button>
                <button className="button" onClick={() => this.callAPI("DeleteDB")}>Delete Backup</button>

                <form onSubmit={this.handleSubmit}>

                    {/* Long, complicated list of form inputs for custom scheduling */}
                    
                    {/* Choose how often to backup */}
                    <h2>Schedule Automatic Backup</h2>
                    <br />
                    <label htmlFor="bkupTimesList">Backup database: </label>
                    <select name="bkupTimesList" id="bkupTimesList">
                        <option value ="Daily">Daily</option>
                        <option value ="Weekly">Weekly</option>
                        <option value ="TwiceWeekly">Twice per Week</option>
                        <option value ="Monthly">Monthly</option>
                        <option value ="TwiceMonthly">Twice per Month</option>
                    </select>

                    <br /><br />

                    {/* If Weekly is chosen above, ask for day of the week */}
                    <div className="formbox Weekly">
                        <label htmlFor="bkupWeekly">Day: </label>
                        <select name="bkupWeekly" id="bkupWeekly">
                            <option value ="0">Sunday</option>
                            <option value ="1">Monday</option>
                            <option value ="2">Tuesday</option>
                            <option value ="3">Wednesday</option>
                            <option value ="4">Thursday</option>
                            <option value ="5">Friday</option>
                            <option value ="6">Saturday</option>
                        </select>
                    </div>
                    
                    {/* If Twice Weekly is chosen above, ask for two days */}
                    <div className="formbox TwiceWeekly">
                        <label htmlFor="bkupTwiceWeekly_1">Day 1: </label>
                        <select name="bkupTwiceWeekly_1" id="bkupTwiceWeekly_1">
                            <option value ="0">Sunday</option>
                            <option value ="1">Monday</option>
                            <option value ="2">Tuesday</option>
                            <option value ="3">Wednesday</option>
                            <option value ="4">Thursday</option>
                            <option value ="5">Friday</option>
                            <option value ="6">Saturday</option>
                        </select>
                        <br />
                        <label htmlFor="bkupTwiceWeekly_2">Day 2: </label>
                        <select name="bkupTwiceWeekly_2" id="bkupTwiceWeekly_2">
                            <option value ="0">Sunday</option>
                            <option value ="1">Monday</option>
                            <option value ="2">Tuesday</option>
                            <option value ="3">Wednesday</option>
                            <option value ="4">Thursday</option>
                            <option value ="5">Friday</option>
                            <option value ="6">Saturday</option>
                        </select>
                    </div>
                    
                    {/* If Monthly is chosen above, ask for day of the month */}
                    <div className="formbox Monthly">
                        <label htmlFor="bkupMonthly">Day: </label>
                        <input name="bkupMonthly" id="bkupMonthly" type="number" min="1" max="31" />
                        <p>*Backups scheduled on the 29th - 31st of the month will be performed on the last day of the month where applicable</p>
                    </div>
                    
                    {/* If Twice Monthly is chosen above, ask for two days */}
                    <div className="formbox TwiceMonthly">
                        <label htmlFor="bkupTwiceMonthly_1">Day 1: </label>
                        <input name="bkupTwiceMonthly_1" id="bkupTwiceMonthly_1" type="number" min="1" max="31" />
                        <br />
                        <label htmlFor="bkupTwiceMonthly_2">Day 2: </label>
                        <input name="bkupTwiceMonthly_2" id="bkupTwiceMonthly_1" type="number" min="1" max="31" />
                        <p>*Backups scheduled on the 29th - 31st of the month will be performed on the last day of the month where applicable</p>
                    </div>

                    <br />
                    
                    {/* Get time of day to perform backup at */}
                    <label htmlFor="bkuptime">At time:</label>
                    <input type="time" name="bkuptime" id="bkuptime" required />
                    
                    <br /><br />

                    <br />
                    <input type="submit" value = "Schedule Backup"/>
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

//function to parse form data into cron format for scheduling automated backups
function parseForm(form){

    var result;

    //initialize variables for the days
    var day, day2;

    //get time to backup at and separate hours and minutes
    var time = form.bkuptime.value.toString();
    var hours = time.substring(0, time.indexOf(":"));
    var minutes = time.substring(time.indexOf(":")+1);

    //get how often the database will be backed up
    var freq = form.bkupTimesList.value

    //set result to string in cron format (sec min hour monthDay month weekDay) 
    //based on form values
    switch (freq){
        //schedule for every day at (time)
        //example: every day at 9:00 PM
        case "Daily":
            result = "0 " + minutes + " " + hours + " * * *"
        break;

        //schedule for every (weekday) per week at (time)
        //example: every Tuesday at 8:05 AM
        case "Weekly":
            day = form.bkupWeekly.value;
            result = "0 " + minutes + " " + hours + " * * " + day;
        break;

        //schedule for every (weekday) and (weekday) per week at (time)
        //example: every Monday and Friday at 7:00 PM
        case "TwiceWeekly":
            day = form.bkupTwiceWeekly_1.value;
            day2 = form.bkupTwiceWeekly_2.value;
            result = "0 " + minutes + " " + hours + " * * " + day + "," + day2;
        break;

        //schedule for every (monthday) per month at (time)
        //example: the 15th of every month at 6:30 PM
        case "Monthly":
            day = form.bkupMonthly.value;
            result = "0 " + minutes + " " + hours + " " + day + " * *";
        break;

        //schedule for every (monthday) and (monthday) per month at (time)
        //example: the 10th and 25th of every month at 6:00 AM
        case "TwiceMonthly":
            day = form.bkupTwiceMonthly_1.value;
            day2 = form.bkupTwiceMonthly_2.value;
            result = "0 " + minutes + " " + hours + " " + day + "," + day2 + " * *";
        break;   
    }

    //console.log(result);
    return result;
}
 
export default AdminBackupPage;