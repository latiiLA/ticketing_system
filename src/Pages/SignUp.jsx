import React from "react";

import left_image2 from "../assets/signup.jpg";
import ticketing_app from "../assets/ticketing_app.gif";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  Stack,
  Card,
  CardMedia,
  useTheme,
  useMediaQuery,
  Avatar,
  OutlinedInput,
  Select,
  MenuItem,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Lock } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";

const useStyles = makeStyles({
  all: {
    display: "flex",
    height: "100vh",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  signupBox: {
    boxShadow: "0.3rem 0.3rem 0.6rem grey",
    paddingRight: "1rem",
    display: "flex",
    flexDirection: "row !important",
    justifyContent: "space-evenly",
    width: "65%",
    padding: 10,
  },
  signup1: {
    textAlign: "center",
    fontSize: "1.5rem !important",
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
});

const SignUp = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const INITIAL_FORM_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  };

  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("LastName is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = async (data, { resetForm }) => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //     toast.error("User is not authenticated");
    //   }
    //   navigate("/home");
    //   return;
    // }
    try {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      console.log("apiUrl", apiUrl);
      const response = await axios.post(
        `${apiUrl}/signup`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        //   withCredentials: true,
        // }
      );
      // console.log("New user is created:", response.data);
      resetForm();
      toast.success(response.data.message);
    } catch (error) {
      // console.error("Error creating a user:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        // console.error("Error adding an user:", error);
        toast.error(error.message);
      }
    }
  };

  const role = [
    { value: "USER", label: "USER" },
    { value: "ADMIN", label: "ADMIN" },
  ];

  return (
    <Box
      className={classes.all}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isMatch ? (
        <>
          <Stack
            sx={{
              width: "70%",
              height: "95%",
              boxShadow: "0.3rem 0.3rem 0.6rem grey",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Card sx={{ width: "100%", height: "30%" }}>
              <CardMedia
                component="img"
                image={left_image2}
                alt="sign up image"
              />
            </Card>

            <Box sx={{ width: "100%", height: "90%", margin: "auto" }}>
              <Formik
                initialValues={INITIAL_FORM_STATE}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className={classes.form}>
                    <Stack gap={0.8}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          margin: "auto",
                        }}
                      >
                        <Box>
                          <Avatar
                            src={ticketing_app}
                            sx={{
                              width: 200,
                              height: 80,
                              borderRadius: 0,
                              objectFit: "cover",
                              marginY: "auto",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h3"
                          sx={{ margin: "auto", color: "#1aebd2" }}
                        >
                          APP
                        </Typography>
                      </Box>
                      <Typography className={classes.signup1}>
                        SignUp
                      </Typography>

                      <Field
                        as={TextField}
                        name="firstName"
                        label="FistName"
                        variant="outlined"
                        fullWidth
                        error={touched.firstName && !!errors.firstName}
                        helperText={<ErrorMessage name="firstName" />}
                      />
                      <Field
                        as={TextField}
                        name="lastName"
                        label="LastName"
                        variant="outlined"
                        fullWidth
                        error={touched.lastName && !!errors.lastName}
                        helperText={<ErrorMessage name="lastName" />}
                      />
                      <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        error={touched.email && !!errors.email}
                        helperText={<ErrorMessage name="email" />}
                      />

                      <FormControl
                        variant="outlined"
                        error={touched.password && !!errors.password}
                        fullWidth
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <Field
                          as={OutlinedInput}
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          startAdornment={
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          style={{
                            fontSize: "0.75rem",
                            color: "red",
                          }}
                        />
                      </FormControl>

                      <FormControl
                        variant="outlined"
                        error={
                          touched.confirmPassword && !!errors.confirmPassword
                        }
                        fullWidth
                      >
                        <InputLabel htmlFor="outlined-adornment-password2">
                          Confirm Password
                        </InputLabel>
                        <Field
                          as={OutlinedInput}
                          id="outlined-adornment-password2"
                          type={showPassword2 ? "text" : "password"}
                          name="confirmPassword"
                          startAdornment={
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword2}
                                edge="end"
                              >
                                {showPassword2 ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Comfirm Password"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          style={{
                            fontSize: "0.75rem",
                            color: "red",
                          }}
                        />
                      </FormControl>
                    </Stack>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      width={"100%"}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          width: "50%",
                          backgroundColor: "#017d6f",
                          color: "#222222",
                          "&:hover": { backgroundColor: "#17c4af" },
                        }}
                      >
                        SignUp
                      </Button>

                      <Link to="/login">
                        <Button sx={{ color: "#222222" }}>
                          HAVE AN ACCOUNT?
                        </Button>
                      </Link>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Box>
          </Stack>
        </>
      ) : (
        <>
          <Stack gap={2} className={classes.signupBox}>
            <Card
              sx={{
                width: "50%",
                height: "85%",
                display: "flex",
                flexDirection: "column !important",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <CardMedia
                component="img"
                // height="300"
                image={left_image2}
                alt="sign up image"
              />
            </Card>

            <Box sx={{ width: "50%", margin: "auto" }}>
              <Formik
                initialValues={INITIAL_FORM_STATE}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className={classes.form}>
                    <Stack gap={0.7}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          margin: "auto",
                        }}
                      >
                        <Box>
                          <Avatar
                            src={ticketing_app}
                            sx={{
                              width: 200,
                              height: 80,
                              borderRadius: 0,
                              objectFit: "cover",
                              marginY: "auto",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h3"
                          sx={{ margin: "auto", color: "#1aebd2" }}
                        >
                          APP
                        </Typography>
                      </Box>
                      <Typography className={classes.signup1}>
                        SignUp
                      </Typography>
                      <Field
                        as={TextField}
                        name="firstName"
                        label="FistName"
                        variant="outlined"
                        fullWidth
                        error={touched.firstName && !!errors.firstName}
                        helperText={<ErrorMessage name="firstName" />}
                      />
                      <Field
                        as={TextField}
                        name="lastName"
                        label="LastName"
                        variant="outlined"
                        fullWidth
                        error={touched.lastName && !!errors.lastName}
                        helperText={<ErrorMessage name="lastName" />}
                      />
                      <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        error={touched.email && !!errors.email}
                        helperText={<ErrorMessage name="email" />}
                      />

                      <FormControl
                        variant="outlined"
                        error={touched.password && !!errors.password}
                        fullWidth
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <Field
                          as={OutlinedInput}
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          startAdornment={
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          style={{
                            fontSize: "0.75rem",
                            color: "red",
                          }}
                        />
                      </FormControl>

                      <FormControl
                        variant="outlined"
                        error={
                          touched.confirmPassword && !!errors.confirmPassword
                        }
                        fullWidth
                      >
                        <InputLabel htmlFor="outlined-adornment-password2">
                          Confirm Password
                        </InputLabel>
                        <Field
                          as={OutlinedInput}
                          id="outlined-adornment-password2"
                          type={showPassword2 ? "text" : "password"}
                          name="confirmPassword"
                          startAdornment={
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword2}
                                edge="end"
                              >
                                {showPassword2 ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Comfirm Password"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          style={{
                            fontSize: "0.75rem",
                            color: "red",
                          }}
                        />
                      </FormControl>
                      <FormControl
                        variant="outlined"
                        fullWidth
                        error={touched.role && !!errors.role}
                      >
                        <InputLabel id="role-label">Role</InputLabel>
                        <Field
                          as={Select}
                          name="role"
                          labelId="role-label"
                          label="Role"
                        >
                          {role.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="role"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </FormControl>
                    </Stack>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      width={"100%"}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          width: "50%",
                          backgroundColor: "#017d6f",
                          color: "#222222",
                          "&:hover": { backgroundColor: "#17c4af" },
                        }}
                      >
                        SignUp
                      </Button>

                      <Link to="/login">
                        <Button sx={{ color: "#222222" }}>
                          HAVE AN ACCOUNT?
                        </Button>
                      </Link>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Box>
          </Stack>
        </>
      )}
    </Box>
  );
};
export default SignUp;
