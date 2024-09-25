<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Coltec.BET</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <header>
        <div class="logo">
            <a href="index.html"><img src="Assets/logo1.jpg" id="logo1"></a>
        </div>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="#">Apostas</a></li>
                <li><a href="esportes.html">Esportes</a></li>
                <li><a href="suporte.html">Suporte</a></li>
            </ul>
        </nav>
    </header>

    <div class="main-content">
        <section class="login-section">
            <div class="login-box">
                <h2>Login na Coltec.BET</h2>
                <form action="login.php" method="POST">
                    <div class="input-box">
                        <label for="username">Usuário</label>
                        <input type="text" id="username" name="username" placeholder="Digite seu usuário" required>
                    </div>
                    <div class="input-box">
                        <label for="password">Senha</label>
                        <input type="password" id="password" name="password" placeholder="Digite sua senha" required>
                    </div>
                    <div class="input-box">
                        <button type="submit" class="login-btn">Entrar</button>
                    </div>
                </form>
                <p>Não tem uma conta? <a href="#">Cadastre-se</a></p>
            </div>
        </section>
    </div>

    <footer>
        <p>&copy; 2024 Coltec.BET. Todos os direitos reservados.</p>
    </footer>

    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $dados = "$username|$password\n";

        file_put_contents('dados_alunos.txt', $dados, FILE_APPEND | LOCK_EX);
        echo "<p>Cadastrado com sucesso!</p>";
    }
    ?>

</body>
</html>
