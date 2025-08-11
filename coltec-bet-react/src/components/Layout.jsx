import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserStatus from './UserStatus';
import '../styles/Layout.css';

import logoImage from '../assets/logo1.jpg';
import partnerLogoImage from '../assets/jume.jpg';

function Layout() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <>
            <header>
                <div className="logo">
                    <Link to="/"><img src={logoImage} id="logo1" alt="Logo Coltec.BET"/></Link>
                </div>
                <div className="nav-user-container">
                    <nav>
                        <ul>
                            {user && <li><Link to="/apostas">Apostas</Link></li>}
                            <li><Link to="/suporte">Suporte</Link></li>
                            {user?.role === 'Admin' && <li><Link to="/admin">Admin</Link></li>}
                        </ul>
                    </nav>
                    {user ? <UserStatus /> : <Link to="/login" className="login-btn">Login</Link>}
                </div>
            </header>
            
            <main>
                <Outlet />
            </main>
            
            <footer>
                <div className="footer-spacer"></div>
                <div className="footer-center">
                    <p>&copy; 2025 Coltec.BET. Todos os direitos reservados.</p>
                    <div className="footer-links">
                        <Link to="/aviso-legal">Aviso Legal ⚠️</Link>
                    </div>
                </div>
                <div className="footer-partner">
                    <img src={partnerLogoImage} alt="Jumentus Oficial Partner" className="partner-logo" />
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