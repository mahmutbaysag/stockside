import React, { useState, useEffect } from "react";

import { Grid, IconButton } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios.js";
import { useNavigate } from "react-router-dom";

import WorkerListActions from "./WorkerListActions";

const WorkerListTable = ({ data }) => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const deleteEmployee = (id) => {
    try {
      axios.delete(`/employee/clear/${id}`).then((res) => {
        const newRows = rows.filter((row) => row.id !== id);
        setRows(newRows);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const GotoUserProfile = (id) => {
    navigate(`/user/profile/${id}`);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      //goto user profile
      renderCell: (params) => (
        <div
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            color: "blue",
          }}
          onClick={() => {
            GotoUserProfile(params.row.id);
          }}
        >
          {params.row.name}
        </div>
      ),
    },
    {
      field: "surname",
      headerName: "Surname",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      editable: true,
      type: "boolean",
    },
    {
      field: "phone",
      headerName: "Phone",
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
          <WorkerListActions {...{ params, rowId, setRowId }} />
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
          onCellEditStop={(params) => setRowId(params.id)} //tek edit istiyorsan kullanacağım "edit mode = cell"
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
