import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Container, Grid } from "@mui/material";
import axios from "axios.js";
import AdminmessageTable from "./AdminmessageTable";
import useAuth from "app/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import translate from "components/general/translate";

const Message = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messageData, setMessageData] = useState([]);

  const getProducts = async () => {
    await axios.get("/contact").then((res) => {
      setMessageData(res.data);
    });
  };

  useEffect(() => {
    if (user.user_level != 0) navigate(-1);
    getProducts();
  }, []);

  return (
    <Container fixed>
      <Card sx={{ mt: 5 }}>
        <CardHeader title={translate("Message")} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AdminmessageTable data={messageData} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Message;
