import { Grid } from "@mui/material";
import { DataGrid, gridClasses, trTR } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import translate from "components/general/translate";

const AdminmessageTable = ({ data }) => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
    },
    // {
    //   field: "operation",
    //   headerName: "Actions",
    //   flex: 1,
    //   sortable: false,
    //   filterable: false,
    //   renderCell: (params) => (
    //     <>
    //       <CompanyInventoryActions {...{ params, rowId, setRowId }} />
    //       <IconButton size="small" onClick={() => deleteRow(params.row.id)}>
    //         <ClearIcon />
    //       </IconButton>
    //       <IconButton
    //         size="small"
    //         onClick={() => handleOpen(params.row.description)}
    //       >
    //         <InfoIcon />
    //       </IconButton>
    //     </>
    //   ),
    // },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          editMode="row"
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

export default AdminmessageTable;
