import React, { useEffect } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import translate from "components/general/translate";
const initialValues = {
  quantity: 0,
};

const validationSchema = Yup.object().shape({
  quantity: Yup.number()
    .required("Quantity is required!")
    .min(1)
    .typeError("Quantity must be a number!"),
});

const UserInventoryGeneralModal = ({
  open,
  setOpen,
  setActionId,
  setProductId,
  handleProcess,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const handleClose = () => {
    setOpen(false);
    setActionId(0);
    setProductId(0);
  };

  const handleAgree = (data) => {
    handleProcess(data);
    setOpen(false);
  };

  useEffect(() => {
    reset(initialValues);
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: 350,
        },
      }}
    >
      <form onSubmit={handleSubmit(handleAgree)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="quantity"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    label={translate("Quantity")}
                    variant="outlined"
                    fullWidth
                    error={errors.quantity}
                    helperText={errors.quantity?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={() => handleClose()}>
            {translate("Close")}
          </Button>
          <Button type="submit">{translate("Update")}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserInventoryGeneralModal;
