import { JsonRepository } from "./JsonRepository";
import { Reserva } from "../models/Reserva";
import { IReservaRepository } from "../interfaces/IReservaRepository";
import { Cliente } from "../models/Cliente";
import { Estilista } from "../models/Estilista";
import { Corte } from "../services/Corte";
import { Tinte } from "../services/Tinte";
import { Barba } from "../services/Barba";

export class ReservaRepository
  extends JsonRepository<Reserva>
  implements IReservaRepository
{
  constructor() {
    super("reservas.json");
  }

  protected mapEntity(data: any): Reserva {
    // 🔹 Reconstrucción del servicio
    let servicio;
    if (!data.servicio || !data.servicio.tipo) {
      throw new Error("El servicio no tiene tipo definido en reservas.json");
    }

    switch (data.servicio.tipo) {
      case "corte":
        servicio = new Corte(
          data.servicio.id,
          data.servicio.duracionMinutos,
          data.servicio.precio,
          data.servicio.longitud
        );
        break;
      case "tinte":
        servicio = new Tinte(
          data.servicio.id,
          data.servicio.duracionMinutos,
          data.servicio.precio,
          data.servicio.color
        );
        break;
      case "barba":
        servicio = new Barba(
          data.servicio.id,
          data.servicio.duracionMinutos,
          data.servicio.precio,
          data.servicio.estilo
        );
        break;
      default:
        throw new Error("Tipo de servicio desconocido: " + data.servicio.tipo);
    }

    // 🔹 Reconstrucción de Cliente y Estilista
    const cliente = new Cliente(
      data.cliente.id,
      data.cliente.nombre,
      data.cliente.email,
      data.cliente.telefono
    );

    const estilista = new Estilista(
      data.estilista.id,
      data.estilista.nombre,
      data.estilista.especialidades
    );

    // 🔹 Devolver Reserva lista
    return new Reserva(
      data.id,
      cliente,
      estilista,
      servicio,
      new Date(data.fecha)
    );
  }
}
