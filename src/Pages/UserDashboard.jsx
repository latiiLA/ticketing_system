import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import User from "@mui/icons-material/Description";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ticketing_app from "../assets/ticketing_app.gif";
import { Breadcrumbs, Typography } from "@mui/material";
import { Add, Person, Receipt, ReceiptLong } from "@mui/icons-material";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#017d6f !important",
        },
      },
    },
  },
});

function DemoPageContent({ pathname }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(pathname);
  }, [pathname]);
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function UserDashboard(props) {
  const { window } = props;
  const router = useDemoRouter("/dashboard");

  return (
    <AppProvider
      navigation={[
        {
          kind: "header",
          title: "Items",
        },
        {
          segment: "dashboard",
          title: "Dashboard",
          icon: <Person sx={{ color: "#017d6f !important" }} />,
        },
        {
          kind: "header",
          title: "Main Items",
        },
        {
          segment: "tickets",
          title: "Tickets",
          icon: <Add sx={{ color: "#017d6f !important" }} />,
        },
        {
          segment: "mytickets",
          title: "My Tickets",
          icon: <Receipt sx={{ color: "#017d6f !important" }} />,
        },
      ]}
      router={router}
      theme={demoTheme}
      branding={{
        logo: <img src={ticketing_app} alt="Ticketing app logo" />,
        title: (
          <Typography sx={{ color: "#017d6f", fontWeight: "bold" }}>
            APP
          </Typography>
        ),
        homeUrl: "/dashboard",
      }}
    >
      <DashboardLayout>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
            marginTop: 2,
          }}
        >
          <DemoPageContent pathname={router.pathname} />
          <Outlet />
          <Box
            sx={{
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
              marginTop: "auto",
            }}
          >
            <Footer />
          </Box>
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

export default UserDashboard;
