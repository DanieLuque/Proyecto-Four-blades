import { Servicio } from "./Servicio";

/**
 * Servicio de tinte para el cabello.
 */
export class Tinte extends Servicio {
  private color: string;

  constructor(id: string, duracion: number, precio: number, color: string) {
    super(id, "Tinte", duracion, precio);
    this.color = color;
  }

  descripcion(): string {
    return `Tinte color ${this.color} - ${this.getDuracion()} min - $${this.getPrecio()}`;
  }
}

