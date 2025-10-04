import { Reserva } from "./Reserva";

/**
 * Estados posibles de una reserva.
 * Union Type
 */
export type EstadoReserva = "pendiente" | "confirmada" | "cancelada";

/**
 * Contrato adicional para reservas que tienen pago asociado.
 */
export type ConPago = {
  montoPagado: number;
};

/**
 * Intersección de Reserva con ConPago.
 * Intersection Type
 */
export type ReservaPagada = Reserva & ConPago;
