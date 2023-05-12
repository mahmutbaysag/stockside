import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import panel1 from "./image/panel1.png";
import panel2 from "./image/panel2.png";
import pay from "./image/pay.png";
import contact from "./image/contact.png";
import {
  Grid,
  Container,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import translate from "components/general/translate";
import { Controller, useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: theme.palette.primary.dark,
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(30),
      paddingBottom: theme.spacing(30),
    },
  },
  description: {
    color: theme.palette.background.secondary,
  },
  primaryAction: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(2),
    },
  },
  secondaryAction: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

const HomePage = () => {
  const containerRef = useRef();
  const navigate = useNavigate();
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sections = gsap.utils.toArray(".panel");
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".container", //
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + containerRef.current.offsetWidth,
      },
    });
    getSettings();
  }, []);

  const classes = useStyles();

  const gotoLogin = () => {
    // navigate("/login");
    window.location.href = "/login";
  };

  const gotoRegister = () => {
    // navigate("/register");
    window.location.href = "/register";
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendContact = async (data) => {
    await axios
      .post("/contact", {
        name: data.name,
        email: data.email,
        message: data.message,
      })
      .then((res) => {
        if (res.status === 201) {
          reset();
          toast.success("Message sent successfully");
        }
      })
      .catch((err) => {
        toast.error("Message could not be sent");
      });
  };

  const getSettings = async () => {
    await axios.get("/settings").then((res) => {
      setSettings(res.data);
    });
  };

  const filterFunctinon = (key) => {
    const deger = settings?.filter((item) => item.key === key)[0];
    if (deger) return deger?.value;
    else return "";
  };

  return (
    <>
      <Grid item ref={containerRef} className="container">
        <section
          className="description panel blue"
          style={{ backgroundColor: "#222222" }}
        >
          <Container maxWidth="md">
            <Box textAlign="center" color="common.white">
              <Typography variant="h2" component="h2" gutterBottom={true}>
                <Typography color="secondary" variant="h2" component="span">
                  StokSide
                </Typography>
              </Typography>
              <Container maxWidth="sm">
                <Typography
                  variant="subtitle1"
                  paragraph={true}
                  className={classes.description}
                >
                  {translate("your company's stock tracking system.")}
                </Typography>
              </Container>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.primaryAction}
                  onClick={() => gotoRegister()}
                >
                  {translate("Register")}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.secondaryAction}
                  onClick={() => gotoLogin()}
                >
                  {translate("Login")}
                </Button>
              </Box>
            </Box>
          </Container>
        </section>
        <section className="panel red">
          <img className="img2" src={panel1} />
          <h2>Panel</h2>
          <p>
            {translate(
              "Thanks to this dashboard panel, you can instantly monitor the daily performance of your business and take your business decisions in a healthier and more accurate way."
            )}
          </p>
        </section>
        <section
          className="description panel blue"
          style={{ backgroundColor: "#222222" }}
        >
          <img className="img2" src={panel2} />
          <h2 style={{ color: "#FFAF38" }}>Panel</h2>
          <p style={{ color: "white" }}>
            {translate(
              "You will be able to easily see your company's products on our systems."
            )}
          </p>
        </section>
        <section className="panel red">
          <img src={pay} className="img2" />
          <h2> {translate("Pricing")} </h2>
          <p>
            {translate(
              "There is a $30 fee for lifetime access as the only payment option for now."
            )}
          </p>
        </section>
      </Grid>
      <section className="footer">
        <h2>{translate("Contact")}</h2>
        <form onSubmit={handleSubmit(sendContact)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <img src={contact} className="imgContact" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Name is required",
                }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    fullWidth
                    id="outlined-basic"
                    label={translate("Name")}
                    type="text"
                    variant="outlined"
                    style={{ marginBottom: "20px" }}
                    required
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    id="outlined-basic"
                    label={translate("Email")}
                    type="email"
                    variant="outlined"
                    style={{ marginBottom: "20px" }}
                    required
                  />
                )}
              />
              <Controller
                name="message"
                control={control}
                defaultValue=""
                rules={{
                  required: "Message is required",
                }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    id="outlined-basic"
                    label={translate("Message")}
                    type="text"
                    variant="outlined"
                    style={{ marginBottom: "20px" }}
                    required
                  />
                )}
              />

              <Button variant="contained" color="secondary" type="submit">
                {translate("Send")}
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <h2>{translate("Address")}</h2>
              <Button>{filterFunctinon("address")}</Button>
            </Grid>
            <Grid item xs={3}>
              <h2>{translate("Email")}</h2>
              <Button>{filterFunctinon("email")}</Button>
            </Grid>
            <Grid item xs={3}>
              <h2>Facebook</h2>
              <Button>
                <a
                  href={"https://" + filterFunctinon("facebook")}
                  target="_blank"
                >
                  {filterFunctinon("facebook")}
                </a>
              </Button>
            </Grid>
            <Grid item xs={3}>
              <h2>İnstagram</h2>
              <Button>
                <a
                  href={"https://" + filterFunctinon("instagram")}
                  target="_blank"
                >
                  {filterFunctinon("instagram")}
                </a>
              </Button>
            </Grid>
          </Grid>
        </form>
        <ToastContainer />
      </section>

      <style jsx="true">{`
        html {
          overflow-y: scroll;
          height: 100%;
          -webkit-overflow-scrolling: touch;
          overflow-scrolling: touch;
        }

        * {
          box-sizing: border-box;
        }

        body {
          overflow-y: visible;
          position: relative;
          height: unset;
          font-family: "Euclid Circular A", "Poppins";
          color: #222222;
          text-align: center;
        }

        html,
        body {
          overflow-x: hidden;
          margin: 0;
        }

        .container {
          width: 400%;
          height: 100vh;
          display: flex;
          flex-wrap: nowrap;
          background: #f7f7f7;
        }

        h2 {
          margin: 0px;
        }

        .img2 {
          width: 1000px;
          height: 600px;
          object-fit: contain;
        }

        .imgContact {
          width: 600px;
          height: 600px;
          object-fit: contain;
        }

        .banner h2 {
          margin: 20px 0;
        }

        nav {
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 60px;
          display: flex;
          gap: 20px;
          align-items: center;
          padding: 0 24px 0 16px;
          background: #ffffff;
          box-shadow: 0 0 20px rgb(0 0 0 / 8%);
        }

        nav a {
          text-decoration: none;
          color: inherit;
          font-size: 14px;
          font-weight: 600;
        }

        nav img {
          width: 32px;
          height: 32px;
        }

        section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          padding: 0 80px;
        }

        p {
          opacity: 0.66;
          font-size: 16px;
        }

        .banner {
          flex-direction: row;
          text-align: left;
          gap: 30px;
          background-size: cover;
          background-position: center;
          color: #f7f7f7;
        }

        .banner-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            rgb(57 53 86 / 0%),
            rgb(57 53 86 / 100%) 90%
          );
        }

        .banner h2 {
          font-size: 40px;
        }

        .banner h3 {
          margin: 0;
          opacity: 0.7;
        }

        .footer {
          background: #ffffff;
        }

        .panel {
          width: 100%;
          height: 100%;
        }

        .container .panel:nth-child(odd) {
          background: #f1f0f7;
        }

        form {
          padding: 0;
          margin: 0;
          display: grid;
          gap: 10px;
          padding-top: 20px;
        }

        input,
        textarea,
        button {
          font-family: inherit;
          border-radius: 6px;
          border: 0;
          background: #f1f0f7;
          padding: 16px;
          width: 340px;
          font-size: 16px;
        }

        button {
          background: #7b66fd;
          color: #f7f7f7;
          font-weight: 600;
          letter-spacing: 2px;
        }
      `}</style>
    </>
  );
};

export default HomePage;
