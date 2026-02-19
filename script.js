// Espera o HTML inteiro ser carregado antes de rodar
document.addEventListener('DOMContentLoaded', () => {
    
    // --- CONFIGURAÇÃO ---
    const supabaseUrl = 'https://ezgcpdofdoyeftjsyptzp.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6Z2NwZGZkb3llZnRqc3lwdHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDI4NDksImV4cCI6MjA4NzAxODg0OX0.x7lylm7jv9ydn3gFialol4SH_C5KsddJDRUWgce803Y
'; // SUBSTITUA PELA SUA CHAVE ANON
    // --------------------

    // 1. Encontra o formulário na página
    const form = document.getElementById('register-form' );

    // 2. Se o formulário for encontrado, adiciona o "escutador" de evento
    if (form) {
        form.addEventListener('submit', async (event) => {
            // 3. Impede o comportamento padrão de recarregar a página
            event.preventDefault();

            // Mostra um alerta para provar que o clique foi capturado
            // alert('Clique capturado! Enviando para o Supabase...');

            // 4. Pega os valores dos campos
            const fullName = document.getElementById('register-fullname').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            // 5. Tenta fazer a "ligação" para o servidor
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

                // 6. Se a resposta do servidor não for OK, mostra o erro
                if (!response.ok) {
                    throw new Error(data.error || 'Falha ao criar conta.');
                }

                // 7. Se tudo deu certo, mostra o alerta de sucesso e redireciona
                alert('Conta criada com sucesso! Redirecionando para o login...');
                window.location.href = '/';

            } catch (error) {
                // 8. Se qualquer parte do 'try' falhar, mostra o erro
                alert(`Erro: ${error.message}`);
            }
        });
    }
});
