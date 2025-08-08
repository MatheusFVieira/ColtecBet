// Dentro de src/components/Layout.jsx

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserStatus from './UserStatus';
import '../styles/Layout.css';

function Layout() {
    const { user } = useAuth();

    return (
        <>
            <header>
                <div className="logo">
                    <Link to="/"><img src="../../public/logo1.jpg" id="logo1" alt="Logo Coltec.BET"/></Link>
                </div>

                <div className="nav-user-container">
                    <nav>
                        <ul>
                            {user && <li><Link to="/apostas">Apostas</Link></li>}
                            <li><Link to="/suporte">Suporte</Link></li>
                            {user?.role === 'Admin' && <li><Link to="/admin">Admin</Link></li>}
                        </ul>
                    </nav>

                    {/* Lógica para mostrar o status do usuário OU o botão de login */}
                    {user ? (
                        <UserStatus />
                    ) : (
                        <Link to="/login" className="login-btn">Login</Link>
                    )}
                </div>
            </header>
            
            <main>
                <Outlet />
            </main>
            
            <footer>
                <div className="footer-spacer"></div>

                {/* Container central com os links */}
                <div className="footer-center">
                    <p>&copy; 2025 COLTEC.bet Todos os direitos reservados.</p>
                    <div className="footer-links">
                        <Link to="/aviso-legal">Aviso Legal ⚠️</Link>
                    </div>
                </div>

                {/* Container do parceiro no canto direito */}
                <div className="footer-partner">
                    <img src="../../public/jume.jpg" alt="Jumentus Oficial Partner" className="partner-logo" />
                    <div className="partner-text">
                        <span>Jumentus</span>
                        <span>Official</span>
                        <span>Partner</span>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Layout;