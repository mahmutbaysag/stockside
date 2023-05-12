import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios.js";
import UserInventoryCard from "./UserInventoryCard";
import useAuth from "app/hooks/useAuth";
import translate from "components/general/translate";
const UserInventory = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [productId, setProductId] = useState(0);
  const [actionId, setActionId] = useState(0);

  const getUserInventory = async () => {
    await axios.get(`/user/inventory/${id}`).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    if (user.user_level == 1 || user.id == id) getUserInventory();
    else navigate(-1);
  }, [id]);

  const handleSubmit = async (datak) => {
    if (actionId == 1) {
      console.log("add", datak);
      await axios.post("/user/inventory", datak).then((res) => {
        const newData = data.map((item) => {
          if (item.id == res.data.id) {
            return res.data;
          } else {
            return item;
          }
        });
        setData(newData);
      });
    }
    if (actionId == 2) {
      console.log("clear", datak);
      await axios.put("/user/inventory/clear", datak).then((res) => {
        const newData = data.map((item) => {
          if (item.id == res.data.id) {
            return res.data;
          } else {
            return item;
          }
        });
        setData(newData);
      });
    }
    if (actionId == 3) {
      console.log("process", datak);
      await axios.put("/user/inventory/", datak).then((res) => {
        const newData = data.map((item) => {
          if (item.id == res.data.data.id) {
            return res.data.data;
          } else {
            return item;
          }
        });
        setData(newData);
      });
    }
  };

  return (
    <Container fixed>
      <Card sx={{ mt: 5 }}>
        <CardHeader title={translate("User Inventory")} />
        <CardContent>
          <Grid container spacing={2}>
            {data.map(
              (item) =>
                item.stock > 0 && (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <UserInventoryCard
                      item={item}
                      productId={productId}
                      setProductId={setProductId}
                      actionId={actionId}
                      setActionId={setActionId}
                      handleSubmit={handleSubmit}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserInventory;
