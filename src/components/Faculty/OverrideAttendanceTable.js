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
  } = props;
  const [classCrn, setClassCrn] = useState("");
  const [classDate, setClassDate] = useState(new Date());

  const notifications = useNotifications();

  const setAttendanceBtn = () => {
    axios
      .post("http://localhost:5000/override", {
        id: 7,
        crn: classCrn,
        startDate: moment(classDate).format("YYYY-MM-DD"),
        endDate: moment(classDate).format("YYYY-MM-DD"),
      })
      .then((response) => {
        if (!response.data.error) {
          setCurrentClass(classCrn);
          setCurrentDate(classDate);
          console.log(response.data);
          setData(response.data.attendanceList);
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
  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.id]: e.target.value,
  //   }));
  // };

  // const handleClick = () => {
  //   const id = randomId();
  //   apiRef.current.updateRows([{ id, isNew: true }]);
  //   apiRef.current.startRowEditMode({ id });

  //   // Wait for the grid to render with the new row
  //   setTimeout(() => {
  //     apiRef.current.scrollToIndexes({
  //       rowIndex: apiRef.current.getRowsCount() - 1,
  //     });

  //     apiRef.current.setCellFocus(id, "name");
  //   });
  // };

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
              {/* <MenuItem value={12755}>Senior Project</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
              {facultyClasses.map((item) => (
                <MenuItem key={item.crn} value={item.crn}>
                  {item.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DatePicker
            label="Date"
            value={classDate}
            onChange={(newValue) => {
              setClassDate(newValue);
              console.log(moment(classDate).format("YYYY-MM-DD"));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </form>
      {/* <button className="btn" onClick={setAttendanceBtn}>
        Set Attendance
      </button> */}
      <Button onClick={setAttendanceBtn}>Submit</Button>
    </GridToolbarContainer>
  );
}

// EditToolbar.propTypes = {
//   apiRef: PropTypes.shape({
//     current: PropTypes.object.isRequired,
//   }).isRequired,
// };

export default function OverrideAttendanceTable() {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    crn: "",
    date: new Date(),
  });
  const [facultyClasses, setFacultyClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // useEffect(() => {
  //   // let userData = JSON.parse(localStorage.getItem("data"));
  //   axios
  //     .post("http://localhost:5000/override", {
  //       id: 7,
  //       crn: 12755,
  //       startDate: "2022-03-22",
  //       endDate: "2022-03-22",
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setData(response.data.attendanceList);
  //     });
  // }, []);

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

  const handleEditClick = (id) => (event) => {
    event.stopPropagation();
    apiRef.current.startRowEditMode({ id });
  };

  const handleSaveClick = (id) => async (event) => {
    // event.stopPropagation();
    // await apiRef.current.stopRowEditMode({ id });
    event.stopPropagation();
    console.log(apiRef.current.getRow(id));
    const beforeAttendance = apiRef.current.getRow(id).attendance;
    await apiRef.current.stopRowEditMode({ id });
    const { attendance } = apiRef.current.getRow(id);
    console.log(id, attendance);
    if (beforeAttendance === "Absent" && attendance === "Present") {
      axios
        .post("http://localhost:5000/submitoverride", {
          id,
          crn: currentClass,
          date: moment(currentDate).format("YYYY-MM-DD"),
        })
        .then((response) => {
          console.log(response);
        });
    } else if (beforeAttendance === "Present" && attendance === "Absent") {
      axios
        .post("http://localhost:5000/submitoverride", {
          id,
          crn: currentClass,
          date: moment(currentDate).format("YYYY-MM-DD"),
          action: "Remove",
        })
        .then((response) => {
          console.log(response);
        });
    }
  };

  const handleCancelClick = (id) => async (event) => {
    event.stopPropagation();
    await apiRef.current.stopRowEditMode({ id, ignoreModifications: true });

    const row = apiRef.current.getRow(id);
    if (row.isNew) {
      apiRef.current.updateRows([{ id, _action: "delete" }]);
    }
  };

  const processRowUpdate = async (newRow) => {
    return { ...newRow, isNew: false };
  };

  const columns = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "attendance",
      headerName: "Attendance",
      type: "singleSelect",
      valueOptions: ["Present", "Absent"],
      editable: true,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Edit",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = apiRef.current.getRowMode(id) === "edit";

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

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
          columns={columns}
          apiRef={apiRef}
          editMode="row"
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          // getRowId={(row) => row.id}
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
            },
            // updateDataHandler: { setData },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}
