// EstilistaRepository.ts
import { JsonRepository } from "./JsonRepository";
import { Estilista } from "../models/Estilista";
import { IEstilistaRepository } from "../interfaces/IEstilistaRepository";

export class EstilistaRepository
  extends JsonRepository<Estilista>
  implements IEstilistaRepository
{
  constructor() {
    super("estilistas.json");
  }

  listar(): Estilista[] {
    return super.listar().map(e => new Estilista(e.id, e.nombre, e.especialidades));
  }
}
