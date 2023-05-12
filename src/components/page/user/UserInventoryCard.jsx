import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import useAuth from "app/hooks/useAuth";
import UserInventoryGeneralModal from "./UserInventoryGeneralModal";
import { useParams } from "react-router-dom";
import translate from "components/general/translate";
const UserInventoryCard = ({
  item,
  setActionId,
  actionId,
  setProductId,
  productId,
  handleSubmit,
}) => {
  const { user } = useAuth();
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const WorkerReduceFunction = (id) => {
    setProductId(id);
    setActionId(3);
    setOpen(true);
  };

  const ManagerClearFunction = (id) => {
    setProductId(id);
    setActionId(2);
    handleProcess({ stock: 0 });
  };

  const ManagerAddFucntion = (id) => {
    setProductId(id);
    setActionId(1);
    setOpen(true);
  };

  const handleProcess = async (data) => {
    data = { ...data, company_inventory_id: productId, user_id: parseInt(id) };
    handleSubmit(data);
  };

  return (
    <Card>
      <CardHeader title={item.company_inventory.product.name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {translate("Stock")} = {item.stock}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item xs={4}>
            {user.user_level == 1 && (
              <IconButton
                onClick={() => ManagerAddFucntion(item.company_inventory_id)}
              >
                <AddIcon />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={4}>
            {user.user_level == 1 && (
              <IconButton
                onClick={() => ManagerClearFunction(item.company_inventory_id)}
              >
                <ClearIcon />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => WorkerReduceFunction(item.company_inventory_id)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      <UserInventoryGeneralModal
        open={open}
        setOpen={setOpen}
        setProductId={setProductId}
        setActionId={setActionId}
        handleProcess={handleProcess}
      />
    </Card>
  );
};

export default UserInventoryCard;
