"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstilistaRepository = void 0;
// EstilistaRepository.ts
const JsonRepository_1 = require("./JsonRepository");
const Estilista_1 = require("../models/Estilista");
class EstilistaRepository extends JsonRepository_1.JsonRepository {
    constructor() {
        super("estilistas.json");
    }
    listar() {
        return super.listar().map(e => new Estilista_1.Estilista(e.id, e.nombre, e.especialidades));
    }
}
exports.EstilistaRepository = EstilistaRepository;
