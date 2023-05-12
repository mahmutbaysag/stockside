import { useEffect, useState } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import WorkerProductTable from "./item/WorkerProductTable";
import StatCards from "./item/StatCards";
import axios from "axios.js";
import translate from "components/general/translate";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const WorkerDashbord = () => {
  const { palette } = useTheme();
  const [data, setData] = useState([]);
  const [ProductData, setProductData] = useState([]);

  useEffect(() => {
    document.title = "Worker Dashbord";
    getData();
  }, []);

  const getData = async () => {
    await axios.get("worker/dashboard").then((res) => {
      setData(res.data.data);
      setProductData(res.data.allProduct);
    });
  };
  return (
    <ContentBox>
      <Grid container spacing={3}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Grid container spacing={3}>
            {data.map((item, index) => (
              <StatCards
                key={index}
                name={item.name}
                value={item.value}
                icon={item.icon}
              />
            ))}
          </Grid>
          <WorkerProductTable data={ProductData} />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}></Grid>
      </Grid>
    </ContentBox>
  );
};

export default WorkerDashbord;
