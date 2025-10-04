"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
/**
 * Representa a un cliente del sistema.
 * SRP: Solo gestiona datos del cliente.
 */
class Cliente {
    constructor(id, nombre, email, telefono) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
    }
    getNombre() {
        return this.nombre;
    }
    getEmail() {
        return this.email;
    }
    getTelefono() {
        return this.telefono;
    }
}
exports.Cliente = Cliente;
