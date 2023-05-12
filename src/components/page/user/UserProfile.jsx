import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "app/hooks/useAuth";
import axios from "axios.js";
import Loading from "app/components/MatxLoading";
import * as Yup from "yup";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import translate from "components/general/translate";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  surname: Yup.string().required("Surname is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
  phone: Yup.string().required("Phone is required!"),
});

const initialValues = {
  name: "",
  surname: "",
  email: "",
  phone: "",
};

const UserProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState({});
  const [control2, setControl2] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    getProfile();
  }, [id]);

  const getProfile = async () => {
    await axios.get(`/user/${id}`).then((res) => {
      setData(res.data);
      reset(res.data);
      if (res.data.id != user.id) setControl2(true);
      else setControl2(false);
    });
  };

  if (!data) {
    return <Loading />;
  }

  const authority = (item) => {
    if (item == 0) return translate("Super Admin");
    else if (item == 1) return translate("Boss");
    else if (item == 2) return translate("Worker");
    else if (item == 3) return translate("unemployed");
  };

  const onSubmit = async (data) => {
    await axios.put(`/user/${id}`, data).then((res) => {
      setData(res.data);
    });
  };

  const GotoInventory = () => {
    navigate(`/user/inventory/${id}`);
  };

  const GotoCollectiveInventory = () => {
    navigate(`/user/collectiveinventoryadd/${id}`);
  };

  return (
    <Container fixed>
      <Card sx={{ mt: 5 }}>
        <CardHeader title={translate("User Profile")} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Card>
                <CardHeader
                  avatar={<Avatar>{data?.name?.charAt(0)}</Avatar>}
                  title={data?.name + " " + data?.surname}
                  // subheader={translate(`${authority(data?.user_level)}`)}
                  subheader={authority(data?.user_level)}
                />
                <CardContent>
                  <Grid container spacing={2}>
                    {user.company_id == data.company_id ? (
                      <>
                        <Grid item xs={6}>
                          {user.user_level == 1 ||
                            (user.id == data.id && (
                              <Button
                                variant="contained"
                                onClick={() => GotoInventory()}
                              >
                                {translate("view items in inventory")}
                              </Button>
                            ))}
                        </Grid>
                        <Grid item xs={6}>
                          {user.user_level == 1 && (
                            <Button
                              variant="contained"
                              onClick={() => GotoInventory()}
                            >
                              {translate("adding items to inventory")}
                            </Button>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          {user.user_level == 1 && (
                            <Button
                              variant="contained"
                              onClick={() => GotoCollectiveInventory()}
                            >
                              {translate(
                                "Collective adding items to inventory"
                              )}
                            </Button>
                          )}
                        </Grid>
                      </>
                    ) : (
                      ""
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Card>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Controller
                          name="name"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <TextField
                              onChange={onChange}
                              value={value}
                              label={translate("Name")}
                              variant="outlined"
                              fullWidth
                              disabled={control2}
                              error={errors.name}
                              helperText={errors.name?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Controller
                          name="surname"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <TextField
                              onChange={onChange}
                              value={value}
                              label={translate("Surname")}
                              variant="outlined"
                              fullWidth
                              disabled={control2}
                              error={errors.surname}
                              helperText={errors.surname?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <TextField
                              onChange={onChange}
                              value={value}
                              label={translate("Email")}
                              disabled={control2}
                              variant="outlined"
                              fullWidth
                              error={errors.email}
                              helperText={errors.email?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <TextField
                              onChange={onChange}
                              value={value}
                              label={translate("Phone")}
                              variant="outlined"
                              disabled={control2}
                              fullWidth
                              error={errors.phone}
                              helperText={errors.phone?.message}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="warning"
                          disabled={control2}
                        >
                          {translate("Update")}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
