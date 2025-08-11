// Caminho: src/pages/ApostasPage.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import '../styles/ApostasPage.css'; // <-- IMPORTAÇÃO DO NOVO CSS

function ApostasPage() {
  const [partidas, setPartidas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  const [betValue, setBetValue] = useState('');
  const [betMessage, setBetMessage] = useState('');
  const { updateBalance } = useAuth();

  useEffect(() => {
    fetchPartidas();
  }, []);

  const fetchPartidas = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/partidas');
      setPartidas(response.data);
    } catch (err) {
      setError('Não foi possível carregar os jogos.');
      console.error("Erro detalhado:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBetClick = (partida, escolha, odd) => {
    setSelectedBet({ partida, escolha, odd });
    setIsModalOpen(true);
    setBetMessage('');
  };

  const handlePlaceBet = async (event) => {
    event.preventDefault();
    if (!betValue || parseFloat(betValue) <= 0) {
      setBetMessage('Por favor, insira um valor válido.');
      return;
    }
    try {
      const response = await api.post('/api/apostas', {
        partidaId: selectedBet.partida.id,
        escolha: selectedBet.escolha,
        valor: parseFloat(betValue),
      });
      setBetMessage(response.data.message);
      updateBalance(response.data.novoSaldo);
      setTimeout(() => {
        setIsModalOpen(false);
        setBetValue('');
        setSelectedBet(null);
        fetchPartidas(); // Atualiza a lista de partidas, caso alguma tenha sido encerrada
      }, 1500);
    } catch (error) {
      setBetMessage(error.response?.data?.message || error.response?.data || 'Erro ao realizar a aposta.');
    }
  };

  if (isLoading) return <p>Carregando partidas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="apostas-container">
      <h2>Partidas Disponíveis</h2>
      {partidas.length === 0 ? (
        <p>Nenhuma partida disponível no momento.</p>
      ) : (
        partidas.map((partida) => (
          // Aplicando as novas classes de CSS para o card
          <div key={partida.id} className="partida-card">
            <div className="partida-header">
              <h3>{partida.timeCasa} vs {partida.timeVisitante}</h3>
            </div>
            <p className="partida-info">Data: {new Date(partida.dataPartida).toLocaleString('pt-BR')}</p>
            <div className="odds-container">
              <button onClick={() => handleBetClick(partida, 'CASA', partida.oddCasa)}>Casa: {partida.oddCasa}</button>
              <button onClick={() => handleBetClick(partida, 'EMPATE', partida.oddEmpate)}>Empate: {partida.oddEmpate}</button>
              <button onClick={() => handleBetClick(partida, 'VISITANTE', partida.oddVisitante)}>Visitante: {partida.oddVisitante}</button>
            </div>
          </div>
        ))
      )}

      {/* O MODAL DE APOSTA (sem alterações) */}
      {isModalOpen && selectedBet && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Confirmar Aposta</h3>
            <p>
              <strong>Partida:</strong> {selectedBet.partida.timeCasa} vs {selectedBet.partida.timeVisitante}
            </p>
            <p>
              <strong>Sua Escolha:</strong> {selectedBet.escolha} (Odd: {selectedBet.odd})
            </p>
            <form onSubmit={handlePlaceBet}>
              <label>Valor da Aposta (R$):</label>
              <input
                type="number"
                value={betValue}
                onChange={(e) => setBetValue(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                required
              />
              <div className="modal-actions">
                <button type="submit">Apostar</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
              </div>
            </form>
            {betMessage && <p>{betMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default ApostasPage;