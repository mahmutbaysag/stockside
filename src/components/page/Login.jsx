import React, { useEffect } from "react";
import { Button, Card, Grid, TextField } from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import translate from "components/general/translate";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { login, checkAuth } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const isValidToken = async (accessToken) => {
    if (!accessToken) {
      return false;
    }

    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp > currentTime) {
      try {
        await checkAuth();
        navigate("/dashboard");
      } catch (e) {
        localStorage.removeItem("accessToken");
      }
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    isValidToken(accessToken);
  }, []);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (e) {
      if (e.status === 401) toast.error(translate("Invalid email or password"));
      else toast.error(translate("Server error"));
    }
  };

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img
                src="/assets/images/illustrations/dreamer.svg"
                width="100%"
                alt=""
              />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue="admin@gmail.com"
                  rules={{ required: true }}
                  errors={errors}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      error={errors.email}
                      variant="outlined"
                      onChange={onChange}
                      value={value}
                      label={translate("Email")}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue="password"
                  rules={{ required: true }}
                  errors={errors}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      error={errors.password}
                      variant="outlined"
                      onChange={onChange}
                      value={value}
                      label={translate("Password")}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
                {/* <FlexBox justifyContent="space-between">
                  <NavLink
                    to="/session/forgot-password"
                    style={{ color: theme.palette.primary.main }}
                  >
                    {translate("Forgot Password")}
                  </NavLink>
                </FlexBox> */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ my: 2 }}
                  color="primary"
                >
                  {translate("Login")}
                </Button>
                <Paragraph>
                  {translate("Don't have an account?")}
                  <NavLink
                    to="/register"
                    style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                  >
                    {translate("Register")}
                  </NavLink>
                </Paragraph>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
      <ToastContainer />
    </JWTRoot>
  );
};

export default Login;
