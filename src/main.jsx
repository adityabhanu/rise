import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename='/rise'>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
