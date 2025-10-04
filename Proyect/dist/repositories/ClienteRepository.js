"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
// ClienteRepository.ts
const JsonRepository_1 = require("./JsonRepository");
const Cliente_1 = require("../modelos/Cliente");
class ClienteRepository extends JsonRepository_1.JsonRepository {
    constructor() {
        super("clientes.json");
    }
    listar() {
        return super.listar().map(c => new Cliente_1.Cliente(c.id, c.nombre, c.email, c.telefono));
    }
}
exports.ClienteRepository = ClienteRepository;
