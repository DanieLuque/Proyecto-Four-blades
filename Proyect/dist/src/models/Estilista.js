"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estilista = void 0;
/**
 * Representa un estilista.
 */
class Estilista {
    constructor(id, nombre, especialidades) {
        this.id = id;
        this.nombre = nombre;
        this.especialidades = especialidades;
    }
    getNombre() {
        return this.nombre;
    }
}
exports.Estilista = Estilista;
