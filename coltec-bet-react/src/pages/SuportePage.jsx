import React from 'react';
import '../styles/SuportePage.css';

function SuportePage() {
    return (
        <section className="support-section">
            <h2>Suporte ao Cliente</h2>
            <p>Se você estiver com algum problema ou dúvida, estamos aqui para ajudar! Entre em contato conosco através do email abaixo:</p>
            <div className="email-section">
                <p><strong>Email de suporte:</strong></p>
                <a href="mailto:suportecoltec.bet@gmail.com" className="email-link">suportecoltec.bet@gmail.com</a>
            </div>
            <p>Responderemos sua solicitação o mais rápido possível. Obrigado por escolher a Coltec.BET!</p>
        </section>
    );
}

export default SuportePage;