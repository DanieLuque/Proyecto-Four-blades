"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = void 0;
/**
 * Representa una reserva de un cliente con un estilista.
 */
class Reserva {
    constructor(id, cliente, estilista, servicio, fecha) {
        this.id = id;
        this.cliente = cliente;
        this.estilista = estilista;
        this.servicio = servicio;
        this.fecha = fecha;
        this.estado = "pendiente";
    }
    // Getters para encapsulamiento
    getCliente() {
        return this.cliente;
    }
    getEstilista() {
        return this.estilista;
    }
    getServicio() {
        return this.servicio;
    }
    getFecha() {
        return this.fecha;
    }
    getEstado() {
        return this.estado;
    }
    getNotas() {
        return this.notas;
    }
    getTotal() {
        return this.servicio.getPrecio();
    }
    confirmar() {
        this.estado = "confirmada";
    }
    cancelar(nota) {
        this.estado = "cancelada";
        this.notas = nota;
    }
}
exports.Reserva = Reserva;
