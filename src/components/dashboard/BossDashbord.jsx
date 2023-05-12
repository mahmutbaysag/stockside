import { useEffect, useState } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import BossProductTable from "./item/BossProductTable";
import StatCards from "./item/StatCards";
import axios from "axios.js";

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

const BossDashbord = () => {
  const { palette } = useTheme();
  const [data, setData] = useState([]);
  const [ProductData, setProductData] = useState([]);

  useEffect(() => {
    document.title = "Admin Dashbord";
    getData();
  }, []);

  const getData = async () => {
    await axios.get("boss/dashboard").then((res) => {
      console.log(res.data);
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
          <BossProductTable data={ProductData} />
        </Grid>

        {/* <Grid item lg={4} md={4} sm={12} xs={12}></Grid> */}
      </Grid>
    </ContentBox>
  );
};

export default BossDashbord;
