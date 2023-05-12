import React, { useState, useEffect } from "react";

import { Grid, IconButton } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios.js";

const WorkerListTable = ({ data }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const deleteEmployee = (id) => {
    try {
      axios.delete(`/tmp/worker/${id}`).then((res) => {
        const newRows = rows.filter((row) => row.id !== id);
        setRows(newRows);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Add - Name",
      flex: 1,
      valueGetter: (params) => params.row.user.name,
    },
    {
      field: "surname",
      headerName: "Add - Surname",
      flex: 1,
      valueGetter: (params) => params.row.user.surname,
    },
    {
      field: "url",
      headerName: "Url",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            title="remove"
            size="small"
            onClick={() => deleteEmployee(params.row.id)}
          >
            <ClearIcon />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <Grid container>
      <Grid item xs={12}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          editMode="cell"
          pageSizeOptions={[10, 20, 50, 100]}
          rowSelection={false}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? grey[200] : grey[900],
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default WorkerListTable;
