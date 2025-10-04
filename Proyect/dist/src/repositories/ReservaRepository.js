"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaRepository = void 0;
const JsonRepository_1 = require("./JsonRepository");
const Reserva_1 = require("../models/Reserva");
const Cliente_1 = require("../models/Cliente");
const Estilista_1 = require("../models/Estilista");
const Corte_1 = require("../services/Corte");
const Tinte_1 = require("../services/Tinte");
const Barba_1 = require("../services/Barba");
class ReservaRepository extends JsonRepository_1.JsonRepository {
    constructor() {
        super("reservas.json");
    }
    mapEntity(data) {
        // 🔹 Reconstrucción del servicio
        let servicio;
        if (!data.servicio || !data.servicio.tipo) {
            throw new Error("El servicio no tiene tipo definido en reservas.json");
        }
        switch (data.servicio.tipo) {
            case "corte":
                servicio = new Corte_1.Corte(data.servicio.id, data.servicio.duracionMinutos, data.servicio.precio, data.servicio.longitud);
                break;
            case "tinte":
                servicio = new Tinte_1.Tinte(data.servicio.id, data.servicio.duracionMinutos, data.servicio.precio, data.servicio.color);
                break;
            case "barba":
                servicio = new Barba_1.Barba(data.servicio.id, data.servicio.duracionMinutos, data.servicio.precio, data.servicio.estilo);
                break;
            default:
                throw new Error("Tipo de servicio desconocido: " + data.servicio.tipo);
        }
        // 🔹 Reconstrucción de Cliente y Estilista
        const cliente = new Cliente_1.Cliente(data.cliente.id, data.cliente.nombre, data.cliente.email, data.cliente.telefono);
        const estilista = new Estilista_1.Estilista(data.estilista.id, data.estilista.nombre, data.estilista.especialidades);
        // 🔹 Devolver Reserva lista
        return new Reserva_1.Reserva(data.id, cliente, estilista, servicio, new Date(data.fecha));
    }
}
exports.ReservaRepository = ReservaRepository;
