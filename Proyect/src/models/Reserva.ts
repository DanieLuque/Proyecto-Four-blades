import { IIdentificable } from "../interfaces/IIdentificable";
import { Cliente } from "./Cliente";
import { Estilista } from "./Estilista";
import { Servicio } from "../services/Servicio";
import { EstadoReserva } from "./TipoReserva";

/**
 * Representa una reserva de un cliente con un estilista.
 */
export class Reserva implements IIdentificable {
  private estado: EstadoReserva = "pendiente";
  private notas?: string;

  constructor(
    public readonly id: string,
    public cliente: Cliente,
    public estilista: Estilista,
    public servicio: Servicio,
    public fecha: Date
  ) { }


  // Getters para encapsulamiento
  getCliente(): Cliente {
    return this.cliente;
  }

  getEstilista(): Estilista {
    return this.estilista;
  }

  getServicio(): Servicio {
    return this.servicio;
  }

  getFecha(): Date {
    return this.fecha;
  }

  getEstado(): EstadoReserva {
    return this.estado;
  }

  getNotas(): string | undefined {
    return this.notas;
  }

  getTotal(): number {
    return this.servicio.getPrecio();
  }

  confirmar(): void {
    this.estado = "confirmada";
  }

  cancelar(nota: string): void {
    this.estado = "cancelada";
    this.notas = nota;
  }
}

