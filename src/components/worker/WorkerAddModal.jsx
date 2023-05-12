import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

const WorkerAddModal = ({ handleClose, open, handleAdd }) => {
  const initialValues = {
    email: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      handleAdd(data);
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "600px",
          height: "100%",
          maxHeight: "250px",
        },
        "& .MuiPaper-root": {},
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="alert-dialog-title">
          {"Company Worker Add"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default WorkerAddModal;
