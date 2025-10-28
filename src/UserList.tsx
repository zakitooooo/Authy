import React, { useState, useEffect } from "react";
import { getAllUsers, User } from "./service/userService";
function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect s'exécute au chargement du composant
  useEffect(() => {
    loadUsers();
  }, []);

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

  if (isLoading) {
    return <div>Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Liste des utilisateurs</h2>

      <button
        onClick={loadUsers}
        style={{
          padding: "8px 16px",
          marginBottom: "20px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Rafraîchir
      </button>

      {users.length === 0 ? (
        <p>Aucun utilisateur enregistré</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                }}
              >
                Nom
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "2px solid #ddd",
                }}
              >
                Prénom
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {user.email}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {user.nom}
                </td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  {user.prenom}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;
