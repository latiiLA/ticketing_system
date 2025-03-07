import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const ViewDetails = () => {
  console.log("inside view details");
  const navigate = useNavigate();
  const location = useLocation();
  const ticketData = location.state?.row || {};
  console.log("inside view details", ticketData);

  const ticketStatus = [
    { value: "Open", label: "Open" },
    { value: "Inprogress", label: "Inprogress" },
    { value: "Closed", label: "Closed" },
  ];

  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
    >
      <Card
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: { xs: "100%", sm: "75%", md: "60%" },
          margin: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            View Ticket
          </Typography>
          <Typography variant="h6">Ticket Information</Typography>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            value={ticketData?.title}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            value={ticketData?.description}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="status-label">Role</InputLabel>
            <TextField
              name="status"
              labelId="status-label"
              label="Status"
              InputProps={{ readOnly: true }}
            >
              {ticketStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          {ticketData.createdBy && (
            <TextField
              name="createdBy"
              label="Created By"
              variant="outlined"
              fullWidth
              value={
                ticketData?.createdBy
                  ? ticketData?.createdBy.firstName +
                    " " +
                    ticketData.createdBy.lastName
                  : "Unidentified"
              }
              InputProps={{ readOnly: true }}
            />
          )}
          <Button
            sx={{ width: 50, margin: "auto" }}
            variant="contained"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ViewDetails;
