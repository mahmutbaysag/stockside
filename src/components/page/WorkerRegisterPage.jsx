import React, { useEffect } from "react";
import { Card, Grid, TextField, Button } from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Paragraph } from "app/components/Typography";
import translate from "components/general/translate";
import useAuth from "app/hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 1200,
    minHeight: 600,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

// inital login credentials
const initialValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
  password_again: "",
  phone: "",
};

// form field validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  surname: Yup.string().required("Surname is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
  password: Yup.string()
    .min(8, "Password must be 6 character length")
    .required("Password is required!"),
  password_again: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  phone: Yup.string().required("Phone is required!"),
});

const WorkerRegisterPage = () => {
  const { code } = useParams();
  useEffect(() => {
    console.log(code);
  }, [code]);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const theme = useTheme();

  const { workerRegister } = useAuth();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    reset(initialValues);
    console.log(data);
    try {
      workerRegister(
        data.name,
        data.surname,
        data.email,
        data.password,
        parseInt(data.phone),
        code
      );
      navigate("/dashboard");
    } catch (error) {
      toast.error(translate("An error occurred, please try again later"));
    }
  };
  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={4} xs={4}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={8} xs={12}>
            <Box p={4} height="100%">
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      autoComplate="off"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          error={Boolean(formState.errors.name)}
                          helperText={
                            formState.errors.name
                              ? formState.errors.name.message
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
                      name="surname"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          error={Boolean(formState.errors.surname)}
                          helperText={
                            formState.errors.surname
                              ? formState.errors.surname.message
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
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          error={Boolean(formState.errors.email)}
                          helperText={
                            formState.errors.email
                              ? formState.errors.email.message
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
                      name="phone"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          error={Boolean(formState.errors.phone)}
                          helperText={
                            formState.errors.phone
                              ? formState.errors.phone.message
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
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          type="password"
                          helperText={
                            formState.errors.password
                              ? formState.errors.password.message
                              : ""
                          }
                          error={Boolean(formState.errors.password)}
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
                      name="password_again"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          fullWidth
                          type="password"
                          autocomplate="new-password"
                          helperText={
                            formState.errors.password_again
                              ? formState.errors.password_again.message
                              : ""
                          }
                          error={Boolean(formState.errors.password_again)}
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
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button type="submit">{translate("Register")}</Button>
                </Box>
                <Paragraph>
                  {translate("Already have an account?")}
                  <NavLink
                    to="/login"
                    style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                  >
                    {translate("Login")}
                  </NavLink>
                </Paragraph>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <ToastContainer />
    </JWTRegister>
  );
};

export default WorkerRegisterPage;
