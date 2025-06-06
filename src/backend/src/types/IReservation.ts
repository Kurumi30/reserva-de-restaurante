type ReservationStatus = "CONFIRMADA" | "CANCELADA" | "FINALIZADA" | "PENDENTE"

interface IReservation {
  status: ReservationStatus
  dateTime: string
  clientCpf: string
  tableId: number
  chairs: number
}
