import { Servicio } from "./Servicio";

/**
 * Servicio de arreglo de barba.
 */
export class Barba extends Servicio {
  private estilo: string;

  constructor(id: string, duracion: number, precio: number, estilo: string) {
    super(id, "Barba", duracion, precio);
    this.estilo = estilo;
  }

  descripcion(): string {
    return `Barba estilo ${this.estilo} - ${this.getDuracion()} min - $${this.getPrecio()}`;
  }
}
