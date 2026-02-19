document.addEventListener('DOMContentLoaded', () => {
    // --- INÍCIO DA CONFIGURAÇÃO MANUAL ---
    const supabaseUrl = 'https://ezgcpdofdoyeftjsyptzp.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6Z2NwZGZkb3llZnRqc3lwdHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDI4NDksImV4cCI6MjA4NzAxODg0OX0.x7lylm7jv9ydn3gFialol4SH_C5KsddJDRUWgce803Y'; // SUBSTITUA PELA SUA CHAVE ANON
    // --- FIM DA CONFIGURAÇÃO MANUAL ---

    // Elementos da página
    const loginForm = document.getElementById('login-form' );
    const registerForm = document.getElementById('register-form');
    const toRegisterLink = document.getElementById('to-register');
    const toLoginLink = document.getElementById('to-login');

    // Verifica a configuração
    if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey === 'SUA_CHAVE_ANON_AQUI') {
        console.error("Erro: Chaves do Supabase não configuradas no script.js!");
        alert("Erro de configuração do sistema. Por favor, contate o suporte.");
        return;
    }

    // --- LÓGICA PARA ALTERNAR OS FORMULÁRIOS ---
    // Se o link para registrar for encontrado...
    if (toRegisterLink) {
        toRegisterLink.addEventListener('click', (e) => {
            e.preventDefault(); // Impede que o link navegue para "#"
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }

    // Se o link para login for encontrado...
    if (toLoginLink) {
        toLoginLink.addEventListener('click', (e) => {
            e.preventDefault(); // Impede que o link navegue para "#"
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    // --- LÓGICA DO FORMULÁRIO DE REGISTRO ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('register-fullname').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            try {
                const response = await fetch(`${supabaseUrl}/functions/v1/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': supabaseAnonKey
                    },
                    body: JSON.stringify({ fullName, email, password }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Falha ao criar conta.');
                }

                alert('Conta criada com sucesso! Por favor, faça o login.');
                // Volta para o formulário de login
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
                document.getElementById('login-email').value = email;
                document.getElementById('login-password').focus();

            } catch (error) {
                alert(`Erro: ${error.message}`);
            }
        });
    }
});
