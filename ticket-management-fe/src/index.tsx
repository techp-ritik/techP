import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import TicketTheme from "./components/TicketTheme";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query"
import './i18'




const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryclient=new QueryClient()
root.render(
  <BrowserRouter>
 <QueryClientProvider client={queryclient} >
    <ThemeProvider theme={TicketTheme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
