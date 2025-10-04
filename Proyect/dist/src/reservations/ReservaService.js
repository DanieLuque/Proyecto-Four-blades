"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaService = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
class ReservaService {
    constructor(reservaRepo, clienteRepo, estilistaRepo, servicioRepo, inventarioService) {
        this.reservaRepo = reservaRepo;
        this.clienteRepo = clienteRepo;
        this.estilistaRepo = estilistaRepo;
        this.servicioRepo = servicioRepo;
        this.inventarioService = inventarioService;
    }
    crearReserva(reserva) {
        try {
            const cliente = this.clienteRepo.listar().find(c => c.id === reserva.cliente.id);
            if (!cliente)
                throw new ValidationError("Cliente no existe");
            const estilista = this.estilistaRepo.listar().find(e => e.id === reserva.estilista.id);
            if (!estilista)
                throw new ValidationError("Estilista no existe");
            const servicio = this.servicioRepo.listar().find(s => s.id === reserva.servicio.id);
            if (!servicio)
                throw new ValidationError("Servicio no existe");
            const reservasEstilista = this.reservaRepo.listar().filter(r => r.estilista.id === estilista.id);
            if (reservasEstilista.length >= 1) {
                throw new ValidationError(`Estilista ${estilista.nombre} no está disponible`);
            }
            // ✅ Ahora usamos la propiedad productosNecesarios
            servicio.productosNecesarios.forEach((p) => this.inventarioService.consumirProducto(p.id, 1));
            this.reservaRepo.crear(reserva);
        }
        catch (error) {
            if (error instanceof ValidationError) {
                console.error("Error de validación:", error.message);
            }
            else {
                console.error("Error inesperado al crear reserva:", error);
            }
            throw error;
        }
    }
    cancelarReserva(id) {
        const reserva = this.reservaRepo.listar().find(r => r.id === id);
        if (!reserva)
            throw new ValidationError("Reserva no encontrada");
        // ✅ También usamos la propiedad productosNecesarios
        reserva.servicio.productosNecesarios.forEach((p) => {
            this.inventarioService.reponerProducto(p.id, 1);
        });
        this.reservaRepo.eliminar(id);
    }
    reprogramarReserva(id, nuevaFecha) {
        const reserva = this.reservaRepo.listar().find(r => r.id === id);
        if (!reserva)
            throw new ValidationError("Reserva no encontrada");
        const cambios = { fecha: nuevaFecha };
        this.reservaRepo.actualizar(id, cambios);
    }
    listarAgenda() {
        const reservas = this.reservaRepo.listar();
        const agenda = [];
        for (let i = 0; i < 5; i++) {
            const reserva = reservas[i];
            if (reserva) {
                agenda.push(`[💺${i + 1} - Estilista ${reserva.estilista.id}]`);
            }
            else {
                agenda.push(`[💺${i + 1} - Libre]`);
            }
        }
        return agenda;
    }
}
exports.ReservaService = ReservaService;
