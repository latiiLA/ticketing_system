import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateTickets = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const INITIAL_FORM_STATE = {
    title: "",
    description: "",
    status: "Open",
  };

  const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string().required("Ticket title is required"),
    description: Yup.string().required("Ticket description is required"),
    status: Yup.string().required("Ticket status is required"),
  });

  const ticketStatus = [
    { value: "Open", label: "Open" },
    { value: "Inprogress", label: "Inprogress" },
    { value: "Closed", label: "Closed" },
  ];

  const handleSubmit = async (data) => {
    console.log("inside handle submit");
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem("token");

    if (!token) {
      //   console.error("No authentication token found");
      toast.error("User is not authenticated");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        `${apiUrl}/tickets`,
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
      console.log("New Ticket is created:", response.data);
      toast.success("Ticket is successfully created");
    } catch (error) {
      console.error("Error creating a ticket:", error);
      toast.error("Error creating a ticket ", { error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
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
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  Add Ticket
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
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default CreateTickets;
