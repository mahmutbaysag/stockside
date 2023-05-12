import {
  Avatar,
  FormControl,
  Hidden,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { MatxMenu, MatxSearchBox } from "app/components";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";
import { topBarHeight } from "app/utils/constant";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Span } from "../../../components/Typography";
import { ToastContainer } from "react-toastify";
import { LOCALES } from "app/i18n";
import LanguageContext from "app/contexts/LanguageContext";
import translate from "components/general/translate";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: "all 0.3s ease",
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down("xs")]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: 24,
  padding: 4,
  "& span": { margin: "0 8px" },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary },
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" },
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout, user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { language, setLanguage } = useContext(LanguageContext);
  const [data1, setData1] = useState(language);

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  const ChangeLanguage = (e) => {
    const data = e.target.value;
    setData1(data);
    if (data === "tr-tr") {
      setLanguage(LOCALES.TURKISH);
    }
    if (data === "en-us") {
      setLanguage(LOCALES.ENGLISH);
    }
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>

          {/* <IconBox>
            <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton> 

            <StyledIconButton>
              <Icon>web_asset</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>star_outline</Icon>
            </StyledIconButton>
          </IconBox> */}

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data1}
              label="Language"
              onChange={ChangeLanguage}
            >
              <MenuItem value="tr-tr">Turkish</MenuItem>
              <MenuItem value="en-us">English</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" alignItems="center">
          {/* <MatxSearchBox /> */}

          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    {translate("Hi")}{" "}
                    <strong>
                      {user.name} {user.surname}
                    </strong>
                  </Span>
                </Hidden>
                <Avatar src={user.avatar} sx={{ cursor: "pointer" }} />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to={"/user/profile/" + user.id}>
                <Icon> person </Icon>
                <Span> Profile </Span>
              </Link>
            </StyledItem>

            {/* <StyledItem>
              <Icon> settings </Icon>
              <Span> Settings </Span>
            </StyledItem> */}

            <StyledItem onClick={logout}>
              <Icon> power_settings_new </Icon>
              <Span> Logout </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
      <ToastContainer />
    </TopbarRoot>
  );
};

export default React.memo(Layout1Topbar);
