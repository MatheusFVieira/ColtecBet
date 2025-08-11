import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AvisoLegalPage.css'; // Estilo específico para esta página

function AvisoLegalPage() {
    return (
        <div className="legal-container">
            <h2>Aviso Legal ⚠️</h2>

            <div className="legal-content">
                <p>
                    O <strong>COLTEC.bet</strong> é um jogo digital de simulação e entretenimento, <strong>sem qualquer relação com casas de apostas reais.</strong> Não se trata de uma plataforma de apostas esportivas. <strong>Não é possível depositar, sacar ou movimentar dinheiro real dentro deste sistema.</strong> Todas as interações no site são fictícias, voltadas exclusivamente para <strong>fins educacionais e recreativos.</strong> O principal objetivo deste projeto é praticar técnicas de desenvolvimento web Fullstack e contribuir para a construção de um portfólio pessoal.<br></br><br></br>

                    Além disso, deixamos claro que <strong>não temos qualquer vínculo com o Colégio Técnico da UFMG (COLTEC).</strong> O nome do projeto é uma <strong>homenagem bem-humorada</strong> à instituição onde estudamos. Somos ex-alunos, e o desenvolvimento deste jogo foi possível graças aos conhecimentos adquiridos durante o curso técnico. Trata-se de um tributo feito com carinho e respeito, <strong>sem fins comerciais nem associação institucional.</strong><br></br><br></br>

                    <strong>Não incentivamos, de forma alguma, a prática de apostas reais.</strong> Elas podem causar <strong>vício, prejuízos financeiros</strong> e impactar negativamente a vida das pessoas. <strong>Reforçamos que plataformas reais de apostas são exclusivas para maiores de 18 anos🔞</strong>e devem ser utilizadas com extrema responsabilidade, se for o caso.<br></br><br></br>

                    <a href="https://investalk.bb.com.br/noticias/quero-aprender/aposta-esportiva-nao-e-investimento-entenda-por-que" target="_blank">
                    👉 Aposta esportiva não é investimento: entenda o porquê.
                    </a>
                </p>

            </div>

            <div className="legal-contact">
                <h3>Dúvidas ou Reclamações</h3>
                <p>
                    Para qualquer dúvida, reclamação ou esclarecimento sobre nossos termos, por favor, entre em contato 
                    através do nosso canal de suporte.
                </p>
                <Link to="/suporte" className="support-button">
                    Entrar em Contato com o Suporte
                </Link>
            </div>
        </div>
    );
}

export default AvisoLegalPage;