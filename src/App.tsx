import React from "react";
import "./App.css";
import UserForm from "./UserForm";
import UserList from "./UserList";

function App() {
  return (
    <div className="App">
      <h1>Authy - Gestion des utilisateurs</h1>
      <UserForm />
      <UserList />
    </div>
  );
}

export default App;
