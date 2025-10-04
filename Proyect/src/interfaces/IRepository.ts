import { IIdentificable } from "./IIdentificable";

export interface IRepository<T extends IIdentificable> {
  crear(item: T): void;
  listar(): T[];
  actualizar(id: string, cambios: Partial<T>): T | null;
  eliminar(id: string): void;
  buscarPorCampo<K extends keyof T>(campo: K, valor: T[K]): T[];
}
