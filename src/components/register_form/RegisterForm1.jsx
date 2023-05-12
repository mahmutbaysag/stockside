import { Grid, TextField } from "@mui/material";
import React from "react";

import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";
import translate from "components/general/translate";

const RegisterForm1 = () => {
  const { control, formState } = useFormContext();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Controller
          name="user_name"
          control={control}
          defaultValue=""
          autoComplate="off"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              error={Boolean(formState.errors.user_name)}
              helperText={
                formState.errors.user_name
                  ? formState.errors.user_name.message
                  : ""
              }
              variant="outlined"
              onChange={onChange}
              value={value}
              label={translate("Name")}
              sx={{ mb: 2 }}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="user_surname"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              error={Boolean(formState.errors.user_surname)}
              helperText={
                formState.errors.user_surname
                  ? formState.errors.user_surname.message
                  : ""
              }
              variant="outlined"
              onChange={onChange}
              value={value}
              label={translate("Surname")}
              sx={{ mb: 2 }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="user_email"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              error={Boolean(formState.errors.user_email)}
              helperText={
                formState.errors.user_email
                  ? formState.errors.user_email.message
                  : ""
              }
              variant="outlined"
              onChange={onChange}
              value={value}
              label={translate("Email")}
              sx={{ mb: 2 }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="user_phone"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              error={Boolean(formState.errors.user_phone)}
              helperText={
                formState.errors.user_phone
                  ? formState.errors.user_phone.message
                  : ""
              }
              variant="outlined"
              onChange={onChange}
              value={value}
              label={translate("Phone Number")}
              sx={{ mb: 2 }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="user_password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              type="password"
              helperText={
                formState.errors.user_password
                  ? formState.errors.user_password.message
                  : ""
              }
              error={Boolean(formState.errors.user_password)}
              variant="outlined"
              onChange={onChange}
              value={value}
              label={translate("Password")}
              sx={{ mb: 2 }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Controller
          name="user_password_again"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              type="password"
              autocomplate="new-password"
              helperText={
                formState.errors.user_password_again
                  ? formState.errors.user_password_again.message
                  : ""
              }
              error={Boolean(formState.errors.user_password_again)}
              variant="outlined"
              onChange={onChange}
              value={value}
              label={translate("Password Again")}
              sx={{ mb: 2 }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default RegisterForm1;
