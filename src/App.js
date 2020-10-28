import React, { useEffect, useState } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositores] = useState([]);

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const response = await api.get("repositories");
        setRepositores(response.data);
      } catch (error) {
        console.warn(error.response || error);
      }
    }
    fetchRepositories();
  }, []);

  async function handleAddRepository() {
    // TODO
    console.log("handleAddRepository");
  }

  async function handleRemoveRepository(id) {
    // TODO
    console.log("handleRemoveRepository", id);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
