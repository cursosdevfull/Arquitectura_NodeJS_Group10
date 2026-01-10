document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validaciones básicas
        if (!email || !password) {
            showMessage('Por favor, completa todos los campos', 'error');
            return;
        }

        // Deshabilitar botón y mostrar loading
        loginBtn.disabled = true;
        loginBtn.textContent = '';
        loginBtn.classList.add('loading');
        hideMessage();

        console.log(JSON.stringify({
            email: email,
            password: password
        }))

        try {
            const response = await fetch('http://localhost:3000/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('¡Login exitoso! Tokens recibidos correctamente.', 'success');

                // Guardar tokens en localStorage
                if (data.data && data.data.accessToken && data.data.refreshToken) {
                    localStorage.setItem('accessToken', data.data.accessToken);
                    localStorage.setItem('refreshToken', data.data.refreshToken);
                }

                // Limpiar formulario
                loginForm.reset();

                // Opcional: redirigir después del login exitoso
                console.log('Access Token:', data.data.accessToken);
                console.log('Refresh Token:', data.data.refreshToken);

            } else {
                // Manejar diferentes tipos de error
                let errorMessage = 'Error al iniciar sesión';

                if (response.status === 401) {
                    errorMessage = 'Credenciales inválidas. Verifica tu email y contraseña.';
                } else if (response.status === 400) {
                    errorMessage = 'Datos inválidos. Verifica el formato del email.';
                } else if (response.status === 500) {
                    errorMessage = 'Error del servidor. Intenta más tarde.';
                } else if (data.message) {
                    errorMessage = data.message;
                }

                showMessage(errorMessage, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Error de conexión. Verifica que el servidor esté ejecutándose.', 'error');
        } finally {
            // Rehabilitar botón
            loginBtn.disabled = false;
            loginBtn.textContent = 'Iniciar Sesión';
            loginBtn.classList.remove('loading');
        }
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }

    function hideMessage() {
        messageDiv.style.display = 'none';
        messageDiv.className = 'message';
    }

    // Limpiar mensaje al escribir en los campos
    document.getElementById('email').addEventListener('input', hideMessage);
    document.getElementById('password').addEventListener('input', hideMessage);
});