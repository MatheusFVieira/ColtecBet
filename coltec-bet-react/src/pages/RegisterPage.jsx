// Dentro de src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// Usaremos o mesmo CSS da página de login para manter a consistência
import '../styles/LoginPage.css'; 

function RegisterPage() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            await axios.post('http://localhost:5177/api/usuarios/registrar', {
                nome,
                email,
                senha
            });

            // Após o sucesso, avisa o usuário e o redireciona para o login
            alert('Registro realizado com sucesso! Por favor, faça o login.');
            navigate('/login');

        } catch (error) {
            setMessage(error.response?.data || 'Ocorreu um erro durante o registro.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="login-section">
            <div className="login-box">
                <h2>Crie sua Conta</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Digite seu nome completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Digite seu melhor email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Crie uma senha segura"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <button type="submit" className="login-btn-form" disabled={isLoading}>
                            {isLoading ? 'Registrando...' : 'Registrar'}
                        </button>
                    </div>
                </form>
                {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
                <p>Já tem uma conta? <Link to="/login">Faça o login</Link></p>
            </div>
        </section>
    );
}

export default RegisterPage;