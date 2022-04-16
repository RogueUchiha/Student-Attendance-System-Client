import React, { Component } from "react";
import $ from "jquery";
import "jquery/dist/jquery.min.js"
import "datatables";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

var tableData;
 
class ReportGen extends Component {

    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }
    
    async callAPI() {
        //console.log("callAPI");
        await fetch("http://localhost:9000/DataFetch")
            .then(res => res.json())
            .then((data) => {
                tableData = data;
            })
            //.then(data => console.log(data))
            .catch(err => err);
        //console.log(tableData);

    }

  render() {
    return (
      <div>
        <div className="wrapper">
            <div className="mainbody">

                <h1>Generate Attendance Report</h1>
                <div className = "reportdiv">
                    <label htmlFor="reportClasses">Generate Class Report for: </label>
                    <select className="reportClasses" id="reportClasses">
                        <option value="ISYS102">ISYS102</option>
                        <option value="CYBE466">CYBE466</option>
                        <option value="CS481">CS481</option>
                    </select>

                    <br /><br />

                    <label htmlFor="reportInterval">Report Time Span: </label>
                    <input name="reportInterval" id="reportInterval" type="date" />
                    <label htmlFor="reportInterval2">to: </label>
                    <input name="reportInterval2" id="reportInterval2" type="date" />

                    <br /><br />

                    <button id="genbtn">Generate Report</button>
                    <button id="clearbtn">Clear Report</button>

                    <br /><br />
                    
                    <div id = "tablediv" className = "tablediv">

                        
                    </div>
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
        </div>

        <footer>
            Copyright &copy; 2021 by Benjamin Short, Clayton Akers, and Colton Cross
        </footer>
      </div>
    );
  }

//initialize JQuery on page load
componentDidMount(){

    //call fetch function to get data from database
    this.callAPI();
    //console.log(tableData);

    //variables for filter function
    var crs_data, date_data;

    //TODO: 
    //get it to read from database instead of txt file (WIP)

    //variables for table generation
    var table;
    var datatable;
    var table_generated = false;
    var flag = false;

    //function when Generate Report button is clicked
    $("#genbtn").on("click", function(){

        //generate the table
        gen_table();

        //get selected course
        var crs = document.getElementById("reportClasses").value.toString();

        //get selected date range
        var start_date = new Date($("#reportInterval").val());
        var end_date = new Date($("#reportInterval2").val());

        //convert to local time
        start_date.setUTCHours(0, 0, 0, 0);
        end_date.setUTCHours(0, 0, 0, 0);

        //pass to filterColumn
        filterColumn(crs, start_date, end_date);
        
    });

    //function to generate both the HTML table and the DataTable
    function gen_table(){

        //generate table only once by using a variable
        if (table_generated != true){
                
            //build HTML table and apply ID and class name
            let table = document.createElement("table");
            table.id = "reportTable";
            table.className = "display";

            //build HTML thead tag
            let thead = document.createElement("thead");

            //add thead tag to the table tag
            table.appendChild(thead);

            //build HTML table row for the header
            let tr = document.createElement("tr");

            //build HTML table columns and assign labels
            let sid = document.createElement("th");
            sid.innerHTML = "Student ID"; //ID

            let sname = document.createElement("th");
            sname.innerHTML = "Student Name"; //Name

            let course = document.createElement("th");
            course.innerHTML = "Course"; //Course

            let entrydate = document.createElement("th");
            entrydate.innerHTML = "Date"; //Date

            //add columns to the row
            tr.appendChild(sid);
            tr.appendChild(sname);
            tr.appendChild(course);
            tr.appendChild(entrydate);

            //add row to thead
            thead.appendChild(tr);

            //put the HTML table into the table div
            document.getElementById("tablediv").appendChild(table);

            //generate dataTable and save as pdf button
            datatable = $("#reportTable").DataTable( {
                //"ajax": tableData,

                data: tableData,
         
                "columns": [
                    { "data": "student_id" },
                    { "data": "student_name" },
                    { "data": "course" },
                    { "data": "date" }
                ],

                //dataType: "json",
                //data: data,

                dom: "Bfrtip",
                    buttons: [{
                      extend: "pdf",
                      text: "Save as PDF"
                    }]
             });

            //console.log(tableData);
            //datatable.rows.add(data);

            //change variable to prevent unnecessary generation attempts
            table_generated = true;

            }
        }

    //function to filter table data based on user inputs
    function filterColumn(crs, start_date, end_date){

        $.fn.DataTable.ext.search.pop();

        //JQuery DataTables search function to filter data
        $.fn.DataTable.ext.search.push( function(settings, data, dataIndex){

            //get date from the entry and convert to local time
            date_data = new Date(data[3]);
            date_data.setUTCHours(0, 0, 0, 0);

            //get course name from entry
            crs_data = data[2];

            //get all entries from specified class and within selected date range
            if (crs_data.toString() == crs){
                    
                if (
                    (!start_date && !end_date) ||
                    (!start_date && date_data <= end_date) ||
                    (start_date <= date_data && !end_date) ||
                    (start_date <= date_data && date_data <= end_date)
                ){

                    //only show entries matching this criteria
                    return true;
                }

                else return false;
            }
            else return false;

        });

        //redraw table after filter
        datatable.draw();
    }
        
    //function when Clear Report button is clicked
    $("#clearbtn").on("click", function(){

        //destroy both DataTable and HTML table
        datatable.destroy();
        datatable.destroy();

        //reset variable so table can be generated again
        table_generated = false;
    })

};

}
 
export default ReportGen;

