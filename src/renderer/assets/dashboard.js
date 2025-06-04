const tbody = document.querySelector(".responsive-table tbody")
const token = localStorage.getItem("token")

async function loadReservation() {
  const resp = await fetch("http://localhost:3000/reserva", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })

  if (!resp.ok) {
    const notyf = new Notyf()

    notyf.error(`Erro ao carregar as reservas: ${resp.statusText}`)
    // throw new Error("Erro ao carregar as reservas")
  }

  const reservas = await resp.json()

  for (let i = 0; i < reservas.length; i++) {
    const newRow = document.createElement("tr")

    const statusOptions = ["Confirmada", "Pendente", "Cancelada"]
      .map(
        status =>
          `<option value="${status}" ${reservas[i].status === status ? "selected" : ""}>${status || "Sem status"}</option>`
      )
      .join("")

    // <td data-title="ID">${i + 1}</td>
    newRow.innerHTML = `
    <td data-title="ID">${reservas[i].ID_RESERVA}</td>
		<th scope="row">${reservas[i].NOME}</th>
		<td data-title="Cpf do Cliente">${reservas[i].CPF_CLIENTE}</td>
		<td data-title="Data da reserva">${reservas[i].DATA_HORA}</td>
		<td data-title="Número da mesa">${reservas[i].ID_MESA}</td>
		<td data-title="Capacidade">${reservas[i].CADEIRAS}</td>
    <td data-title="Status" class="status-${reservas[i].STATUS.toLowerCase()}">${reservas[i].STATUS || "Sem status"}</td>
    <td data-title="Check">
      <select class="status-select">
        ${statusOptions}
      </select>
    </td>
    `
    tbody.appendChild(newRow)
  }

  tbody.querySelectorAll('.status-select').forEach(select => {
    function updateColor() {
      select.className = "status-select"

      const statusClass = {
        "Confirmada": "status-confirmada",
        "Pendente": "status-pendente",
        "Cancelada": "status-cancelada"
      }[select.value]

      if (statusClass) select.classList.add(statusClass)
    }

    select.addEventListener("change", updateColor)

    updateColor()
  })
}

onload = loadReservation
