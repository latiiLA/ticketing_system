import React from "react";
import { Box, TextField, Typography, Button, Card } from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const CreateTickets = () => {
  const INITIAL_FORM_STATE = {
    command: "",
    description: "",
    example: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string().required("Ticket title is required"),
    description: Yup.string().required("Ticket description is required"),
    status: Yup.string().required("Ticket example is required"),
  });

  const handleSubmit = async (data) => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    try {
      const response = await axios.post(`${apiUrl}/tickets`, {
        command: data.title,
        description: data.description,
        example: data.status,
      });
      console.log("New command is created:", response.data);
      toast.success("Ticket is successfully created");
    } catch (error) {
      // console.error("Error creating a command:", error);
      toast.error("Error creating a ticket ", { error });
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
                <Field
                  as={TextField}
                  name="status"
                  label="Status"
                  variant="outlined"
                  fullWidth
                  error={touched.status && !!errors.status}
                  helperText={<ErrorMessage name="status" />}
                />
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
