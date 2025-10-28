import React, { useState } from "react";
import { createUser, User } from "./service/userService";

function UserForm() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  // Nouveaux états pour les messages
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Créer l'objet utilisateur
    const newUser: User = {
      email,
      motDePasse,
      nom,
      prenom,
    };

    try {
      // Envoyer à l'API
      const createdUser = await createUser(newUser);

      // Succès !
      setMessage(`Utilisateur créé avec succès ! ID: ${createdUser.id}`);
      setIsError(false);

      // Réinitialiser le formulaire
      setEmail("");
      setMotDePasse("");
      setNom("");
      setPrenom("");
    } catch (error: any) {
      // Erreur !
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
    <div>
      <h2>Inscription</h2>

      {/* Afficher les messages */}
      {message && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
            backgroundColor: isError ? "#ffebee" : "#e8f5e9",
            color: isError ? "#c62828" : "#2e7d32",
            border: `1px solid ${isError ? "#ef5350" : "#66bb6a"}`,
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label>Prénom :</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Création en cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
