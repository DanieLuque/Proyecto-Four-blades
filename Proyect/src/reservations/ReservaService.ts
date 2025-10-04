import { IRepository } from "../interfaces/IRepository";
import { InventarioService } from "./InventarioService";
import { Servicio } from "../services/Servicio";
import { Estilista } from "../models/Estilista";
import { Cliente } from "../models/Cliente";
import { Producto } from "../models/Producto";

export interface Reserva {
  id: string;
  cliente: Cliente;
  estilista: Estilista;
  servicio: Servicio;
  fecha: Date;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class ReservaService {
  constructor(
    private reservaRepo: IRepository<Reserva>,
    private clienteRepo: IRepository<Cliente>,
    private estilistaRepo: IRepository<Estilista>,
    private servicioRepo: IRepository<Servicio>,
    private inventarioService: InventarioService
  ) {}

  crearReserva(reserva: Reserva): void {
    try {
      const cliente = this.clienteRepo.listar().find(c => c.id === reserva.cliente.id);
      if (!cliente) throw new ValidationError("Cliente no existe");

      const estilista = this.estilistaRepo.listar().find(e => e.id === reserva.estilista.id);
      if (!estilista) throw new ValidationError("Estilista no existe");

      const servicio = this.servicioRepo.listar().find(s => s.id === reserva.servicio.id);
      if (!servicio) throw new ValidationError("Servicio no existe");

      const reservasEstilista = this.reservaRepo.listar().filter(r => r.estilista.id === estilista.id);
      if (reservasEstilista.length >= 1) {
        throw new ValidationError(`Estilista ${estilista.nombre} no está disponible`);
      }

      // ✅ Ahora usamos la propiedad productosNecesarios
      servicio.productosNecesarios.forEach((p: Producto) =>
        this.inventarioService.consumirProducto(p.id, 1)
      );

      this.reservaRepo.crear(reserva);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error("Error de validación:", error.message);
      } else {
        console.error("Error inesperado al crear reserva:", error);
      }
      throw error;
    }
  }

  cancelarReserva(id: string): void {
    const reserva = this.reservaRepo.listar().find(r => r.id === id);
    if (!reserva) throw new ValidationError("Reserva no encontrada");

    // ✅ También usamos la propiedad productosNecesarios
    reserva.servicio.productosNecesarios.forEach((p: Producto) => {
      this.inventarioService.reponerProducto(p.id, 1);
    });

    this.reservaRepo.eliminar(id);
  }

  reprogramarReserva(id: string, nuevaFecha: Date): void {
    const reserva = this.reservaRepo.listar().find(r => r.id === id);
    if (!reserva) throw new ValidationError("Reserva no encontrada");

    const cambios: Partial<Reserva> = { fecha: nuevaFecha };
    this.reservaRepo.actualizar(id, cambios as any);
  }

  listarAgenda(): string[] {
    const reservas = this.reservaRepo.listar();
    const agenda: string[] = [];

    for (let i = 0; i < 5; i++) {
      const reserva = reservas[i];
      if (reserva) {
        agenda.push(`[💺${i + 1} - Estilista ${reserva.estilista.id}]`);
      } else {
        agenda.push(`[💺${i + 1} - Libre]`);
      }
    }

    return agenda;
  }
}
