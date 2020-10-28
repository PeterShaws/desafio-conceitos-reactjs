import React, { useEffect, useState } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const response = await api.get("repositories");
        setRepositories(response.data);
      } catch (error) {
        console.warn(error.response || error);
      }
    }
    fetchRepositories();
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Repository #${repositories.length + 1}`,
      url: "https://github.com/PeterShaws/desafio-conceitos-reactjs",
      techs: ["JavaScript", "React", "React DOM"],
    };
    try {
      const response = await api.post("repositories", repository);
      if (response.status === 201) {
        const newRepository = response.data;
        setRepositories([...repositories, newRepository]);
      } else {
        throw new Error(`${response.statusText} (${response.status})`);
      }
    } catch (err) {
      console.warn("[ERROR] handleAddRepository:", err.response || err);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`repositories/${id}`);
      if (response.status === 204) {
        setRepositories(
          repositories.filter((repository) => repository.id !== id)
        );
      } else {
        throw new Error(`${response.statusText} (${response.status})`);
      }
    } catch (err) {
      console.warn("[ERROR] handleRemoveRepository:", err.response || err);
    }
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
