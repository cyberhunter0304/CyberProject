document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessageDiv = document.getElementById('loginMessage');

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            // Redirect to the appropriate page based on user role
            window.location.href = data.redirectUrl;
        } else {
            loginMessageDiv.textContent = data.message;
            loginMessageDiv.style.color = 'red';
        }
    });
});