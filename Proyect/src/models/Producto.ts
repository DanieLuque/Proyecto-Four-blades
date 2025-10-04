import { IIdentificable } from "../interfaces/IIdentificable";

/**
 * Representa un producto usado o vendido en el salón.
 */
export class Producto implements IIdentificable {
  constructor(
    public readonly id: string,
    private nombre: string,
    private precio: number,
    private stock: number
  ) {}

  getNombre(): string {
    return this.nombre;
  }

  getPrecio(): number {
    return this.precio;
  }

  getStock(): number {
    return this.stock;
  }

  consume(cantidad: number): void {
    if (cantidad > this.stock) {
      throw new Error("Stock insuficiente");
    }
    this.stock -= cantidad;
  }
}