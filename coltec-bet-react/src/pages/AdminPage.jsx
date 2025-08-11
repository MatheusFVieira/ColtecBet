// Caminho: src/pages/AdminPage.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import '../styles/AdminPage.css';

function AdminPage() {
  const [partidas, setPartidas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novaPartida, setNovaPartida] = useState({
    timeCasa: '',
    timeVisitante: '',
    dataPartida: '',
    oddCasa: '',
    oddEmpate: '',
    oddVisitante: '',
  });

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

  useEffect(() => {
    fetchPartidas();
  }, []);

  const handleEncerraPartida = async (partidaId, resultado) => {
    if (!window.confirm(`Tem certeza que deseja encerrar esta partida com o resultado: ${resultado}?`)) {
      return;
    }
    try {
      const response = await api.post(`/api/admin/encerrar-partida/${partidaId}`, {
        resultado: resultado
      });
      setMessage(response.data.message);
      fetchPartidas(); 
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao encerrar a partida.');
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setNovaPartida(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
        await api.post('/api/admin/partidas', {
            ...novaPartida,
            // Convertendo odds para número antes de enviar
            oddCasa: parseFloat(novaPartida.oddCasa),
            oddEmpate: parseFloat(novaPartida.oddEmpate),
            oddVisitante: parseFloat(novaPartida.oddVisitante)
        });
        setMessage('Partida criada com sucesso!');
        setIsModalOpen(false);
        setNovaPartida({ timeCasa: '', timeVisitante: '', dataPartida: '', oddCasa: '', oddEmpate: '', oddVisitante: '' }); // Limpa o formulário
        fetchPartidas();
    } catch (error) {
        setMessage(error.response?.data?.title || 'Erro ao criar a partida.');
    }
  };

  if (isLoading) return <p>Carregando partidas em aberto...</p>;

  return (
    <div className="admin-container">
      <h2>Painel do Administrador</h2>
      {message && <p className="admin-message">{message}</p>}

      <div className="admin-actions-header">
        <h3>Partidas em Aberto</h3>
        <button onClick={() => setIsModalOpen(true)} className="add-partida-btn">Adicionar Nova Partida</button>
      </div>
      
      {partidas.length === 0 ? (
        <p>Nenhuma partida em aberto no momento.</p>
      ) : (
        partidas.map((partida) => (
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

      {isModalOpen && (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h3>Adicionar Nova Partida</h3>
                <form onSubmit={handleFormSubmit}>
                    <input name="timeCasa" value={novaPartida.timeCasa} onChange={handleFormChange} placeholder="Time da Casa" required />
                    <input name="timeVisitante" value={novaPartida.timeVisitante} onChange={handleFormChange} placeholder="Time Visitante" required />
                    <input name="dataPartida" type="datetime-local" value={novaPartida.dataPartida} onChange={handleFormChange} required />
                    <input name="oddCasa" type="number" step="0.01" value={novaPartida.oddCasa} onChange={handleFormChange} placeholder="Odd Casa (ex: 2.10)" required />
                    <input name="oddEmpate" type="number" step="0.01" value={novaPartida.oddEmpate} onChange={handleFormChange} placeholder="Odd Empate (ex: 3.25)" required />
                    <input name="oddVisitante" type="number" step="0.01" value={novaPartida.oddVisitante} onChange={handleFormChange} placeholder="Odd Visitante (ex: 3.50)" required />
                    
                    <div className="modal-actions">
                        <button type="submit">Salvar Partida</button>
                        <button type="button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;