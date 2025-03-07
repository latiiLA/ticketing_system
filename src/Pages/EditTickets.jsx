import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const EditTickets = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const ticketData = location.state?.row || {};

  const INITIAL_FORM_STATE = {
    title: ticketData.title || "",
    description: ticketData.description || "",
    status: ticketData.status || "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string().required("Ticket title is required"),
    description: Yup.string().required("Ticket description is required"),
    status: Yup.string().required("Ticket status is required"),
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("User is not authenticated");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.put(
        `${apiUrl}/tickets/${ticketData._id}`,
        {
          title: data.title,
          description: data.description,
          status: data.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Ticket updated successfully");
      navigate("/managetickets");
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast.error("Error updating the ticket");
    } finally {
      setLoading(false);
    }
  };

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
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Edit Ticket
                </Typography>
                <Typography variant="h6">Ticket Information</Typography>

                <Field
                  as={TextField}
                  name="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  error={touched.title && !!errors.title}
                  helperText={<ErrorMessage name="title" />}
                />
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  error={touched.description && !!errors.description}
                  helperText={<ErrorMessage name="description" />}
                />
                <FormControl
                  variant="outlined"
                  fullWidth
                  error={touched.status && !!errors.status}
                >
                  <InputLabel id="status-label">Role</InputLabel>
                  <Field
                    as={Select}
                    name="status"
                    labelId="status-label"
                    label="Status"
                  >
                    {ticketStatus.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="div"
                    style={{ fontSize: 10, color: "red" }}
                  />
                </FormControl>
                <Button
                  sx={{ width: 50, margin: "auto" }}
                  variant="contained"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Update"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default EditTickets;
