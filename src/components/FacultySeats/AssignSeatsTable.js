import { useState, useEffect } from "react";
import { forwardRef } from "react";
import Grid from "@mui/material/Grid";

import MaterialTable from "@mui/material/Table";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Check from "@mui/icons-material/Check";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Remove from "@mui/icons-material/Remove";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Search from "@mui/icons-material/Search";
import ViewColumn from "@mui/icons-material/ViewColumn";
import axios from "axios";

const AssignSeatsTable = () => {
  const [data, setData] = useState([]);

  const tableIcons = {
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  useEffect(() => {
    // let userData = JSON.parse(localStorage.getItem("data"));
    axios
      .post("http://localhost:5000/getroster", {
        userid: 7,
        crn: 12755,
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data.roster);
      });
  }, []);

  var columns = [
    // { title: "id", field: "id", hidden: true },
    { title: "Name", field: "name" },
    { title: "Seat", field: "seat_num" },
  ];

  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          {/* <div>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div> */}
          <MaterialTable
            title="User data from remote source"
            columns={columns}
            data={data}
            icons={tableIcons}
            autoheight
            // editable={{
            //   onRowUpdate: (newData, oldData) =>
            //     new Promise((resolve) => {
            //       handleRowUpdate(newData, oldData, resolve);
            //     }),
            //   onRowAdd: (newData) =>
            //     new Promise((resolve) => {
            //       handleRowAdd(newData, resolve);
            //     }),
            //   onRowDelete: (oldData) =>
            //     new Promise((resolve) => {
            //       handleRowDelete(oldData, resolve);
            //     }),
            // }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
};
export default AssignSeatsTable;
