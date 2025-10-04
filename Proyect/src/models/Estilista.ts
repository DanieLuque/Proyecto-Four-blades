/**
 * Representa un estilista.
 */
export class Estilista {
  constructor(
    public id: string,
    public nombre: string,
    public especialidades: string[]
  ) {}

  getNombre(): string {
    return this.nombre;
  }
}
