import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Alert, AlertTitle } from "@mui/material";

const Tickets = () => {
  const [copiedData, setCopiedData] = React.useState("");
  const [rows] = useState([]);
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
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "string",
      flex: 0.5,
      headerClassName: "super-app-theme--header",
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          width: "auto",
          "& .super-app-theme--header": {
            backgroundColor: "#017d6f !important", // Apply header color
            color: "#fff !important",
            fontSize: "13px",
            fontWeight: "bold",
          },
          marginX: 1,
        }}
      >
        <DataGrid
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
              backgroundColor: "#017d6f", // Toolbar background color
              color: "#222", // Toolbar text color
              fontSize: 14,
              fontWeight: "bold",
              "& .MuiButtonBase-root": {
                color: "#fff !important", // Ensures toolbar button text is white
              },
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#017d6f", // Column headers
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

export default Tickets;
