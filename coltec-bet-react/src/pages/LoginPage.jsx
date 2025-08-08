// Caminho: src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig'; // <-- MUDANÇA AQUI
import '../styles/pages/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      // <-- MUDANÇA AQUI: Usamos 'api.post' e a URL relativa
      const response = await api.post('/api/usuarios/login', { email, senha });
      login(response.data.token);
      navigate('/apostas'); 
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao conectar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-section">
        <div className="login-box">
            <h2>Login na Coltec.BET</h2>
            <form onSubmit={handleSubmit}>
                 {/* O JSX do formulário continua o mesmo */}
                 <div className="input-box">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-box">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>
                <div className="input-box">
                    <button type="submit" className="login-btn-form" disabled={isLoading}>
                      {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </div>
            </form>
            {message && <p style={{color: 'red', marginTop: '10px'}}>{message}</p>}
            <p>Não tem uma conta? <Link to="/registrar">Cadastre-se</Link></p>
        </div>
    </section>
  );
}

export default LoginPage;