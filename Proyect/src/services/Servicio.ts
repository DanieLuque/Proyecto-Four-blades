import { IIdentificable } from "../interfaces/IIdentificable";
import { Producto } from "../models/Producto";

/**
 * Clase abstracta para modelar un servicio ofrecido.
 */
export abstract class Servicio implements IIdentificable {
  public productosNecesarios: Producto[] = [];

  constructor(
    public readonly id: string,
    public nombre: string,
    protected duracionMinutos: number,
    protected precio: number
  ) {}

  getNombre(): string {
    return this.nombre;
  }

  getPrecio(): number {
    return this.precio;
  }

  getDuracion(): number {
    return this.duracionMinutos;
  }

  getProductosNecesarios(): Producto[] {
    return this.productosNecesarios;
  }

  abstract descripcion(): string;
}
