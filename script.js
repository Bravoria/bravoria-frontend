document.addEventListener('DOMContentLoaded', () => {
    const backendUrl = 'https://bravoria-backend.onrender.com';

    const loginContainer = document.getElementById('login-container' );
    const registerContainer = document.getElementById('register-container');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    // Lógica para alternar entre os formulários
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Lógica do Formulário de Cadastro
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullName = document.getElementById('register-fullname').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        try {
            const response = await fetch(`${backendUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, email, password })
            });
            const result = await response.json();
            if (response.ok) {
                alert('Conta criada com sucesso! Agora você pode fazer o login.');
                showLoginLink.click(); // Simula o clique para voltar à tela de login
            } else {
                alert(`Erro ao criar conta: ${result.message}`);
            }
        } catch (error) {
            alert('Não foi possível se conectar ao servidor para criar a conta.');
        }
    });

    // Lógica do Formulário de Login
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        try {
            const response = await fetch(`${backendUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('bravoria_user', JSON.stringify(result.user));
                window.location.href = 'dashboard.html';
            } else {
                alert(`Falha no login: ${result.message}`);
            }
        } catch (error) {
            alert('Não foi possível se conectar ao servidor para fazer o login.');
        }
    });
});
