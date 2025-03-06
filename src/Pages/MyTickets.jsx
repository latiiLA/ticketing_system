import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Alert, AlertTitle, Typography } from "@mui/material";

const MyTickets = () => {
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
            backgroundColor: "#017d6f !important",
            color: "#fff !important",
            fontSize: "13px",
            fontWeight: "bold",
          },
          marginX: 1,
        }}
      >
        <Typography>Tickets</Typography>
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
