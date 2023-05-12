import React, { useEffect, useMemo, useState } from "react";

import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Grid, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";

import CompanyInventoryActions from "./CompanyInventoryActions";
import DetailModal from "components/general/DetailModal";
import axios from "axios.js";
import translate from "components/general/translate";

const CompanyInventoryTable = ({ data }) => {
  const [rowId, setRowId] = useState(null);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [detailData, setDetailData] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const deleteRow = (id) => {
    try {
      axios.delete(`/company/inventory/${id}`).then((res) => {
        const newRows = rows.filter((row) => row.id !== id);
        setRows(newRows);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = (data) => {
    setOpen(true);
    setDetailData(data);
  };

  const columns = [
    {
      field: "name",
      headerName: "name",
      flex: 1,
      valueGetter: (params) => params.row.product.name,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
      editable: true,
    },
    {
      field: "recycle",
      headerName: "Recycle",
      flex: 1,
      editable: true,
      type: "boolean",
    },
    {
      field: "operation",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <CompanyInventoryActions {...{ params, rowId, setRowId }} />
          <IconButton size="small" onClick={() => deleteRow(params.row.id)}>
            <ClearIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleOpen(params.row.description)}
          >
            <InfoIcon />
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
          editMode="row"
          pageSizeOptions={[10, 20, 50, 100]}
          rowSelection={false}
          // onCellEditStop={(params) => setRowId(params.id)} //tek edit istiyorsan kullanacağım "edit mode = cell"
          onRowEditStop={(params) => setRowId(params.id)}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? grey[200] : grey[900],
            },
          }}
        />
      </Grid>
      <DetailModal
        open={open}
        setOpen={setOpen}
        title={translate("Company Product Detail")}
        subheader={translate("Detail")}
        data={detailData}
      />
    </Grid>
  );
};

export default CompanyInventoryTable;
