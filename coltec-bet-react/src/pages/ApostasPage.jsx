// Dentro de src/pages/ApostasPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/ApostasPage.css'; // Importa nosso novo arquivo de estilo

function ApostasPage() {
  // Estados para os dados da página
  const [partidas, setPartidas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para controlar o modal de aposta
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  const [betValue, setBetValue] = useState('');
  const [betMessage, setBetMessage] = useState('');

  // Pega a função para atualizar o saldo do nosso AuthContext
  const { updateBalance } = useAuth(); 

  // Hook para buscar as partidas quando a página carrega
  useEffect(() => {
    fetchPartidas();
  }, []);

  const fetchPartidas = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5177/api/partidas');
      setPartidas(response.data);
    } catch (err) {
      setError('Não foi possível carregar os jogos. Verifique se o servidor backend está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

  // Função chamada quando um botão de odd é clicado para abrir o modal
  const handleBetClick = (partida, escolha, odd) => {
    setSelectedBet({ partida, escolha, odd });
    setIsModalOpen(true);
    setBetMessage(''); // Limpa mensagens antigas do modal
  };

  // Função chamada quando a aposta é confirmada no modal
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

      // Usa a função do contexto para atualizar o saldo no header instantaneamente
      updateBalance(response.data.novoSaldo);

      // Fecha o modal após um curto período para o usuário ler a mensagem
      setTimeout(() => {
        setIsModalOpen(false);
        setBetValue('');
        setSelectedBet(null);
      }, 2000);

    } catch (error) {
      setBetMessage(error.response?.data?.message || error.response?.data || 'Erro ao realizar a aposta.');
    }
  };

  // Renderização do componente
  if (isLoading) return <p>Carregando partidas...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div className="partidas-container">
      <h2>Partidas Disponíveis</h2>
      {partidas.length === 0 ? (
        <p>Nenhuma partida disponível no momento. (Certifique-se de adicionar dados no seu banco de dados local)</p>
      ) : (
        partidas.map((partida) => (
          <div key={partida.id} className="partida-card">
            <h3>{partida.timeCasa} vs {partida.timeVisitante}</h3>
            <p>Data: {new Date(partida.dataPartida).toLocaleString('pt-BR')}</p>
            <div className="odds-container">
              <strong>Odds:</strong>
              <button onClick={() => handleBetClick(partida, 'CASA', partida.oddCasa)}>Casa: {partida.oddCasa}</button>
              <button onClick={() => handleBetClick(partida, 'EMPATE', partida.oddEmpate)}>Empate: {partida.oddEmpate}</button>
              <button onClick={() => handleBetClick(partida, 'VISITANTE', partida.oddVisitante)}>Visitante: {partida.oddVisitante}</button>
            </div>
          </div>
        ))
      )}

      {/* O MODAL DE APOSTA (só aparece quando isModalOpen é true) */}
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
                autoFocus
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