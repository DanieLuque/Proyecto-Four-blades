"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tinte = void 0;
const Servicio_1 = require("./Servicio");
/**
 * Servicio de tinte para el cabello.
 */
class Tinte extends Servicio_1.Servicio {
    constructor(id, duracion, precio, color) {
        super(id, "Tinte", duracion, precio);
        this.color = color;
    }
    descripcion() {
        return `Tinte color ${this.color} - ${this.getDuracion()} min - $${this.getPrecio()}`;
    }
}
exports.Tinte = Tinte;
