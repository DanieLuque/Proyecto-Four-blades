import { IRepository } from "../interfaces/IRepository";

/** Producto local (coincide con el usado en ReservaService) */
export interface Producto {
  id: string;
  nombre: string;
  stock: number;
}

/** Error de validación local */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

/** Servicio para manejar inventario — usa sólo los métodos de IRepository que existen (listar, actualizar, etc.) */
export class InventarioService {
  constructor(private productoRepo: IRepository<Producto>) {}

  private buscarProducto(id: string): Producto | undefined {
    return this.productoRepo.listar().find(p => p.id === id);
  }

  obtenerProducto(id: string): Producto | null {
    const p = this.buscarProducto(id);
    return p ?? null;
  }

  consumirProducto(id: string, cantidad: number): void {
    const producto = this.buscarProducto(id);
    if (!producto) throw new ValidationError(`Producto ${id} no existe`);
    if (producto.stock < cantidad) throw new ValidationError(`Stock insuficiente de ${producto.nombre}`);

    const cambios: Partial<Producto> = { stock: producto.stock - cantidad };
    // actualizar espera Partial<T>
    this.productoRepo.actualizar(id, cambios as any);
  }

  reponerProducto(id: string, cantidad: number): void {
    const producto = this.buscarProducto(id);
    if (!producto) throw new ValidationError(`Producto ${id} no existe`);

    const cambios: Partial<Producto> = { stock: producto.stock + cantidad };
    this.productoRepo.actualizar(id, cambios as any);
  }

  listarProductos(): Producto[] {
    return this.productoRepo.listar();
  }
}
