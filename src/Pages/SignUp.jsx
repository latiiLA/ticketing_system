import React, { useState } from "react";

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
  FilledInput,
  InputAdornment,
  IconButton,
  Stack,
  Card,
  CardMedia,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { makeStyles } from "@mui/styles";

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
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (
    //   Boolean(firstName) &&
    //   Boolean(lastName) &&
    //   Boolean(email) &&
    //   Boolean(password) &&
    //   Boolean(confirmPassword) &&
    //   password.length > 7 &&
    //   password === confirmPassword
    // ) {
    //   console.log(
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     confirmPassword,
    //     password.length
    //   );
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:4000/auth/createUser",
    //       {
    //         firstName,
    //         lastName,
    //         email,
    //         password,
    //         confirmPassword,
    //       }
    //     );
    //     console.log("New user is created:", response.data);
    //     alert("New user is created");
    //     setfirstName("");
    //     setlastName("");
    //     setEmail("");
    //     setPassword("");
    //     setconfirmPassword("");
    //     navigate("/login");
    //     // You can redirect the user to the newly created post or update the post list
    //   } catch (error) {
    //     console.error("Error creating a user:", error);
    //     alert("Error creating a user");
    //   }
    // } else {
    //   console.log("Error, invalid signup data ");
    //   alert("Error, invalid signup data");
    // }
  };

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

            <Box sx={{ width: "100%", height: "70%", margin: "auto" }}>
              <form onSubmit={handleSubmit} className={classes.form}>
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
                  <Typography className={classes.signup1}>SignUp</Typography>
                  <TextField
                    required
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                  <TextField
                    required
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                  <TextField
                    className={classes.inputField}
                    required
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <FormControl required>
                    <InputLabel htmlFor="filled-adornment-password">
                      Password
                    </InputLabel>
                    <FilledInput
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      id="filled-adornment-password2"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <FormControl required>
                    <InputLabel htmlFor="filled-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <FilledInput
                      value={confirmPassword}
                      onChange={(e) => {
                        setconfirmPassword(e.target.value);
                      }}
                      id="filled-adornment-password"
                      type={showPassword2 ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword2}
                            edge="end"
                          >
                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
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
                    <Button sx={{ color: "#222222" }}>HAVE AN ACCOUNT?</Button>
                  </Link>
                </Stack>
              </form>
            </Box>
          </Stack>
        </>
      ) : (
        <>
          <Stack gap={2} className={classes.signupBox}>
            <Card
              sx={{
                width: "50%",
                height: "75%",
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
              <form onSubmit={handleSubmit} className={classes.form}>
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
                  <Typography className={classes.signup1}>SignUp</Typography>
                  <TextField
                    required
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                  <TextField
                    required
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                  <TextField
                    className={classes.inputField}
                    required
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <FormControl required>
                    <InputLabel htmlFor="filled-adornment-password">
                      Password
                    </InputLabel>
                    <FilledInput
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      id="filled-adornment-password2"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <FormControl required>
                    <InputLabel htmlFor="filled-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <FilledInput
                      value={confirmPassword}
                      onChange={(e) => {
                        setconfirmPassword(e.target.value);
                      }}
                      id="filled-adornment-password"
                      type={showPassword2 ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword2}
                            edge="end"
                          >
                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
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
                    <Button sx={{ color: "#222222" }}>HAVE AN ACCOUNT?</Button>
                  </Link>
                </Stack>
              </form>
            </Box>
          </Stack>
        </>
      )}
    </Box>
  );
};
export default SignUp;
