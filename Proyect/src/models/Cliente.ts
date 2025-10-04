import { IIdentificable } from "../interfaces/IIdentificable";

/**
 * Representa a un cliente del sistema.
 * SRP: Solo gestiona datos del cliente.
 */
export class Cliente implements IIdentificable {
  constructor(
    public readonly id: string,
    public nombre: string,
    public email: string,
    public telefono: string
  ) {}

  getNombre(): string {
    return this.nombre;
  }

  getEmail(): string {
    return this.email;
  }

  getTelefono(): string {
    return this.telefono;
  }
}
