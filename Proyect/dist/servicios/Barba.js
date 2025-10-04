"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Barba = void 0;
const Servicio_1 = require("./Servicio");
/**
 * Servicio de arreglo de barba.
 */
class Barba extends Servicio_1.Servicio {
    constructor(id, duracion, precio, estilo) {
        super(id, "Barba", duracion, precio);
        this.estilo = estilo;
    }
    descripcion() {
        return `Barba estilo ${this.estilo} - ${this.getDuracion()} min - $${this.getPrecio()}`;
    }
}
exports.Barba = Barba;
