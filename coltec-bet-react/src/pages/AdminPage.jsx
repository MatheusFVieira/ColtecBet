// Caminho: src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig'; // <-- MUDANÇA AQUI

function AdminPage() {
  const [partidas, setPartidas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchPartidas = async () => {
    try {
      setIsLoading(true);
      // <-- MUDANÇA AQUI: Usamos 'api.get' e a URL relativa
      const response = await api.get('/api/partidas');
      setPartidas(response.data);
    } catch (error) {
      setMessage('Erro ao carregar as partidas.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartidas();
  }, []);

  const handleEncerraPartida = async (partidaId, resultado) => {
    if (!window.confirm(`Tem certeza que deseja encerrar esta partida com o resultado: ${resultado}?`)) {
      return;
    }
    try {
      // <-- MUDANÇA AQUI: Usamos 'api.post' e a URL relativa
      const response = await api.post(`/api/admin/encerrar-partida/${partidaId}`, {
        resultado: resultado
      });
      setMessage(response.data.message);
      fetchPartidas(); 
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao encerrar a partida.');
    }
  };

  // O JSX do return continua o mesmo
  if (isLoading) return <p>Carregando partidas em aberto...</p>;
  return (
    <div>
      <h2>Painel do Administrador</h2>
      {/* ... JSX da lista de partidas do admin ... */}
    </div>
  );
}
export default AdminPage;