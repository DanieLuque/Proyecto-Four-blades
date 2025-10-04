"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
class ReportService {
    constructor(reservaRepo) {
        this.reservaRepo = reservaRepo;
    }
    generarJSON() {
        try {
            const reservas = this.reservaRepo.listar();
            return JSON.stringify(reservas, null, 2);
        }
        catch (error) {
            console.error("❌ Error generando reporte JSON:", error);
            throw error;
        }
        finally {
            console.log("📄 Reporte JSON generado ✅");
        }
    }
    generarCSV() {
        try {
            const reservas = this.reservaRepo.listar();
            const encabezado = "id,cliente,estilista,servicio,fecha";
            const filas = reservas.map(r => {
                const fechaIso = r.fecha instanceof Date ? r.fecha.toISOString() : new Date(r.fecha).toISOString();
                return `${r.id},${r.cliente.nombre},${r.estilista.nombre},${r.servicio.nombre},${fechaIso}`;
            });
            return [encabezado, ...filas].join("\n");
        }
        catch (error) {
            console.error("❌ Error generando reporte CSV:", error);
            throw error;
        }
        finally {
            console.log("📊 Reporte CSV generado ✅");
        }
    }
}
exports.ReportService = ReportService;
