import {
  Box,
  Card,
  Grid,
  Icon,
  IconButton,
  styled,
  Tooltip,
} from "@mui/material";
import { Small } from "app/components/Typography";
import translate from "components/general/translate";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": { color: theme.palette.text.secondary },
  "& .icon": {
    opacity: 0.6,
    fontSize: "44px",
    color: theme.palette.primary.main,
  },
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "14px",
  fontWeight: "500",
  color: theme.palette.primary.main,
}));

const StatCards = ({ name, value, icon }) => {
  return (
    <Grid item xs={12} md={6}>
      <StyledCard elevation={6}>
        <ContentBox>
          <Icon className="icon">{icon ? icon : "."}</Icon>
          <Box ml="12px">
            <Small>{translate(name)}</Small>
            <Heading>{value}</Heading>
          </Box>
        </ContentBox>

        <IconButton>
          <Icon>arrow_right_alt</Icon>
        </IconButton>
      </StyledCard>
    </Grid>
  );
};

export default StatCards;
