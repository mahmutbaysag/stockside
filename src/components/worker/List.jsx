import React, { useState, useEffect } from "react";
import axios from "axios.js";
import UseAuth from "app/hooks/useAuth";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import WorkerListTable from "./WorkerListTable";
import AddIcon from "@mui/icons-material/Add";
import translate from "components/general/translate";

const List = () => {
  const { user } = UseAuth();
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  const getWorkers = async () => {
    await axios.get(`/worker?id=${user.company_id}`).then((res) => {
      setWorkers(res.data.data);
    });
  };

  useEffect(() => {
    if (user.user_level != 1) navigate(-1);
    getWorkers();
  }, []);

  const addWorker = () => {
    navigate("/worker/add");
  };

  return (
    <Container fixed>
      <Card sx={{ mt: 5 }}>
        <CardHeader
          title={translate("Company Worker List")}
          action={
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => addWorker()}
            >
              {translate("Add Worker")}
            </Button>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <WorkerListTable data={workers} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default List;
