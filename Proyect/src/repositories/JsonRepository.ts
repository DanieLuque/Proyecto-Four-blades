import { IRepository } from "../interfaces/IRepository";
import { IIdentificable } from "../interfaces/IIdentificable";
import * as fs from "fs";

export abstract class JsonRepository<T extends IIdentificable>
  implements IRepository<T>
{
  protected data: T[] = [];

  constructor(protected filePath: string) {
    this.cargar();
  }

  crear(item: T): void {
    this.data.push(item);
    this.guardar();
  }

  listar(): T[] {
    return [...this.data];
  }

  actualizar(id: string, cambios: Partial<T>): T | null {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) return null;
    this.data[index] = { ...this.data[index], ...cambios };
    this.guardar();
    return this.data[index];
  }

  eliminar(id: string): void {
    this.data = this.data.filter((item) => item.id !== id);
    this.guardar();
  }

  buscarPorCampo<K extends keyof T>(campo: K, valor: T[K]): T[] {
    return this.data.filter((item) => item[campo] === valor);
  }

  private cargar(): void {
    if (fs.existsSync(this.filePath)) {
      const contenido = fs.readFileSync(this.filePath, "utf-8");
      this.data = JSON.parse(contenido) || [];
    }
  }

  private guardar(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }
}
