import { Button, Card, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useNavigate } from "react-router-dom";
import useAuth from "app/hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import translate from "components/general/translate";
const PaymentPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRegisterData = sessionStorage.getItem("RegisterData");
    if (userRegisterData === null) {
      navigate("/register");
    }
  }, []);

  const { register } = useAuth();

  const userRegisterData = sessionStorage.getItem("RegisterData");
  console.log(JSON.parse(userRegisterData));

  const [data, setData] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const handleInputFocus = (e) => {
    setData({ ...data, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const CardNumberControl = (cc) => {
    let amex = new RegExp("^3[47][0-9]{13}$");
    let visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
    let cup1 = new RegExp("^62[0-9]{14}[0-9]*$");
    let cup2 = new RegExp("^81[0-9]{14}[0-9]*$");

    let mastercard = new RegExp("^5[1-5][0-9]{14}$");
    let mastercard2 = new RegExp("^2[2-7][0-9]{14}$");

    let disco1 = new RegExp("^6011[0-9]{12}[0-9]*$");
    let disco2 = new RegExp("^62[24568][0-9]{13}[0-9]*$");
    let disco3 = new RegExp("^6[45][0-9]{14}[0-9]*$");

    let diners = new RegExp("^3[0689][0-9]{12}[0-9]*$");
    let jcb = new RegExp("^35[0-9]{14}[0-9]*$");

    if (visa.test(cc)) {
      return true;
    }
    if (amex.test(cc)) {
      return true;
    }
    if (mastercard.test(cc) || mastercard2.test(cc)) {
      return true;
    }
    if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
      return true;
    }
    if (diners.test(cc)) {
      return true;
    }
    if (jcb.test(cc)) {
      return true;
    }
    if (cup1.test(cc) || cup2.test(cc)) {
      return true;
    }
    return false;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const cardControl = CardNumberControl(data.number);
    console.log(data);
    const registerDataTrue = JSON.parse(userRegisterData);
    if (cardControl) {
      try {
        await register(
          registerDataTrue.company_name,
          registerDataTrue.company_phone,
          registerDataTrue.sector_id,
          registerDataTrue.user_email,
          registerDataTrue.user_name,
          registerDataTrue.user_password,
          registerDataTrue.user_phone,
          registerDataTrue.user_surname
        );
        navigate("/dashboard");
        sessionStorage.removeItem("RegisterData");
      } catch (e) {
        console.log(e);
        toast.error(translate("An error occurred, please try again later"));
      }
    } else {
      toast.error(translate("Invalid Card Number"));
    }
  };

  return (
    // <Card sx={{ mt: 10 }}>
    //   <Grid container sx={{ mt: 1 }}>
    //     <Grid item xs={12} md={6}>
    //       <Cards
    //         cvc={data.cvc}
    //         expiry={data.expiry}
    //         focused={data.focus}
    //         name={data.name}
    //         number={data.number}
    //       />
    //     </Grid>
    //     <Grid Grid item xs={12} md={6} sx={{ mt: 1 }}>
    //       <form onSubmit={onSubmit}>
    //         <Grid container spacing={2}>
    //           <Grid item xs={12} md={6}>
    //             <TextField
    //               type="text"
    //               name="name"
    //               placeholder="Name Surname"
    //               value={data.name}
    //               onChange={(e) => handleInputChange(e)}
    //               onFocusCapture={handleInputFocus}
    //             />
    //           </Grid>
    //           <Grid item xs={12} md={6}>
    //             <TextField
    //               type="tel"
    //               name="number"
    //               placeholder="Card Number"
    //               value={data.number}
    //               onChange={(e) => handleInputChange(e)}
    //               onFocusCapture={handleInputFocus}
    //             />
    //           </Grid>
    //           <Grid item xs={12} md={6}>
    //             <TextField
    //               type="text"
    //               name="expiry"
    //               placeholder="MM/YY"
    //               value={data.expiry}
    //               onChange={(e) => handleInputChange(e)}
    //               onFocusCapture={handleInputFocus}
    //             />
    //           </Grid>
    //           <Grid item xs={12} md={6}>
    //             <TextField
    //               type="tel"
    //               name="cvc"
    //               placeholder="CVC"
    //               value={data.cvc}
    //               onChange={(e) => handleInputChange(e)}
    //               onFocusCapture={handleInputFocus}
    //             />
    //           </Grid>
    //           <Grid item xs={12} md={6}></Grid>
    //           <Grid item xs={12} md={6}>
    //             <Button
    //               color="success"
    //               size="large"
    //               type="submit"
    //               variant="contained"
    //             >
    //               Pay
    //             </Button>
    //           </Grid>
    //         </Grid>
    //       </form>
    //     </Grid>
    //   </Grid>
    // </Card>
    <>
      <div className="container">
        <div className="App-payment">
          <Cards
            cvc={data.cvc}
            expiry={data.expiry}
            focused={data.focus}
            name={data.name}
            number={data.number}
          />
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ width: 0 }}>
                <TextField
                  type="text"
                  fullWidth
                  name="name"
                  placeholder="Name Surname"
                  value={data.name}
                  onChange={(e) => handleInputChange(e)}
                  onFocusCapture={handleInputFocus}
                  style={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={12} style={{ width: 0 }}>
                <TextField
                  type="tel"
                  fullWidth
                  name="number"
                  placeholder="Card Number"
                  value={data.number}
                  onChange={(e) => handleInputChange(e)}
                  onFocusCapture={handleInputFocus}
                  style={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={6} style={{ width: 0 }}>
                <TextField
                  type="text"
                  fullWidth
                  name="expiry"
                  placeholder="MM/YY"
                  value={data.expiry}
                  onChange={(e) => handleInputChange(e)}
                  onFocusCapture={handleInputFocus}
                  style={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={6} style={{ width: 0 }}>
                <TextField
                  type="tel"
                  fullWidth
                  name="cvc"
                  placeholder="CVC"
                  value={data.cvc}
                  onChange={(e) => handleInputChange(e)}
                  onFocusCapture={handleInputFocus}
                  style={{ backgroundColor: "white" }}
                />
              </Grid>
            </Grid>

            <Button
              color="success"
              size="large"
              type="submit"
              variant="contained"
              style={{ marginTop: "20px" }}
            >
              Pay
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer />
      <style jsx>{`
        .container {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #333333;
        }
        .rccs__card--unknown > div {
          background-image: url("http://localhost:3000/card.jpeg") !important;
        }
        .App-payment {
          padding: 30px;
        }
        form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

export default PaymentPage;
