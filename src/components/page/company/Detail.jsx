import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  Input,
} from "@mui/material";
import axios from "axios.js";
import useAuth from "app/hooks/useAuth";

const Detail = () => {
  const { user } = useAuth();
  const [companyDetail, setCompanyDetail] = useState([]);

  const CompanyDetailData = async () => {
    await axios.get(`/company/${user.company_id}`).then((res) => {
      setCompanyDetail(res.data);
    });
  };

  useEffect(() => {
    CompanyDetailData();
  }, []);

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (image) {
      handleUpload();
    }
  }, [image]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);
    console.log(image);
    await axios
      .post(`/company/image/${user.company_id}`, formData)
      .then((res) => {
        setCompanyDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container fixed>
      <Card sx={{ mt: 5 }}>
        <CardHeader title={companyDetail?.name} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <label htmlFor="upload-photo">
                <img
                  src={
                    companyDetail.image
                      ? "http://localhost:8000/image/" + companyDetail.image
                      : "http://localhost:8000/image/default.svg"
                  }
                  width="250px"
                  height="250px"
                  alt="logo"
                />
              </label>
              {user.user_level == 1 && (
                <Input
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  accept="Image/png ,Image/jpeg"
                  style={{ display: "none", visibility: "none" }}
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h1" gutterBottom>
                {companyDetail?.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {companyDetail?.sector?.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Phone Number - {companyDetail?.phone}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Detail;
