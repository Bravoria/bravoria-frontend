document.addEventListener('DOMContentLoaded', () => {
    // --- INÍCIO DA CONFIGURAÇÃO MANUAL ---
    const supabaseUrl = 'https://ezgcpdofdoyeftjsyptzp.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6Z2NwZGZkb3llZnRqc3lwdHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDI4NDksImV4cCI6MjA4NzAxODg0OX0.x7lylm7jv9ydn3gFialol4SH_C5KsddJDRUWgce803Y
'; // SUBSTITUA PELA SUA CHAVE ANON
    // --- FIM DA CONFIGURAÇÃO MANUAL ---

    // Procura pelo formulário de registro na página atual
    const registerForm = document.getElementById('register-form' );

    // Se (e somente se) o formulário de registro existir nesta página...
    if (registerForm) {
        // ...adiciona a lógica de submissão a ele.
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede o recarregamento da página
            
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
                window.location.href = '/'; // Redireciona para a página de login

            } catch (error) {
                alert(`Erro: ${error.message}`);
            }
        });
    }
});
