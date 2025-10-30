import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Email, Lock, Person, PersonAdd } from "@mui/icons-material";
import { createUser, User } from "./service/userService";

interface UserFormProps {
  onUserCreated: () => void;
}

function UserForm({ onUserCreated }: UserFormProps) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const newUser: User = {
      email,
      motDePasse,
      nom,
      prenom,
    };

    try {
      await createUser(newUser);

      setMessage("Utilisateur créé avec succès !");
      setIsError(false);

      setEmail("");
      setMotDePasse("");
      setNom("");
      setPrenom("");

      onUserCreated();
    } catch (error: any) {
      if (error.response?.status === 400) {
        setMessage("Cet email est déjà utilisé !");
      } else {
        setMessage("Erreur lors de la création de l'utilisateur");
      }
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        📝 Inscription
      </Typography>

      {message && (
        <Alert
          severity={isError ? "error" : "success"}
          sx={{ mb: 3 }}
          onClose={() => setMessage("")}
        >
          {message}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemple@email.com"
            required
            disabled={isLoading}
            InputProps={{
              startAdornment: <Email sx={{ mr: 1, color: "action.active" }} />,
            }}
          />

          <TextField
            fullWidth
            type="password"
            label="Mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            placeholder="Minimum 6 caractères"
            inputProps={{ minLength: 6 }}
            required
            disabled={isLoading}
            InputProps={{
              startAdornment: <Lock sx={{ mr: 1, color: "action.active" }} />,
            }}
          />

          <TextField
            fullWidth
            type="text"
            label="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Votre nom"
            required
            disabled={isLoading}
            InputProps={{
              startAdornment: <Person sx={{ mr: 1, color: "action.active" }} />,
            }}
          />

          <TextField
            fullWidth
            type="text"
            label="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Votre prénom"
            required
            disabled={isLoading}
            InputProps={{
              startAdornment: <Person sx={{ mr: 1, color: "action.active" }} />,
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
            startIcon={
              isLoading ? <CircularProgress size={20} /> : <PersonAdd />
            }
            sx={{
              background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
              boxShadow: "0 3px 5px 2px rgba(102, 126, 234, .3)",
              "&:hover": {
                background: "linear-gradient(45deg, #5568d3 30%, #66408a 90%)",
              },
            }}
          >
            {isLoading ? "Création en cours..." : "S'inscrire"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default UserForm;
