import React, { useState } from "react";
import left_image2 from "../assets/login.jpg";
import ticketing_app from "../assets/ticketing_app.gif";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stack,
  Card,
  CardMedia,
  useMediaQuery,
  useTheme,
  Grid,
  Avatar,
  Divider,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { Lock, Person } from "@mui/icons-material";

const Login = () => {
  const INITIAL_FORM_STATE = {
    email: "",
    password: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
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
  });

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  // const { setRole } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (user_data) => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    console.log("inside handle submit", apiUrl);

    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email: user_data.email,
        password: user_data.password,
      });

      const data = response.data;

      if (data.error) {
        throw new Error(data.error);
      }

      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("role in login", data.data.role);
      if (data.data.role === "USER") {
        navigate("/dashboard");
      } else if (data.data.role === "ADMIN") {
        navigate("/admindashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      // console.error("Error logging in:", error);
      toast.error(
        `Login Error: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {isMatch ? (
            <Stack
              sx={{
                width: "80%",
                height: "85%",
                boxShadow: "0.3rem 0.3rem 0.6rem grey",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                gap: 2,
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image={left_image2}
                  alt="login picture"
                />
              </Card>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 5,
                }}
              >
                <Formik
                  initialValues={INITIAL_FORM_STATE}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        margin: "auto",
                        gap: 10,
                      }}
                    >
                      <Stack gap={0.5}>
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
                                height: 70,
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
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "#222222",
                          }}
                        >
                          Login
                        </Typography>

                        <Field
                          as={TextField}
                          name="email"
                          label="email"
                          variant="outlined"
                          fullWidth
                          error={touched.email && !!errors.email}
                          helperText={<ErrorMessage name="email" />}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person />
                              </InputAdornment>
                            ),
                          }}
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
                        <Divider />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button sx={{ color: "#222222" }}>
                            Forgot your password?
                          </Button>
                          <Button
                            sx={{ color: "#222222" }}
                            onClick={() => navigate("/signup")}
                          >
                            SignUp
                          </Button>
                        </Box>
                      </Stack>
                      <Stack>
                        <Button
                          sx={{
                            backgroundColor: "#017d6f",
                            color: "#222222",
                            "&:hover": { backgroundColor: "#17c4af" },
                          }}
                          type="submit"
                          variant="contained"
                        >
                          Login
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Stack>
          ) : (
            <Stack
              gap={2}
              sx={{
                width: "60%",
                height: "70%",
                boxShadow: "0.3rem 0.3rem 0.6rem grey",
                paddingRight: "1rem",
                display: "flex",
                flexDirection: "row !important",
                justifyContent: "space-evenly",
              }}
            >
              <Card
                sx={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column !important",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <CardMedia
                  component="img"
                  image={left_image2}
                  alt="login picture"
                />
              </Card>

              <Box
                sx={{
                  width: "50%",
                  margin: "auto",
                }}
              >
                <Formik
                  initialValues={INITIAL_FORM_STATE}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        margin: "auto",
                        gap: 10,
                      }}
                    >
                      <Stack gap={2}>
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
                                height: 70,
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
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontSize: "2rem",
                            fontWeight: "bold",
                          }}
                        >
                          Login
                        </Typography>

                        <Field
                          as={TextField}
                          name="email"
                          label="email"
                          variant="outlined"
                          fullWidth
                          error={touched.email && !!errors.email}
                          helperText={<ErrorMessage name="email" />}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person />
                              </InputAdornment>
                            ),
                          }}
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
                            style={{ fontSize: "0.75rem", color: "red" }}
                          />
                        </FormControl>
                        <Divider />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            sx={{ color: "#222222" }}
                            onClick={() => navigate("/forgotpassword")}
                          >
                            Forgot your password?
                          </Button>
                          <Button
                            sx={{ color: "#222222" }}
                            onClick={() => navigate("/signup")}
                          >
                            SignUp
                          </Button>
                        </Box>
                      </Stack>
                      <Stack>
                        <Button
                          sx={{
                            backgroundColor: "#017d6f",
                            color: "#222222",
                            "&:hover": { backgroundColor: "#17c4af" },
                          }}
                          type="submit"
                          variant="contained"
                        >
                          Login
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Stack>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
