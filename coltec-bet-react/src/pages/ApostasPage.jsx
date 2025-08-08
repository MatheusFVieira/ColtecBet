// Caminho: src/pages/ApostasPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig'; // <-- MUDANÇA AQUI
import { useAuth } from '../context/AuthContext';

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
      // <-- MUDANÇA AQUI: Usamos 'api.get' e a URL relativa
      const response = await api.get('/api/partidas');
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
      // <-- MUDANÇA AQUI: Usamos 'api.post' e a URL relativa
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
      }, 1500);
    } catch (error) {
      setBetMessage(error.response?.data?.message || error.response?.data || 'Erro ao realizar a aposta.');
    }
  };

  // O JSX do return continua o mesmo
  if (isLoading) return <p>Carregando partidas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return (
    <div>
      <h2>Partidas Disponíveis</h2>
      {/* ... JSX da lista de partidas e do modal ... */}
    </div>
  );
}
export default ApostasPage;