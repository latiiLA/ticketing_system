import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Alert,
  AlertTitle,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Chip } from "@mui/material";
import { Preview } from "@mui/icons-material";

const MyTickets = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [copiedData, setCopiedData] = React.useState("");
  const [rows, setRows] = useState([]);
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const statusColors = {
    Open: "success",
    "In Progress": "warning",
    Closed: "error",
  };
  const columns = [
    {
      field: "title",
      headerName: "Title",
      type: "string",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      type: "string",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColors[params.value] || "default"}
          variant="outlined"
          sx={{ fontWeight: "bold" }}
        />
      ),
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        if (!params?.row) return null; // Prevents errors

        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              height: "100%",
              margin: "auto",
              alignItems: "center",
            }}
          >
            <Tooltip title="View ticket">
              <IconButton
                color="primary"
                size="small"
                onClick={() =>
                  navigate("/viewdetails", { state: { row: params?.row } })
                }
              >
                <Preview />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  const fetchRows = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // console.error("No authentication token found");
      toast.error("User is not authenticated");
      navigate("/home");
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/mytickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setRows(response.data.mytickets);
      console.log("ticket list", response.data.mytickets);
    } catch (error) {
      // console.error("Error fetching tickets:", error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Box
        sx={{
          width: "auto",
          "& .super-app-theme--header": {
            backgroundColor: "#017d6f !important",
            color: "#fff !important",
            fontSize: "13px",
            fontWeight: "bold",
          },
          marginX: 1,
        }}
      >
        <Typography>My Tickets</Typography>
        <DataGrid
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          pageSizeOptions={[20, 50, 100]}
          autoSizeOptions={{ height: "auto" }}
          checkboxSelection
          onClipboardCopy={(copiedString) => setCopiedData(copiedString)}
          sx={{
            "& .MuiDataGrid-toolbarContainer": {
              color: "#222",
              fontSize: 14,
              fontWeight: "bold",
              "& .MuiButtonBase-root": {
                color: "#017d6f !important",
              },
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#017d6f",
              color: "#222",
              fontSize: 13,
              fontWeight: "bold",
            },
          }}
        />
        <Alert severity="info" sx={{ width: "100%", mt: 1 }}>
          <AlertTitle>Copied data:</AlertTitle>
          <code
            style={{
              display: "block",
              maxHeight: 200,
              overflow: "auto",
              whiteSpace: "pre-line",
            }}
          >
            {copiedData}
          </code>
        </Alert>
      </Box>
    </Box>
  );
};

export default MyTickets;
