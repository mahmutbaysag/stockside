import { Grid, TextField, Select, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios.js";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";
import translate from "components/general/translate";

const RegisterForm2 = () => {
  const { control, formState } = useFormContext();

  const [sectorData, serSectorData] = useState([]);

  useEffect(() => {
    const data = async () => {
      const res = await axios.get("sectors");
      serSectorData(res.data.Sector);
    };
    data();
  }, []);

  console.log(sectorData);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Controller
          name="company_name"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              error={Boolean(formState.errors.company_name)}
              variant="outlined"
              onChange={onChange}
              value={value}
              label={translate("Company Name")}
              sx={{ mb: 2 }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="company_phone"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              error={Boolean(formState.errors.company_phone)}
              variant="outlined"
              onChange={onChange}
              value={value}
              label={translate("Company Phone")}
              sx={{ mb: 2 }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="sector_id"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Select
              fullWidth
              error={Boolean(formState.errors.sector_id)}
              onChange={onChange}
              variant="outlined"
              value={value}
              label={translate("Sector")}
            >
              {sectorData.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default RegisterForm2;
