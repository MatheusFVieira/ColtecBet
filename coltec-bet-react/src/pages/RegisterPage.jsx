// Dentro de src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import axios from 'axios'; // Importamos o axios

function RegisterPage() {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Estado para armazenar mensagens de sucesso ou erro
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função chamada quando o formulário é enviado
  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento da página
    setIsLoading(true);
    setMessage('');

    // IMPORTANTE: Substitua o número da porta (7123) pelo que aparece no seu terminal do backend!
    const apiUrl = 'http://localhost:5177/api/usuarios/registrar';

    try {
      // Faz a requisição POST para a API usando axios
      const response = await axios.post(apiUrl, {
        nome: nome,
        email: email,
        senha: senha,
      });

      // Se a requisição for bem-sucedida, mostra a mensagem de sucesso
      setMessage(response.data.message);

    } catch (error) {
      // Se ocorrer um erro, pega a mensagem de erro da API e a exibe
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage('Ocorreu um erro ao tentar se conectar com o servidor.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Página de Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
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
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      {/* Exibe a mensagem de sucesso ou erro */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterPage;