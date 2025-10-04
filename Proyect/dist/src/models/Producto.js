"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
/**
 * Representa un producto usado o vendido en el salón.
 */
class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
    getNombre() {
        return this.nombre;
    }
    getPrecio() {
        return this.precio;
    }
    getStock() {
        return this.stock;
    }
    consume(cantidad) {
        if (cantidad > this.stock) {
            throw new Error("Stock insuficiente");
        }
        this.stock -= cantidad;
    }
}
exports.Producto = Producto;
