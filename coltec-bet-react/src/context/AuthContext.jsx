// Caminho: src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      const decodedUser = jwtDecode(storedToken);
      setUser(decodedUser);
      setToken(storedToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem('authToken', newToken);
    const decodedUser = jwtDecode(newToken);
    setUser(decodedUser);
    setToken(newToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  // Nova função para atualizar o saldo no estado global
  const updateBalance = (newBalance) => {
    if (user) {
      setUser(currentUser => ({
        ...currentUser, // Mantém todas as outras informações do usuário
        saldo: newBalance // Atualiza apenas o saldo
      }));
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    updateBalance // Exporta a nova função para ser usada por outros componentes
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}