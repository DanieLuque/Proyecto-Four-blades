"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventarioService = exports.ValidationError = void 0;
/** Error de validación local */
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
/** Servicio para manejar inventario — usa sólo los métodos de IRepository que existen (listar, actualizar, etc.) */
class InventarioService {
    constructor(productoRepo) {
        this.productoRepo = productoRepo;
    }
    buscarProducto(id) {
        return this.productoRepo.listar().find(p => p.id === id);
    }
    obtenerProducto(id) {
        const p = this.buscarProducto(id);
        return p ?? null;
    }
    consumirProducto(id, cantidad) {
        const producto = this.buscarProducto(id);
        if (!producto)
            throw new ValidationError(`Producto ${id} no existe`);
        if (producto.stock < cantidad)
            throw new ValidationError(`Stock insuficiente de ${producto.nombre}`);
        const cambios = { stock: producto.stock - cantidad };
        // actualizar espera Partial<T>
        this.productoRepo.actualizar(id, cambios);
    }
    reponerProducto(id, cantidad) {
        const producto = this.buscarProducto(id);
        if (!producto)
            throw new ValidationError(`Producto ${id} no existe`);
        const cambios = { stock: producto.stock + cantidad };
        this.productoRepo.actualizar(id, cambios);
    }
    listarProductos() {
        return this.productoRepo.listar();
    }
}
exports.InventarioService = InventarioService;
