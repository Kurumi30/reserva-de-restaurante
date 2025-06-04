const totalMesas = 12

let mesasIndisponiveis = []

const notyf = new Notyf()

let mesaSelecionada = null

const mesaGrid = document.getElementById('mesaGrid')
const cadeirasContainer = document.getElementById('cadeirasContainer')
const cadeirasSelect = document.getElementById('cadeiras')

async function buscarMesasIndisponiveis(dataHora) {
  const token = localStorage.getItem('token')
  const resp = await fetch(`http://localhost:3000/mesas?dataHora=${dataHora}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: 'GET',
  })

  if (!resp.ok) notyf.error(resp.statusText)

  return await resp.json()
}

async function atualizarMesasIndisponiveis(dataHora) {
  const resposta = await buscarMesasIndisponiveis(dataHora)
  mesasIndisponiveis.push(resposta.ID_MESA)
  mesaGrid.innerHTML = ''
  gerarMesas()
}

// Exemplo de uso: chame quando data/hora mudar
document.getElementById('data').addEventListener('change', function () {
  const data = this.value
  const horario = document.getElementById('horario').value
  if (data && horario) {
    atualizarMesasIndisponiveis(`${data} ${horario}`)
  }
})

document.getElementById('horario').addEventListener('change', function () {
  const horario = this.value
  const data = document.getElementById('data').value
  if (data && horario) {
    atualizarMesasIndisponiveis(`${data} ${horario}`)
  }
})

function gerarMesas() {
  for (let i = 1; i <= totalMesas; i++) {
    const div = document.createElement('div')

    div.classList.add('mesa')
    div.innerText = `Mesa ${i}`
    div.dataset.numero = i

    if (mesasIndisponiveis.includes(i)) {
      div.classList.add('indisponivel')
    } else {
      div.classList.add('disponivel')
      div.addEventListener('click', () => selecionarMesa(div))
    }

    mesaGrid.appendChild(div)
  }
}

function selecionarMesa(mesa) {
  if (mesa.classList.contains('indisponivel')) return

  if (mesaSelecionada) {
    mesaSelecionada.classList.remove('selecionada')
    mesaSelecionada.classList.add('disponivel')
  }

  mesa.classList.remove('disponivel')
  mesa.classList.add('selecionada')
  mesaSelecionada = mesa

  cadeirasContainer.style.display = 'block'
}

// function validarCPF(cpf) {
//   return /^\d{11}$/.test(cpf)
// }

function resetarFormulario() {
  document.getElementById('formCadastro').reset()

  if (mesaSelecionada) {
    mesaSelecionada.classList.remove('selecionada')
    mesaSelecionada.classList.add('indisponivel')
    mesaSelecionada.removeEventListener('click', selecionarMesa)
    mesaSelecionada = null
  }

  cadeirasContainer.style.display = 'none'
}

document.getElementById('formCadastro').addEventListener('submit', function (e) {
  e.preventDefault()

  const horario = document.getElementById('horario').value.trim()
  const data = document.getElementById('data').value.trim()
  const mesa = mesaSelecionada ? mesaSelecionada.dataset.numero : null
  const cadeiras = cadeirasSelect.value

  const reserva = { tableId: mesa, chairs: cadeiras, dateTime: `${data} ${horario}` }

  console.log(reserva)

  fetch('http://localhost:3000/reserva', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ ...reserva }),
  })
    .then(async response => {
      const json = await response.json()

      if (!response.ok) return notyf.error(json.error)

      notyf.success(`Cadastro realizado com sucesso!\nMesa ${mesa} com ${cadeiras} cadeiras.`)
    })
    .catch(error => {
      notyf.error(`Erro ao cadastrar: ${error.message}`)
    })  

  resetarFormulario()
})

gerarMesas()
