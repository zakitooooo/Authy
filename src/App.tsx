import React, { useState } from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import UserForm from "./UserForm";
import UserList from "./UserList";

// Créer un thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: "#667eea",
      light: "#9fa5ea",
      dark: "#4c5dd4",
    },
    secondary: {
      main: "#764ba2",
    },
    background: {
      default: "#f5f7fa",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserCreated = () => {
    setRefreshTrigger((old) => old + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            align="center"
            sx={{
              color: "white",
              mb: 4,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            🔐 Authy
          </Typography>

          <Paper elevation={6} sx={{ p: 4, mb: 3 }}>
            <UserForm onUserCreated={handleUserCreated} />
          </Paper>

          <Paper elevation={6} sx={{ p: 4 }}>
            <UserList refreshTrigger={refreshTrigger} />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
