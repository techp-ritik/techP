import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { useState } from "react";
import Alert from "@mui/material/Alert";

export default function SignIn() {
  const [loader, setLoader] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (credentials.password.length < 8) {
      return;
    }
    event.preventDefault();
    setLoader(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      {""}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 6,
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "400px",
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          borderRadius: "20px",
        }}
      >
        {" "}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <br />
        {loader && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <Box component="div" sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              value={credentials.email}
              onChange={(e) => {
                setCredentials({ ...credentials, email: e.target.value });
              }}
              margin="normal"
              type="email"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={credentials.password}
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {credentials.password !== "" && credentials.password.length < 8 && (
              <Alert severity="error">Minimum 8 characters required*</Alert>
            )}

            <Button
              disabled={loader}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loader ? "PLEASE WAIT..." : "SIGN IN"}
            </Button>
          </form>{" "}
          <Grid container>
            <Grid item xs>
              <Link sx={{ fontSize: "12px" }} href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
