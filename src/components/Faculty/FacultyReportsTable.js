import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  useGridApiRef,
  DataGridPro,
  GridActionsCellItem,
  GridToolbarContainer,
} from "@mui/x-data-grid-pro";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import classes from "./OverrideAttendanceTable.module.css";
import moment from "moment";
import { Notification } from "@mantine/core";
import { Notifications } from "@mui/icons-material";
import { useNotifications } from "@mantine/notifications";

// const rows = [
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     seat: null,
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     seat: 2,
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     seat: null,
//   },
// ];

function EditToolbar(props) {
  const {
    apiRef,
    setData,
    facultyClasses,
    setFormData,
    setCurrentClass,
    setCurrentDate,
    setColumnData,
  } = props;
  const [classCrn, setClassCrn] = useState("");
  const [classStartDate, setClassStartDate] = useState(new Date());
  const [classEndDate, setClassEndDate] = useState(new Date());

  const notifications = useNotifications();

  const setAttendanceBtn = () => {
    axios
      .post("http://localhost:5000/facultyreport", {
        id: 7,
        crn: classCrn,
        role: "Faculty",
        startDate: moment(classStartDate).format("YYYY-MM-DD"),
        endDate: moment(classEndDate).format("YYYY-MM-DD"),
      })
      .then((response) => {
        if (!response.data.error) {
          // setCurrentClass(classCrn);
          // setCurrentDate(classStartDate);
          // console.log(response.data);
          // setData(response.data.attendanceList);
          console.log(response.data);
          // console.log(Object.keys(response.data.AttendanceData[0]));
          // const newColumns = [];
          // response.data.AttendanceData.map((student) => {});
          const keys = Object.keys(response.data.AttendanceData[0]);
          const keysSlice = keys.slice(2);
          console.log(keysSlice);
          const newColumns = keysSlice.map((key) => {
            const column = {
              field: key,
              headerName: key,
              editable: false,
            };
            return column;
          });
          console.log(newColumns);
          setColumnData((prevState) => [...prevState, ...newColumns]);
          setData(response.data.AttendanceData);
        } else {
          // console.log(response.data.error);
          // notifications.showNotifications()
          notifications.showNotification({
            title: "Error",
            message: "No attendance data for the selected day",
            color: "red",
          });
        }
      });
  };

  const handleChange = (event) => {
    setClassCrn(event.target.value);
    console.log(classCrn);
  };

  const columns2 = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "attendance",
      headerName: "Attendance",
      type: "singleSelect",
      valueOptions: ["Present", "Absent"],
      editable: true,
    },
    {
      field: "attendance2",
      headerName: "Attendance2",
      type: "singleSelect",
      valueOptions: ["Present", "Absent"],
      editable: true,
    },
  ];

  const updateColumns = () => {
    setColumnData(columns2);
  };

  return (
    <GridToolbarContainer>
      <form action="">
        <div className={classes.editToolbar}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={classCrn}
              label="Age"
              onChange={handleChange}
            >
              {facultyClasses.map((item) => (
                <MenuItem key={item.crn} value={item.crn}>
                  {item.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DatePicker
            label="Start Date"
            value={classStartDate}
            onChange={(newValue) => {
              setClassStartDate(newValue);
              console.log(moment(classStartDate).format("YYYY-MM-DD"));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={classEndDate}
            onChange={(newValue) => {
              setClassEndDate(newValue);
              console.log(moment(classEndDate).format("YYYY-MM-DD"));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </form>
      {/* <button className="btn" onClick={setAttendanceBtn}>
        Set Attendance
      </button> */}
      <Button onClick={setAttendanceBtn}>Submit</Button>
      <Button onClick={updateColumns}>Update Columns</Button>
    </GridToolbarContainer>
  );
}

// EditToolbar.propTypes = {
//   apiRef: PropTypes.shape({
//     current: PropTypes.object.isRequired,
//   }).isRequired,
// };

export default function FacultyReportsTable() {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    crn: "",
    date: new Date(),
  });
  const [facultyClasses, setFacultyClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [columnData, setColumnData] = useState([
    { field: "name", headerName: "Name", width: 180, editable: false },
  ]);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = () => {
    let userData = JSON.parse(localStorage.getItem("data"));
    axios
      .post("http://localhost:5000/getcourses", {
        userid: userData.userid,
        role: userData.role,
      })
      .then((response) => {
        console.log(response.data);
        setFacultyClasses(response.data);
        // setClasses(response.data);
      });
  };

  const apiRef = useGridApiRef();

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const processRowUpdate = async (newRow) => {
    return { ...newRow, isNew: false };
  };

  // const columns = [
  //   { field: "name", headerName: "Name", width: 180, editable: true },
  //   {
  //     field: "attendance",
  //     headerName: "Attendance",
  //     type: "singleSelect",
  //     valueOptions: ["Present", "Absent"],
  //     editable: true,
  //   },
  // ];

  return (
    <div>
      <Box
        className={classes.gridtable}
        sx={{
          height: 500,
          width: "100%",
          // backgroundColor: "primar",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGridPro
          rows={data}
          columns={columnData}
          apiRef={apiRef}
          editMode="row"
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          getRowId={(row) => row.students_user_id}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: {
              apiRef,
              facultyClasses,
              setData,
              setFormData,
              setCurrentClass,
              setCurrentDate,
              setColumnData,
            },
            // updateDataHandler: { setData },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}
