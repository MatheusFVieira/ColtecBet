// Caminho: src/api/axiosConfig.js

import axios from 'axios';

// Cria uma "instância" do axios com configurações pré-definidas
const api = axios.create({
    // A baseURL é lida da nossa variável de ambiente VITE_API_BASE_URL
    baseURL: import.meta.env.VITE_API_BASE_URL
});

// Pega o token do localStorage sempre que a aplicação carrega
const token = localStorage.getItem('authToken');
if (token) {
    // Se o token existir, configura para que todas as requisições futuras o enviem
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;