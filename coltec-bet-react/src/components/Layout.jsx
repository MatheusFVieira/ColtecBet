import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserStatus from './UserStatus';
import '../styles/Layout.css';

function Layout() {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header>
                <div className="logo">
                    <Link to="/"><img src="/logo1.jpg" id="logo1" alt="Logo Coltec.BET"/></Link>
                </div>

                <button className="menu-toggle" onClick={toggleMenu}>
                    &#9776;
                </button>

                <div className={`nav-user-container ${isMenuOpen ? 'open' : ''}`}>
                    <nav>
                        <ul>
                            {user && <li><Link to="/apostas">Apostas</Link></li>}
                            <li><Link to="/suporte">Suporte</Link></li>
                            {user?.role === 'Admin' && <li><Link to="/admin">Admin</Link></li>}
                        </ul>
                    </nav>

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
                <p>&copy; 2024 Coltec.BET. Todos os direitos reservados.</p>
                <div className="footer-spacer"></div>
                <div className="footer-center">
                    <div className="footer-links">
                        <Link to="/suporte">Suporte</Link>
                        <span>|</span>
                        <Link to="/aviso-legal">Aviso Legal</Link>
                    </div>
                </div>
                <div className="footer-partner">
                    <img src="/jumetos-logo.png" alt="Jumetos Oficial Partner" className="partner-logo" />
                    <div className="partner-text">
                        <span>Jumetos</span>
                        <span>Oficial</span>
                        <span>Partner</span>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Layout;