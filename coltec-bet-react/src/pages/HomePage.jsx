import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/HomePage.css';

function HomePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleComeceAgora = () => {
        if (user) {
            navigate('/apostas');
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <section className="hero">
                <div className="hero-text">
                    <h2>Bem-vindo ao Coltec.BET</h2>
                    <p>Aposte nos seus times favoritos e ganhe prêmios incríveis!</p>
                    <button onClick={handleComeceAgora} className="cta-btn">Comece Agora</button>
                </div>
            </section>

            <section className="features">
                <div className="feature">
                    <h3>Melhores Odds</h3>
                    <p>Garantimos as melhores odds para você maximizar seus lucros.</p>
                </div>
            </section>
        </>
    );
}
export default HomePage;