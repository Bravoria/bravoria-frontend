document.addEventListener('DOMContentLoaded', () => {
    const backendUrl = 'https://bravoria-backend.onrender.com'; // SUA URL JÁ ESTÁ AQUI

    const formContainer = document.querySelector('.form-container' );
    let isLogin = false;

    function renderForm() {
        const formHtml = `
            <h1>${isLogin ? 'Acesse sua conta' : 'Bem-vindo à Bravor.ia'}</h1>
            <p>${isLogin ? 'Que bom te ver de volta!' : 'Sua clínica, mais inteligente.'}</p>
            
            <form id="auth-form">
                ${!isLogin ? `
                <div class="input-group">
                    <label for="fullname">Nome Completo</label>
                    <input type="text" id="fullname" name="fullname" required>
                </div>` : ''}
                <div class="input-group">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="input-group">
                    <label for="password">Senha</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit">${isLogin ? 'Entrar' : 'Criar Conta'}</button>
            </form>
            
            <div class="switch-form">
                <p>
                    ${isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                    <a href="#" id="switch-link">${isLogin ? 'Cadastre-se' : 'Faça login'}</a>
                </p>
            </div>
        `;
        formContainer.innerHTML = formHtml;
        attachEventListeners();
    }

    function attachEventListeners() {
        document.getElementById('switch-link').addEventListener('click', (e) => {
            e.preventDefault();
            isLogin = !isLogin;
            renderForm();
        });

        document.getElementById('auth-form').addEventListener('submit', handleFormSubmit);
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const endpoint = isLogin ? '/login' : '/register';
        
        const body = { email, password };
        if (!isLogin) {
            body.fullName = document.getElementById('fullname').value;
        }

        try {
            const response = await fetch(`${backendUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const result = await response.json();

            if (response.ok) {
                if (isLogin) {
                    alert(result.message);
                    // Salva os dados do usuário no navegador para usar no dashboard
                    localStorage.setItem('bravoria_user', JSON.stringify(result.user));
                    window.location.href = 'dashboard.html'; // Redireciona para o painel
                } else {
                    alert('Conta criada com sucesso! Agora faça o login.');
                    isLogin = true;
                    renderForm();
                }
            } else {
                alert(`Erro: ${result.message}`);
            }
        } catch (error) {
            console.error('Erro de comunicação:', error);
            alert('Não foi possível se conectar ao servidor.');
        }
    }

    renderForm(); // Inicia a renderização do formulário
});
