<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $dados = "$username|$password\n";

    file_put_contents('dados_alunos.txt', $dados, FILE_APPEND | LOCK_EX);
    echo "<p>Cadastrado com sucesso!</p>";
}
?>