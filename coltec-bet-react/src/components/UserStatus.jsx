import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/UserStatus.css';

function UserStatus() {
    const { user, logout } = useAuth();

    return (
        <div className="user-status-container">
            <span className="saldo-display">Saldo: R$ {parseFloat(user.saldo).toFixed(2)}</span>
            <button onClick={logout} className="logout-btn-header">Sair</button>
        </div>
    );
}

export default UserStatus;