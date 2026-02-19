document.addEventListener('DOMContentLoaded', () => {
    // --- INÍCIO DA CONFIGURAÇÃO MANUAL ---
    const supabaseUrl = 'https://ezgcpdofdoyeftjsyptzp.supabase.co';
    const supabaseAnonKey = 'SUA_CHAVE_ANON_AQUI'; // SUBSTITUA PELA SUA CHAVE ANON
    // --- FIM DA CONFIGURAÇÃO MANUAL ---

    // Verifica a configuração
    if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6Z2NwZGZkb3llZnRqc3lwdHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDI4NDksImV4cCI6MjA4NzAxODg0OX0.x7lylm7jv9ydn3gFialol4SH_C5KsddJDRUWgce803Y' ) {
        console.error("Erro: Chaves do Supabase não configuradas no script.js!");
        alert("Erro de configuração do sistema. Por favor, contate o suporte.");
        return;
    }

    // Tenta encontrar o formulário de registro
    const registerForm = document.getElementById('register-form');
    
    // Se o formulário de registro EXISTIR nesta página, adiciona a lógica a ele
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

                alert('Conta criada com sucesso! Redirecionando para o login...');
                window.location.href = '/'; // Redireciona para a página de login (index.html)

            } catch (error) {
                alert(`Erro: ${error.message}`);
            }
        });
    }

    // O código para o formulário de login virá aqui no futuro.
    // Por enquanto, o script só lida com o cadastro.
});
