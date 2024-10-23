import { BrowserRouter } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { AppRouter } from "@config/routes";
import { theme } from "@config/styles";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}
