import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import useAuth from "app/hooks/useAuth";
import axios from "axios.js";
import useAuth from "app/hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { styled } from "@mui/system";
import translate from "components/general/translate";

const initialValues = {
  phone: "",
  email: "",
  address: "",
  facebook: "",
  instagram: "",
};

const Settings = () => {
  const navigate = useNavigate();
  let image = {};
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  const getSettings = async () => {
    let data = {};
    axios.get("/settings").then((res) => {
      res?.data.forEach((element) => {
        if (element.key != "logo") {
          data[element.key] = element.value;
        }
        reset(data);
      });
    });
  };

  useEffect(() => {
    if (user.user_level != 0) navigate(-1);
    getSettings();
  }, []);

  const onSubmit = async (data) => {
    let newData = new FormData();
    newData.append("phone", data.phone);
    newData.append("email", data.email);
    newData.append("address", data.address);
    newData.append("facebook", data.facebook);
    newData.append("instagram", data.instagram);
    if (image[0]) newData.append("logo", image[0]);
    axios.post("/settings", newData).then((res) => {
      console.log(res);
    });
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <Container fixed>
      <Card sx={{ mt: 5 }}>
        <CardHeader title={translate("Settings")} />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6} mb={2}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      style={{ marginBottom: 10 }}
                      label={translate("Phone")}
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      style={{ marginBottom: 10 }}
                      type="email"
                      label={translate("Email")}
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      style={{ marginBottom: 10 }}
                      label={translate("Address")}
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="facebook"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      style={{ marginBottom: 10 }}
                      label="Facebook"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <Controller
                  name="instagram"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      style={{ marginBottom: 10 }}
                      label="Instagram"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => {
                      image = e.target.files;
                    }}
                  />
                  <Button variant="contained" component="span">
                    {translate("Upload")}
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  {translate("Save")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Settings;
