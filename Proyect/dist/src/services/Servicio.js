"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servicio = void 0;
/**
 * Clase abstracta para modelar un servicio ofrecido.
 */
class Servicio {
    constructor(id, nombre, duracionMinutos, precio) {
        this.id = id;
        this.nombre = nombre;
        this.duracionMinutos = duracionMinutos;
        this.precio = precio;
        this.productosNecesarios = [];
    }
    getNombre() {
        return this.nombre;
    }
    getPrecio() {
        return this.precio;
    }
    getDuracion() {
        return this.duracionMinutos;
    }
    getProductosNecesarios() {
        return this.productosNecesarios;
    }
}
exports.Servicio = Servicio;
