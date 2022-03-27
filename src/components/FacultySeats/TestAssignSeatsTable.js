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
import classes from "./TestAssignSeatsTable.module.css";

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

export default function TestAssignSeatsTable({ item }) {
  const [data, setData] = useState({});

  useEffect(() => {
    // let userData = JSON.parse(localStorage.getItem("data"));
    axios
      .post("http://localhost:5000/getroster", {
        userid: item.id,
        crn: item.crn,
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data.roster);
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
    { field: "name", headerName: "Name", width: 180, editable: false },
    {
      field: "seat_num",
      headerName: "Seat Number",
      type: "number",
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
        getRowId={(row) => row.user_id}
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
