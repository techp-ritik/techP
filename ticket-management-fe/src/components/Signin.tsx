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
import { useState,useContext } from "react";
import Alert from "@mui/material/Alert";
import { signIn } from "../api/baseapi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Usercontext } from "../App";
import { useTranslation } from "react-i18next";


export default function SignIn() {
  const [loader, setLoader] = useState(false);
  const[token,setToken]=useState("")
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate=useNavigate();
  const{user,setUser}=useContext(Usercontext)
  const{t,i18n}=useTranslation();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    setLoader(true);
    event.preventDefault();
    if (credentials.password.length < 8) {
      toast.error("Password should contain minimum 8 characters", {
        theme: "dark",
        autoClose: 1500,
        position: "top-right",
      })
      setLoader(false)
      return;
    }
    const formdata=new FormData();
    formdata.append("username",credentials.username)
    formdata.append("password",credentials.password)
    console.log(credentials)
    signIn(formdata).then((res)=>{
    console.log(res)
      if(res.user){
        navigate('/dashboard')
        localStorage.setItem("access_token",JSON.stringify(res))
        let retrievedObject=JSON.parse(localStorage.getItem("access_token") || '{}')
        setUser(retrievedObject)
       
        
        localStorage.setItem("Access Token",res.access_token)
      }
      else{
        toast.error("Invalid credentials or user does not exists. Try Again.", {
          theme: "dark",
          autoClose: 1500,
          position: "top-right",
        })
        setLoader(false)
      }
    })
    
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
          {t("signintitle")}
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
              value={credentials.username}
              onChange={(e) => {
                setCredentials({ ...credentials, username: e.target.value });
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
              <Alert severity="error">{t("password_length_message")}</Alert>
            )}

            <Button
              disabled={loader}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loader ? t("signinbutton_onload") : t("signinbutton")}
            </Button>
          </form>{" "}
          <Grid container>
            <Grid item xs>
              <Link  to='/forgetpassword'  style={{ fontSize: "12px" }} >
                {t("forget_password")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
