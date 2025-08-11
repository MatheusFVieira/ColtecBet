// Caminho: src/pages/AdminPage.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import '../styles/AdminPage.css'; // <-- IMPORTAÇÃO DO NOVO CSS

function AdminPage() {
  const [partidas, setPartidas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Função para buscar as partidas em aberto
  const fetchPartidas = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/partidas');
      setPartidas(response.data);
    } catch (error) {
      setMessage('Erro ao carregar as partidas.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Busca as partidas quando a página carrega
  useEffect(() => {
    fetchPartidas();
  }, []);

  // Função para lidar com o encerramento de uma partida
  const handleEncerraPartida = async (partidaId, resultado) => {
    if (!window.confirm(`Tem certeza que deseja encerrar esta partida com o resultado: ${resultado}?`)) {
      return;
    }

    try {
      const response = await api.post(`/api/admin/encerrar-partida/${partidaId}`, {
        resultado: resultado
      });
      setMessage(response.data.message);
      // Após encerrar, atualiza a lista de partidas em aberto
      fetchPartidas(); 
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao encerrar a partida.');
      console.error(error);
    }
  };

  if (isLoading) return <p>Carregando partidas em aberto...</p>;

  return (
    <div className="admin-container">
      <h2>Painel do Administrador</h2>
      {message && <p className="admin-message">{message}</p>}
      <h3>Partidas em Aberto</h3>
      {partidas.length === 0 ? (
        <p>Nenhuma partida em aberto no momento.</p>
      ) : (
        partidas.map((partida) => (
          // Aplicando as novas classes de CSS
          <div key={partida.id} className="partida-admin-card">
            <div className="partida-admin-info">
              <span><strong>{partida.timeCasa} vs {partida.timeVisitante}</strong> (ID: {partida.id})</span>
            </div>
            <div className="partida-admin-actions">
              <span>Encerrar com resultado: </span>
              <button onClick={() => handleEncerraPartida(partida.id, 'CASA')}>Casa Venceu</button>
              <button onClick={() => handleEncerraPartida(partida.id, 'EMPATE')}>Empate</button>
              <button onClick={() => handleEncerraPartida(partida.id, 'VISITANTE')}>Visitante Venceu</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPage;