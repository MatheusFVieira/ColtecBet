// Dentro de src/components/UserStatus.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/UserStatus.css';

// Versão simplificada sem a prop 'isHomePage'
function UserStatus() {
    const { user, logout } = useAuth();

    // Este componente só será renderizado se houver um usuário,
    // então não precisamos da verificação 'if (!user)' aqui.
    return (
        <div className="user-status-container">
            <span className="saldo-display">Saldo: R$ {parseFloat(user.saldo).toFixed(2)}</span>
            <button onClick={logout} className="logout-btn-header">Sair</button>
        </div>
    );
}

export default UserStatus;