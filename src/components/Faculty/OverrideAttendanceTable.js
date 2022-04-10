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
} from "@mui/x-data-grid-pro";
import classes from "./OverrideAttendanceTable.module.css";

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

// function EditToolbar(props) {
//   const { apiRef } = props;

//   const handleClick = () => {
//     const id = randomId();
//     apiRef.current.updateRows([{ id, isNew: true }]);
//     apiRef.current.startRowEditMode({ id });

//     // Wait for the grid to render with the new row
//     setTimeout(() => {
//       apiRef.current.scrollToIndexes({
//         rowIndex: apiRef.current.getRowsCount() - 1,
//       });

//       apiRef.current.setCellFocus(id, "name");
//     });
//   };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
// }

// EditToolbar.propTypes = {
//   apiRef: PropTypes.shape({
//     current: PropTypes.object.isRequired,
//   }).isRequired,
// };

export default function OverrideAttendanceTable() {
  const [data, setData] = useState({});

  useEffect(() => {
    // let userData = JSON.parse(localStorage.getItem("data"));
    axios
      .post("http://localhost:5000/override", {
        id: 7,
        crn: 12755,
        startDate: "2022-03-22",
        endDate: "2022-03-22",
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data.attendanceList);
      });
  }, []);

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
    event.stopPropagation();
    await apiRef.current.stopRowEditMode({ id });
    // event.stopPropagation();
    // console.log(apiRef.current.getRow(id));
    // await apiRef.current.stopRowEditMode({ id });
    // const { user_id, seat_num } = apiRef.current.getRow(id);
    // console.log(user_id, seat_num);
    // axios
    //   .post("http://localhost:5000/assignseat", {
    //     userid: user_id,
    //     crn: item.crn,
    //     seatNumber: seat_num,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
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
        // components={{
        //   Toolbar: EditToolbar,
        // }}
        componentsProps={{
          toolbar: { apiRef },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
