import { Servicio } from "./Servicio";

/**
 * Servicio de corte de cabello.
 */
export class Corte extends Servicio {
  private longitud: number;

  constructor(id: string, duracion: number, precio: number, longitud: number) {
    super(id, "Corte", duracion, precio);
    this.longitud = longitud;
  }

  descripcion(): string {
    return `Corte (${this.longitud} cm) - ${this.getDuracion()} min - $${this.getPrecio()}`;
  }
}
