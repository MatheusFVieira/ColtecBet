// Caminho: src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axiosConfig'; // Usando nossa instância centralizada do axios

// 1. Criamos o Context
const AuthContext = createContext();

// 2. Criamos o Provedor do Contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        const decodedUser = jwtDecode(storedToken);
        setUser(decodedUser);
        setToken(storedToken);
        // Não precisamos mais do axios.defaults aqui, pois o axiosConfig.js já cuida disso
      }
    } catch (error) {
      localStorage.removeItem('authToken');
      console.error("Erro ao decodificar o token, limpando...", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- FUNÇÃO LOGIN COMPLETA ---
  const login = (newToken) => {
    localStorage.setItem('authToken', newToken);
    const decodedUser = jwtDecode(newToken);
    setUser(decodedUser);
    setToken(newToken);
    // Configura o cabeçalho para a sessão atual
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  // --- FUNÇÃO LOGOUT COMPLETA ---
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setToken(null);
    // Remove o cabeçalho de autorização da nossa instância do axios
    delete api.defaults.headers.common['Authorization'];
  };

  // --- FUNÇÃO UPDATEBALANCE COMPLETA ---
  const updateBalance = (newBalance) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      // Cria um novo objeto de usuário com o saldo atualizado
      const updatedUser = { ...currentUser, saldo: newBalance };
      
      // Embora não atualizemos o token em si, para a sessão atual, o estado está correto.
      return updatedUser;
    });
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    updateBalance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Hook customizado
export function useAuth() {
  return useContext(AuthContext);
}