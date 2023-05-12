import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios.js";
import UseAuth from "app/hooks/useAuth";

import WorkerAddTable from "./WorkerAddTable";
import WorkerAddModal from "./WorkerAddModal";
import { useNavigate } from "react-router-dom";
import translate from "components/general/translate";
const Add = () => {
  const { user } = UseAuth();
  const [tmpWorkers, setTmpWorkers] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const getTmpWorkers = async () => {
    await axios.get(`/tmp/worker?id=${user.id}`).then((res) => {
      setTmpWorkers(res.data.data);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleAdd = (data) => {
    data = { ...data, manager_id: user.id };
    console.log(data);
    axios.post("/worker/add", data).then((res) => {
      if (res.data.data) {
        setTmpWorkers([...tmpWorkers, res.data.data[0]]);
      }
    });
  };

  useEffect(() => {
    if (user.user_level != 1) navigate(-1);
    getTmpWorkers();
  }, []);

  return (
    <Container fixed>
      <Card sx={{ mt: 5 }}>
        <CardHeader
          title={translate("Company Worker Add")}
          action={
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleOpen}
            >
              {translate("Add Worker")}
            </Button>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <WorkerAddTable data={tmpWorkers} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <WorkerAddModal
        handleClose={handleClose}
        open={open}
        handleAdd={handleAdd}
      />
    </Container>
  );
};

export default Add;
