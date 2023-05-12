import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "app/hooks/useAuth";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";
import axios from "axios.js";

import * as Yup from "yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Select, MenuItem, TextField } from "@mui/material";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import translate from "components/general/translate";

const initialValues = {
  product: [{ company_inventory_id: -1, quantity: 0 }],
};

const CollectiveProductAdd = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product",
  });

  useEffect(() => {
    if (user.user_level != 1) navigate(-1);
    getCompanyInventory();
  }, [id]);

  const getCompanyInventory = async () => {
    await axios.get(`/company/inventory/${user?.company_id}`).then((res) => {
      setCompanyData(res.data);
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
    const dataAll = { ...data, user_id: id };
    await axios.post("/user/collectiveinventoryadd", dataAll).then((res) => {
      console.log(res);
      if (res.data.failed) {
        toast.error(res.data.failed + " lines stock not enough");
      } else {
        toast.success("Product Added");
        navigate(-1);
      }
    });
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Container fixed>
      <Card sx={{ mt: 5 }}>
        <CardHeader title={translate("User Collective Product Add")} />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid Container spacing={2}>
              <Grid item xs={12}>
                {fields.map((item, index) => (
                  <Grid container spacing={2} key={item.id} mb={2}>
                    <Grid item xs={4}>
                      <Controller
                        fullWidth
                        name={`product.${index}.company_inventory_id`}
                        control={control}
                        defaultValue={item.company_inventory_id}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            onChange={onChange}
                            value={value}
                            label="Product"
                            MenuProps={MenuProps}
                            style={{ width: "100%" }}
                          >
                            <MenuItem value="-1">
                              {translate("Select Product")}
                            </MenuItem>
                            {companyData.map((item) => (
                              <MenuItem value={item.id} key={item.id}>
                                {item.product.name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        fullWidth
                        name={`product.${index}.quantity`}
                        control={control}
                        defaultValue={item.quantity}
                        render={({ field: { onChange, value } }) => (
                          <TextField
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            onChange={onChange}
                            value={value}
                            style={{ width: "100%" }}
                            label={translate("Quantity")}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      {index == 0 && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            append({ company_inventory_id: -1, quantity: 0 })
                          }
                        >
                          {translate("Add")}
                        </Button>
                      )}
                      {index != 0 && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => remove(index)}
                        >
                          {translate("Delete")}
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} style={{ textAlign: "right" }}>
                <Button variant="contained" color="primary" type="submit">
                  {translate("Submit")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CollectiveProductAdd;
