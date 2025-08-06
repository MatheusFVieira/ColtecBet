// Dentro de src/pages/LoginPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Importamos nosso hook

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Usamos a função de login do nosso contexto!
  const { login } = useAuth(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    // Lembre-se de usar a porta correta do seu backend (http, não https)
    const apiUrl = 'http://localhost:5177/api/usuarios/login';

    try {
      const response = await axios.post(apiUrl, { email, senha });
      
      // Apenas chamamos a função de login do contexto!
      login(response.data.token);

      setMessage('Login realizado com sucesso! Bem-vindo!');

    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao conectar.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- PARTE IMPORTANTE: O CÓDIGO DO FORMULÁRIO ---
  // Certifique-se de que toda esta seção 'return' está presente.
  return (
    <div>
      <h2>Página de Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;