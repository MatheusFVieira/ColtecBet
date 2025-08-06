// Caminho: src/components/Layout.jsx

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Layout.css'; // O estilo para este componente

function Layout() {
    const { user, logout } = useAuth();

    return (
        <>
            <header>
                <div className="logo">
                    <Link to="/"><img src="/logo1.jpg" id="logo1" alt="Logo Coltec.BET"/></Link>
                </div>
                <nav>
                    <ul>
                        {/* Links que aparecem para todos */}
                        {user && <li><Link to="/apostas">Apostas</Link></li>}
                        <li><Link to="/suporte">Suporte</Link></li>
                        
                        {/* Links que só aparecem para o Admin */}
                        {user?.role === 'Admin' && <li><Link to="/admin">Admin</Link></li>}
                        
                        {/* Lógica para mostrar o saldo e botão de sair OU o botão de login */}
                        {user ? (
                            <>
                                <li className="user-info">
                                    <span>Olá, {user.name}! (Saldo: R$ {parseFloat(user.saldo).toFixed(2)})</span>
                                </li>
                                <li>
                                    <button onClick={logout} className="logout-btn">Sair</button>
                                </li>
                            </>
                        ) : (
                            <li><Link to="/login" className="login-btn">Login</Link></li>
                        )}
                    </ul>
                </nav>
            </header>

            <main>
                {/* O <Outlet /> é a parte mágica que renderiza a página da rota atual (HomePage, LoginPage, etc.) */}
                <Outlet />
            </main>
            
            <footer>
                <p>&copy; 2024 Coltec.BET. Todos os direitos reservados.</p>
            </footer>
        </>
    );
}

export default Layout;