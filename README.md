# <p align="center">🎯 Coltec.BET</p>

<p align="center"><em>Projeto Web Full Stack de simulação de apostas esportivas com fins educacionais.</em></p>

---

## 📚 Sobre o Projeto

**Coltec.BET** é uma aplicação web completa desenvolvida para simular um ambiente de apostas esportivas, com o objetivo de praticar e demonstrar habilidades em desenvolvimento Full Stack. O sistema possui um frontend moderno construído em React e um backend robusto em .NET 8, com autenticação via JWT e um banco de dados PostgreSQL.

### Principais Funcionalidades

O projeto foi estruturado para abranger o ciclo de vida completo de uma aposta, incluindo:

* **Autenticação de Usuários:** Um sistema seguro de registro e login que utiliza Tokens JWT (JSON Web Tokens) para gerenciar as sessões dos usuários.

* **Painel de Administrador:** Uma área restrita e protegida por "roles" (papéis), onde um administrador pode criar novas partidas, definir os times, data, e as odds (cotações) para cada resultado (vitória da casa, empate, vitória do visitante).

* **Sistema de Apostas:** Usuários logados podem visualizar as partidas disponíveis e registrar suas apostas, com o valor sendo debitado de um saldo fictício.

* **Processamento de Resultados:** O administrador pode encerrar uma partida e declarar o resultado final. Automaticamente, o sistema processa todas as apostas associadas àquela partida, calcula os ganhos para os vencedores com base nas odds, atualiza o saldo de cada usuário e marca o status da aposta como "GANHOU" ou "PERDEU".

### Integração com API Externa (Prova de Conceito)

Durante o desenvolvimento, o projeto foi projetado e adaptado para consumir dados de uma API de esportes real, demonstrando a capacidade de integração com serviços de terceiros. A aplicação conseguiu se conectar, autenticar e buscar com sucesso dados de partidas de ligas profissionais.

No entanto, optamos por não manter essa integração na versão final devido às limitações dos planos gratuitos das APIs disponíveis. Essas restrições, como o acesso limitado a dados de temporadas futuras ou a funcionalidades de consulta específicas (essenciais para um sistema de apostas em tempo real), impediam a implementação completa da lógica de negócio. A solução adotada foi utilizar o banco de dados interno (PostgreSQL), o que garante controle total sobre os dados e permite a demonstração completa de todas as funcionalidades do sistema, desde a criação da partida até o pagamento das apostas.

> ### ⚠️ Aviso Legal
>
> O **COLTEC.bet** é um jogo digital de simulação e entretenimento, **sem qualquer relação com casas de apostas reais.** Não se trata de uma plataforma de apostas esportivas. **Não é possível depositar, sacar ou movimentar dinheiro real dentro deste sistema.** Todas as interações no site são fictícias, voltadas exclusivamente para **fins educacionais e recreativos.** O principal objetivo deste projeto é praticar técnicas de desenvolvimento web Fullstack e contribuir para a construção de um portfólo pessoal.
> 
> Além disso, deixamos claro que **não temos qualquer vínculo com o Colégio Técnico da UFMG (COLTEC).** O nome do projeto é uma **homenagem bem-humorada** à instituição onde estudamos. Somos ex-alunos, e o desenvolvimento deste jogo foi possível graças aos conhecimentos adquiridos durante o curso técnico. Trata-se de um tributo feito com carinho e respeito, **sem fins comerciais nem associação institucional.**
> 
> **Não incentivamos, de forma alguma, a prática de apostas reais.** Elas podem causar **vício, prejuízos financeiros** e impactar negativamente a vida das pessoas. **Reforçamos que plataformas reais de apostas são exclusivas para maiores de 18 anos🔞** e devem ser utilizadas com extrema responsabilidade, se for o caso.

---

## 🌐 Acesse o Projeto Publicado

Você pode interagir com a aplicação completa e funcional através dos links abaixo.

> **Nota:** A API (backend) está hospedada em um plano gratuito no Render, que "dorme" após 15 minutos de inatividade. A primeira requisição (como o login) pode demorar de 30 a 60 segundos para "acordar" o servidor. Após o primeiro acesso, a aplicação se torna rápida e responsiva.

* 🔗 **Frontend (Vercel):** **[https://coltec-bet.vercel.app/](https://coltec-bet.vercel.app/)**
* 🔗 **Backend (Render):** **[https://coltec-bet-api.onrender.com/swagger](https://coltec-bet-api.onrender.com/swagger)**

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com um ecossistema moderno de desenvolvimento web, separando as responsabilidades entre o cliente (frontend) e o servidor (backend).

### **Frontend (Interface do Usuário)**
<div style="display: flex; gap: 10px; align-items: center;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="React" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="HTML5" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="CSS3" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" height="40" alt="Vite" />
</div>

### **Backend (Servidor e Lógica de Negócio)**
<div style="display: flex; gap: 10px; align-items: center;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" height="40" alt=".NET" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" height="40" alt="C#" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="40" alt="PostgreSQL" />
</div>

### **DevOps (Publicação e Ferramentas)**
<div style="display: flex; gap: 10px; align-items: center;">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="40" alt="Git" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="40" alt="GitHub" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height="40" alt="Docker" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" height="40" alt="Vercel" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/render/render-original.svg" height="40" alt="Render" />
</div>

---

## 👨‍💻 Desenvolvedor

* [Matheus Freitas](https://github.com/MatheusFVieira)
* [Pedro Henrique](https://github.com/DevWannabe-dot)

---

## 📌 To-Do (Próximos Passos)

- [ ] Adicionar compatibilidade e responsividade completa para dispositivos mobile.
- [ ] Implementar um sistema de hash de senhas no backend para maior segurança.
- [ ] Criar uma página de "Histórico de Apostas" para o usuário.
- [ ] Adicionar testes unitários para a lógica de negócio da API.
