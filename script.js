document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toRegisterLink = document.getElementById('to-register');
    const toLoginLink = document.getElementById('to-login');

    // --- INÍCIO DA CONFIGURAÇÃO MANUAL ---
    // Cole suas chaves públicas aqui. É seguro.
    const supabaseUrl = 'https://ezgcpdofdoyeftjsyptzp.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6Z2NwZGZkb3llZnRqc3lwdHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDI4NDksImV4cCI6MjA4NzAxODg0OX0.x7lylm7jv9ydn3gFialol4SH_C5KsddJDRUWgce803Y'; // SUBSTITUA PELA SUA CHAVE ANON
    // --- FIM DA CONFIGURAÇÃO MANUAL ---


    if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey === 'SUA_CHAVE_ANON_AQUI' ) {
        console.error("Erro: Chaves do Supabase não configuradas no script.js!");
        alert("Erro de configuração do sistema. Por favor, contate o suporte.");
        return;
    }

    // Lógica para alternar entre os formulários
    if (toRegisterLink) {
        toRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }

    if (toLoginLink) {
        toLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    // Lógica do formulário de registro
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
