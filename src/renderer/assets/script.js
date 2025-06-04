const notyf = new Notyf()

document.getElementById('loginForm').addEventListener('submit', async event => {
  event.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  try {
    const result = await window.auth.login(email, password)
    
    if (result.admin) {
      window.location.href = 'dashboard.html'
    } else if (result.token) {
      localStorage.setItem('token', result.token)
      window.location.href = 'selecao-mesa.html'
    } else {
      notyf.error('Login falhou. Verifique suas credenciais.')
    }
  } catch (err) {
    notyf.error(err.message)
  }
})