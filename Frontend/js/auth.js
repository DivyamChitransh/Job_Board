document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('loggedIn', true);
    window.location.href = 'dashboard.html';
  });
  
  document.getElementById('signupBtn').addEventListener('click', () => {
    alert('Signup functionality coming soon...');
  });
  