// Dentro de src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // --- NOVA LINHA AQUI ---
  const [isLoading, setIsLoading] = useState(true); // Começa como 'true'

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        const decodedUser = jwtDecode(storedToken);
        setUser(decodedUser);
        setToken(storedToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
    } catch (error) {
      // Se o token for inválido, limpa tudo
      localStorage.removeItem('authToken');
      console.error("Erro ao decodificar o token", error);
    } finally {
      // --- NOVA LINHA AQUI ---
      // Diz à aplicação que já terminamos de verificar, independentemente do resultado
      setIsLoading(false);
    }
  }, []);

  const login = (newToken) => { /* ... continua igual ... */ };
  const logout = () => { /* ... continua igual ... */ };
  const updateBalance = (newBalance) => { /* ... continua igual ... */ };

  const value = {
    user,
    token,
    isLoading, // <-- Exporta o novo estado
    login,
    logout,
    updateBalance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}