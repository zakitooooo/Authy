import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Delete, Refresh, Inbox } from "@mui/icons-material";
import { getAllUsers, deleteUser, User } from "./service/userService";

interface UserListProps {
  refreshTrigger: number;
}

function UserList({ refreshTrigger }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, [refreshTrigger]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des utilisateurs");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer ${email} ?`)) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteUser(id);
      await loadUsers();
    } catch (err) {
      setError("Erreur lors de la suppression");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={8}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Chargement des utilisateurs...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={loadUsers} startIcon={<Refresh />}>
          Réessayer
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h5" component="h2">
            👥 Liste des utilisateurs
          </Typography>
          <Chip
            label={users.length}
            color="primary"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
            }}
          />
        </Box>

        <Button variant="outlined" startIcon={<Refresh />} onClick={loadUsers}>
          Rafraîchir
        </Button>
      </Box>

      {users.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Inbox
            sx={{ fontSize: 100, color: "text.secondary", opacity: 0.3 }}
          />
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Aucun utilisateur enregistré
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Commencez par créer votre premier utilisateur ci-dessus !
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background:
                    "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                }}
              >
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  📧 Email
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  👤 Nom
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  👤 Prénom
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  ⚙️ Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                    opacity: deletingId === user.id ? 0.5 : 1,
                  }}
                >
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.nom}</TableCell>
                  <TableCell>{user.prenom}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(user.id!, user.email)}
                      disabled={deletingId === user.id}
                      sx={{
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {deletingId === user.id ? (
                        <CircularProgress size={24} />
                      ) : (
                        <Delete />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default UserList;
