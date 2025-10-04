// ClienteRepository.ts
import { JsonRepository } from "./JsonRepository";
import { Cliente } from "../models/Cliente";
import { IClienteRepository } from "../interfaces/IClienteRepository";

export class ClienteRepository
  extends JsonRepository<Cliente>
  implements IClienteRepository
{
  constructor() {
    super("clientes.json");
  }

  listar(): Cliente[] {
    return super.listar().map(c => new Cliente(c.id, c.nombre, c.email, c.telefono));
  }
}
