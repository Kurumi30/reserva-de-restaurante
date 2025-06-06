function maskCPF(cpf) {
  return cpf
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

const notyf = new Notyf()
const cpfInput = document.getElementById('cpf')

cpfInput.addEventListener('input', function () {
  this.value = maskCPF(this.value)
})

document.getElementById('loginForm').addEventListener('submit', async event => {
  event.preventDefault()

  const bodyData = {
    name: document.getElementById('name')?.value,
    email: document.getElementById('email')?.value,
    cpf: document.getElementById('cpf')?.value.replace(/\D/g, ''),
    password: document.getElementById('password')?.value,
  }

  const result = await window.electronAPI.createUser(bodyData)

  if (result.status !== 201) {
    notyf.error(result.data.error || 'Problema ao criar usuário')

    return
  }

  // alert('Usuário criado com sucesso!')
  await window.electronAPI.showUserDialog()

  // document.getElementById('loginForm').reset()
  location.href = 'index.html'
})
