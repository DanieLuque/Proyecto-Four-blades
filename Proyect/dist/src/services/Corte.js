"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Corte = void 0;
const Servicio_1 = require("./Servicio");
/**
 * Servicio de corte de cabello.
 */
class Corte extends Servicio_1.Servicio {
    constructor(id, duracion, precio, longitud) {
        super(id, "Corte", duracion, precio);
        this.longitud = longitud;
    }
    descripcion() {
        return `Corte (${this.longitud} cm) - ${this.getDuracion()} min - $${this.getPrecio()}`;
    }
}
exports.Corte = Corte;
