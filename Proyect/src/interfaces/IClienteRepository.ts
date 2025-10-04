import { IRepository } from "./IRepository";
import { Cliente } from "../models/Cliente";

export interface IClienteRepository extends IRepository<Cliente> {}
