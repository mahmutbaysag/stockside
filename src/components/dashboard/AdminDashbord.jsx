import { useEffect, useState } from "react";
import { Card, Grid, styled, useTheme } from "@mui/material";
import DoughnutChart from "./item/Doughnut";
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

const AdminDashbord = () => {
  const { palette } = useTheme();
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    document.title = "Admin Dashbord";
    getData();
  }, []);

  const getData = async () => {
    await axios.get("admin/dashboard").then((res) => {
      console.log(res.data);
      setData(res.data.data);
      setChartData(res.data.chartData);
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
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Card sx={{ px: 3, py: 2, mb: 3 }}>
            <Title>{translate("All User")}</Title>
            <DoughnutChart
              data={chartData}
              height="300px"
              color={[
                palette.primary.dark,
                palette.primary.main,
                palette.primary.light,
              ]}
            />
          </Card>
        </Grid>
      </Grid>
    </ContentBox>
  );
};

export default AdminDashbord;
