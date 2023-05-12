import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import RemoveIcon from "@mui/icons-material/Remove";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import axios from "axios.js";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const filter = createFilterOptions();

const CompanyProductAddModal = ({ handleClose, open, products, handleAdd }) => {
  const [product, setProduct] = useState([]);
  const initialValues = {
    product_id: { id: "", name: "" },
    stock: "",
    recycle: false,
    description: [{ name: "", value: "" }],
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset();
  }, [open]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "description",
  });

  const onSubmit = async (data) => {
    handleAdd(data);
    reset();
  };

  useEffect(() => {
    setProduct(products);
  }, [products]);

  async function newProduct(name) {
    var news = "";
    await axios
      .post("/products", { name: name })
      .then((response) => {
        news = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    toast.success("new product add and selected!");
    return news;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="alert-dialog-title">
          {"Company Product Add"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={7}>
              <Controller
                name="product_id"
                control={control}
                defaultValue={[]}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                      if (typeof newValue === "string") {
                        onChange({
                          name: newValue,
                          id: "",
                        });
                      } else if (newValue && newValue.inputValue) {
                        // Create a new value from the user input

                        newProduct(newValue.inputValue).then((response) => {
                          setProduct([...product, response.product]);
                          onChange({
                            name: response.product.name,
                            id: response.product.id,
                          });
                        });
                      } else {
                        onChange(newValue);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);

                      const { inputValue } = params;
                      // Suggest the creation of a new value
                      const isExisting = options.some(
                        (option) => inputValue === option.name
                      );
                      if (inputValue !== "" && !isExisting) {
                        if (
                          products.filter(
                            (product) =>
                              product.name.toLowerCase() ===
                              inputValue.toLowerCase()
                          ).length <= 0
                        ) {
                          filtered.push({
                            inputValue,
                            name: `Add "${inputValue}"`,
                          });
                        }
                      }

                      return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="productName"
                    options={product}
                    getOptionLabel={(option) => {
                      // Value selected with enter, right from the input
                      if (typeof option === "string") {
                        return option;
                      }
                      // Add "xxx" option created dynamically
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      // Regular option
                      return option.name;
                    }}
                    renderOption={(props, option) => (
                      <li {...props}>{option.name}</li>
                    )}
                    sx={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => (
                      <TextField {...params} label="Product Name" />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              <Controller
                name="stock"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    error={Boolean(errors.stock)}
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                    label="Stock*"
                    sx={{ mb: 2 }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Controller
                      name="recycle"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox
                          checked={value}
                          onChange={onChange}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      )}
                    />
                  }
                  label="Recycle"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                onClick={() => append({ name: "", value: "" })}
              >
                Add Description
              </Button>
            </Grid>
            {fields.map((item, index) => (
              <Grid container spacing={2} key={item}>
                <Grid item xs={6}>
                  <Controller
                    name={`description.${index}.name`}
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        fullWidth
                        error={Boolean(errors.description)}
                        variant="outlined"
                        onChange={onChange}
                        value={value}
                        label="Description Name*"
                        sx={{ mb: 2 }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name={`description[${index}].value`}
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        fullWidth
                        error={Boolean(errors.description)}
                        variant="outlined"
                        onChange={onChange}
                        value={value}
                        label="Description Value*"
                        sx={{ mb: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {index !== 0 ? (
                                <IconButton onClick={() => remove(index)}>
                                  <RemoveIcon />
                                </IconButton>
                              ) : null}
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" autoFocus>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CompanyProductAddModal;
