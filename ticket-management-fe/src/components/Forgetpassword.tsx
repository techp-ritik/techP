import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { forgetpasswordlink, forgetpasswordreset } from "../api/baseapi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { PasswordResetLink } from "../api/baseapi";

export default function Forgetpassword() {
  const [loader, setLoader] = useState(false);
  const [flag, setFlag] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const forgetPasswordMutation = useMutation(
    (params: { request: PasswordResetLink }) =>
      forgetpasswordlink(params.request),
    {
      onSuccess: (data, variables, context) => {
        toast(data);
        setFlag(true);
        setLoader(false);
      },
      onError: (error) => {
        toast.error("" + error);
        setLoader(false);
      },
    }
  );

  const newPasswordCreateMutation = useMutation(
    (params: { request: any; email: string }) =>
      forgetpasswordreset(params.request, params.email),
    {
      onSuccess: (data, variables, context) => {
        toast(data);

        setFlag(true);
        setLoader(false);
        navigate("/login");
        setCredentials({
          email: "",
          password: "",
          otp: "",
        });
      },
      onError: (error) => {
        toast.error("" + error);
        setLoader(false);
      },
    }
  );
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoader(true);
    event.preventDefault();

    const request = {
      email: credentials.email,
    };

    forgetPasswordMutation.mutate({ request });
  };
  const handlepasswordsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoader(true);
    event.preventDefault();
    if (credentials.password.length < 8) {
      toast.error("Password should contain minimum 8 characters", {
        theme: "dark",
        autoClose: 1500,
        position: "top-right",
      });
      setLoader(false);
      return;
    }

    const request = {
      password: credentials.password,
      otp_code: credentials.otp,
    };
    const email = credentials.email;

    newPasswordCreateMutation.mutate({ request, email });
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
          {t("reset_password_title")}
        </Typography>
        <br />
        {loader && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <Box component="div" sx={{ mt: 1 }}>
          {!flag ? (
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
              <Button
                disabled={loader}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loader ? t("signinbutton_onload") : t("reset_link_button")}
              </Button>
            </form>
          ) : (
            <form onSubmit={handlepasswordsubmit}>
              <TextField
                value={credentials.password}
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {credentials.password !== "" &&
                credentials.password.length < 8 && (
                  <Alert severity="error">{t("password_length_message")}</Alert>
                )}

              <TextField
                value={credentials.otp}
                onChange={(e) => {
                  setCredentials({ ...credentials, otp: e.target.value });
                }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Reset Code"
                type="text"
                id="password"
                autoComplete="current-password"
              />
              <Button
                disabled={loader}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loader ? t("signinbutton_onload") : t("submit_button")}
              </Button>
            </form>
          )}

          <Grid container>
            <Grid item xs>
              <Link to="/login" style={{ fontSize: "12px" }}>
                {t("back_to_login")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
