// Aguarda o conteúdo da página ser totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async (event) => {
        // Previne o comportamento padrão do formulário (recarregar a página)
        event.preventDefault();

        // Pega os valores dos campos do formulário
        const fullName = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // !! IMPORTANTE: Substitua pela URL do seu backend na Render !!
        const backendUrl = https://bravoria-backend.onrender.com;

        try {
            // Envia os dados para o backend usando o método POST
            const response = await fetch(`${backendUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: fullName,
                    email: email,
                    password: password,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                // Se a resposta for bem-sucedida (status 2xx)
                alert('Conta criada com sucesso! Você será redirecionado.');
                // Futuramente, redirecionar para o painel de controle:
                // window.location.href = '/dashboard.html'; 
            } else {
                // Se o servidor retornar um erro (ex: e-mail já existe)
                alert(`Erro: ${result.message}`);
            }
        } catch (error) {
            // Se houver um erro de rede (backend fora do ar, etc)
            console.error('Erro de comunicação com o servidor:', error);
            alert('Não foi possível se conectar ao servidor. Tente novamente mais tarde.');
        }
    });
});
