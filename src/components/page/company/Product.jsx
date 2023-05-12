import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios.js";
import useAuth from "app/hooks/useAuth";

import CompanyProductAddModal from "./CompanyProductAddModal";
import CompanyInventoryTable from "./CompanyInventoryTable";
import { useNavigate } from "react-router-dom";
import translate from "components/general/translate";
const Product = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [companyInventory, setCompanyInventory] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getProducts = async () => {
    await axios.get("/products").then((res) => {
      setProducts(res.data.products);
    });
  };

  const getCompanyInventory = async () => {
    await axios.get(`/company/inventory/${user.company_id}`).then((res) => {
      setCompanyInventory(res.data);
    });
  };

  useEffect(() => {
    if (user.user_level != 1) navigate(-1);
    getProducts();
    getCompanyInventory();
  }, []);

  const handleAdd = (data) => {
    data = { ...data, company_id: user.company_id };
    data.product_id = data.product_id.id;
    axios.post("/company/inventory", data).then((res) => {
      setCompanyInventory([...companyInventory, res.data]);
    });
  };

  return (
    <Container fixed>
      <Card sx={{ mt: 5 }}>
        <CardHeader
          title={translate("Product")}
          action={
            <Button variant="contained" onClick={handleOpen}>
              {translate("Add Product")}
            </Button>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CompanyInventoryTable data={companyInventory} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <CompanyProductAddModal
        handleClose={handleClose}
        open={open}
        products={products}
        handleAdd={handleAdd}
      />
    </Container>
  );
};

export default Product;
