// Caminho: src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const [partidas, setPartidas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  const [betValue, setBetValue] = useState('');
  const [betMessage, setBetMessage] = useState('');

  const { updateBalance } = useAuth(); // Pegamos a nova função do contexto

  useEffect(() => {
    fetchPartidas();
  }, []);

  const fetchPartidas = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5177/api/partidas');
      setPartidas(response.data);
    } catch (err) {
      setError('Não foi possível carregar os jogos.');
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
    if (betValue <= 0) {
      setBetMessage('Por favor, insira um valor válido.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5177/api/apostas', {
        partidaId: selectedBet.partida.id,
        escolha: selectedBet.escolha,
        valor: parseFloat(betValue),
      });
      
      setBetMessage(response.data.message);
      
      // ATUALIZAÇÃO INSTANTÂNEA DO SALDO USANDO O CONTEXTO!
      updateBalance(response.data.novoSaldo);

      // Fecha o modal após um pequeno delay para o usuário ler a mensagem
      setTimeout(() => {
        setIsModalOpen(false);
        setBetValue('');
        setSelectedBet(null);
      }, 2000);

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data || 'Erro ao realizar a aposta.';
      setBetMessage(errorMessage);
    }
  };

  if (isLoading) return <p>Carregando partidas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Partidas Disponíveis</h2>
      {partidas.map((partida) => (
        <div key={partida.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h3 style={{textAlign: 'center'}}>{partida.timeCasa} vs {partida.timeVisitante}</h3>
          <p style={{textAlign: 'center'}}>Data: {new Date(partida.dataPartida).toLocaleString('pt-BR')}</p>
          <div style={{textAlign: 'center'}}>
            <strong>Odds:</strong>
            <button onClick={() => handleBetClick(partida, 'CASA', partida.oddCasa)}>Casa: {partida.oddCasa}</button>
            <button onClick={() => handleBetClick(partida, 'EMPATE', partida.oddEmpate)}>Empate: {partida.oddEmpate}</button>
            <button onClick={() => handleBetClick(partida, 'VISITANTE', partida.oddVisitante)}>Visitante: {partida.oddVisitante}</button>
          </div>
        </div>
      ))}

      {isModalOpen && selectedBet && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h3>Confirmar Aposta</h3>
            <p><strong>Partida:</strong> {selectedBet.partida.timeCasa} vs {selectedBet.partida.timeVisitante}</p>
            <p><strong>Sua Escolha:</strong> {selectedBet.escolha} (Odd: {selectedBet.odd})</p>
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

      <style>{`
        .modal-backdrop {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-color: rgba(0, 0, 0, 0.5); display: flex;
          justify-content: center; align-items: center;
        }
        .modal-content {
          background-color: white; padding: 20px; border-radius: 5px;
          min-width: 300px;
        }
        .modal-actions { margin-top: 15px; }
      `}</style>
    </div>
  );
}

export default HomePage;