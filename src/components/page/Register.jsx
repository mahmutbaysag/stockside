import React, { useState } from "react";
import {
  Card,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { useNavigate, NavLink } from "react-router-dom";
import * as Yup from "yup";

import RegisterForm1 from "components/register_form/RegisterForm1";
import RegisterForm2 from "components/register_form/RegisterForm2";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { Paragraph } from "app/components/Typography";
import translate from "components/general/translate";
const steps = [translate("user information"), translate("Company information")];

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
  user_name: "",
  user_surname: "",
  user_email: "",
  user_password: "",
  user_password_again: "",
  user_phone: "",
  company_name: "",
  company_phone: "",
  sector_id: "",
};

// form field validation schema
const validationSchema = Yup.object().shape({
  user_name: Yup.string().required("Name is required!"),
  user_surname: Yup.string().required("Surname is required!"),
  user_email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
  user_password: Yup.string()
    .min(8, "Password must be 6 character length")
    .required("Password is required!"),
  user_password_again: Yup.string().oneOf(
    [Yup.ref("user_password"), null],
    "Passwords must match"
  ),
  user_phone: Yup.string().required("Phone is required!"),
  company_name: Yup.string().required("Company name is required!"),
  company_phone: Yup.string().required("Company phone is required!"),
  sector_id: Yup.string().required("Company sector is required!"),
});

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm({
    mode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const theme = useTheme();

  const { handleSubmit, reset } = methods;

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = (data) => {
    handleReset();
    reset(initialValues);
    sessionStorage.setItem("RegisterData", JSON.stringify(data));
    navigate("/payment");
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
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      {translate(
                        "If you see this page, it means there is an error in the data you entered, please go back and fill in the red fields."
                      )}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        {translate("Back")}
                      </Button>
                      <Button type="submit">{translate("Send")}</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Grid sx={{ mt: 2, mb: 1 }}>
                      <FormProvider {...methods}>
                        {activeStep === 0 && <RegisterForm1 />}
                        {activeStep === 1 && <RegisterForm2 />}
                      </FormProvider>
                    </Grid>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        {translate("Back")}
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />

                      {activeStep === steps.length - 1 ? (
                        <Button onClick={handleNext}>
                          {translate("Finish")}
                        </Button>
                      ) : (
                        <Button onClick={handleNext}>
                          {translate("Next")}
                        </Button>
                      )}
                    </Box>
                  </React.Fragment>
                )}
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
    </JWTRegister>
  );
};

export default Register;
