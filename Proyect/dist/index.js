"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("@inquirer/prompts");
const Cliente_1 = require("./modelos/Cliente");
const Estilista_1 = require("./modelos/Estilista");
const Reserva_1 = require("./modelos/Reserva");
const Corte_1 = require("./servicios/Corte");
const Tinte_1 = require("./servicios/Tinte");
const Barba_1 = require("./servicios/Barba");
const ClienteRepository_1 = require("./repositories/ClienteRepository");
const EstilistaRepository_1 = require("./repositories/EstilistaRepository");
const ReservaRepository_1 = require("./repositories/ReservaRepository");
const InventarioService_1 = require("./reservas/InventarioService");
const ReservaService_1 = require("./reservas/ReservaService");
const ReportService_1 = require("./reservas/ReportService");
// ----------------------
// Repositorio de productos para inventario
// ----------------------
class ProductoRepository {
    constructor() {
        this.productos = [
            { id: 'p1', nombre: '🧴 Shampoo', stock: 10 },
            { id: 'p2', nombre: '🎨 Tinte Rojo', stock: 5 },
            { id: 'p3', nombre: '🧼 Cera Barba', stock: 8 },
        ];
    }
    crear(p) { this.productos.push(p); }
    listar() { return this.productos; }
    actualizar(id, cambios) {
        const p = this.productos.find(x => x.id === id);
        if (!p)
            return null;
        Object.assign(p, cambios);
        return p;
    }
    eliminar(id) { this.productos = this.productos.filter(x => x.id !== id); }
    buscarPorCampo(campo, valor) {
        return this.productos.filter(p => p[campo] === valor);
    }
}
const inventarioRepo = new ProductoRepository();
// ----------------------
// Servicios y repositorios
// ----------------------
const clienteRepo = new ClienteRepository_1.ClienteRepository();
const estilistaRepo = new EstilistaRepository_1.EstilistaRepository();
const reservaRepo = new ReservaRepository_1.ReservaRepository();
const inventarioService = new InventarioService_1.InventarioService(inventarioRepo);
const serviciosDisponibles = [
    new Corte_1.Corte('s1', 30, 30000, 20), // ✂️ Corte
    new Tinte_1.Tinte('s2', 45, 50000, 'Rojo'), // 🎨 Tinte
    new Barba_1.Barba('s3', 15, 20000, 'Clásico'), // 🧔 Barba
];
const reservaService = new ReservaService_1.ReservaService(reservaRepo, clienteRepo, estilistaRepo, {
    listar: () => serviciosDisponibles,
}, inventarioService);
const reportService = new ReportService_1.ReportService(reservaRepo);
// ----------------------
// Menú principal
// ----------------------
async function menuReportes() {
    const action = await (0, prompts_1.select)({
        message: '📊 Reportes',
        choices: [
            { name: '📄 Generar JSON', value: 'json' },
            { name: '📑 Generar CSV', value: 'csv' },
            { name: '↩️ Volver', value: 'volver' },
        ],
    });
    switch (action) {
        case 'json':
            console.log('📄 Reporte JSON:\n', reportService.generarJSON());
            break;
        case 'csv':
            console.log('📑 Reporte CSV:\n', reportService.generarCSV());
            break;
    }
}
async function main() {
    let exit = false;
    while (!exit) {
        const choice = await (0, prompts_1.select)({
            message: '📌 Menú principal',
            choices: [
                { name: '🧑 Clientes', value: 'clientes' },
                { name: '💇 Estilistas', value: 'estilistas' },
                { name: '📅 Reservas', value: 'reservas' },
                { name: '📦 Inventario', value: 'inventario' },
                { name: '📊 Reportes', value: 'reportes' },
                { name: '🚪 Salir', value: 'salir' },
            ],
        });
        switch (choice) {
            case 'clientes':
                await menuClientes();
                break;
            case 'estilistas':
                await menuEstilistas();
                break;
            case 'reservas':
                await menuReservas();
                break;
            case 'inventario':
                console.log('📦 Inventario actual:');
                console.table(inventarioService.listarProductos());
                break;
            case 'reportes':
                await menuReportes();
                break;
            case 'salir':
                exit = true;
                console.log('👋 Saliendo...');
                break;
        }
    }
}
// ----------------------
// Menús secundarios
// ----------------------
async function menuClientes() {
    const action = await (0, prompts_1.select)({
        message: '🧑 Clientes',
        choices: [
            { name: '➕ Agregar cliente', value: 'agregar' },
            { name: '📋 Listar clientes', value: 'listar' },
            { name: '↩️ Volver', value: 'volver' },
        ],
    });
    switch (action) {
        case 'agregar': {
            const nombre = await (0, prompts_1.input)({ message: '📝 Nombre:' });
            const email = await (0, prompts_1.input)({ message: '📧 Email:' });
            const telefono = await (0, prompts_1.input)({ message: '📱 Teléfono:' });
            const id = 'c' + (clienteRepo.listar().length + 1);
            clienteRepo.crear(new Cliente_1.Cliente(id, nombre, email, telefono));
            console.log('✅ Cliente agregado');
            break;
        }
        case 'listar':
            console.log('📋 Lista de clientes:');
            console.table(clienteRepo.listar());
            break;
    }
}
async function menuEstilistas() {
    const action = await (0, prompts_1.select)({
        message: '💇 Estilistas',
        choices: [
            { name: '➕ Agregar estilista', value: 'agregar' },
            { name: '📋 Listar estilistas', value: 'listar' },
            { name: '↩️ Volver', value: 'volver' },
        ],
    });
    switch (action) {
        case 'agregar': {
            const nombre = await (0, prompts_1.input)({ message: '📝 Nombre:' });
            const especialidadesRaw = await (0, prompts_1.input)({ message: '🎯 Especialidades (separadas por coma):' });
            const especialidades = especialidadesRaw.split(',').map((s) => s.trim());
            const id = 'e' + (estilistaRepo.listar().length + 1);
            estilistaRepo.crear(new Estilista_1.Estilista(id, nombre, especialidades));
            console.log('✅ Estilista agregado');
            break;
        }
        case 'listar':
            console.log('📋 Lista de estilistas:');
            console.table(estilistaRepo.listar());
            break;
    }
}
async function menuReservas() {
    const action = await (0, prompts_1.select)({
        message: '📅 Reservas',
        choices: [
            { name: '➕ Crear reserva', value: 'crear' },
            { name: '📋 Listar agenda', value: 'listar' },
            { name: '❌ Cancelar reserva', value: 'cancelar' },
            { name: '🔄 Reprogramar reserva', value: 'reprogramar' },
            { name: '↩️ Volver', value: 'volver' },
        ],
    });
    switch (action) {
        case 'crear': {
            const clienteId = await (0, prompts_1.select)({
                message: '🧑 Selecciona cliente:',
                choices: clienteRepo.listar().map(c => ({ name: c.nombre, value: c.id })),
            });
            const estilistaId = await (0, prompts_1.select)({
                message: '💇 Selecciona estilista:',
                choices: estilistaRepo.listar().map(e => ({ name: e.nombre, value: e.id })),
            });
            const servicioId = await (0, prompts_1.select)({
                message: '💈 Selecciona servicio:',
                choices: serviciosDisponibles.map(s => ({ name: s.descripcion(), value: s.id })),
            });
            const fechaStr = await (0, prompts_1.input)({ message: '📅 Fecha (YYYY-MM-DD):' });
            const fecha = new Date(fechaStr);
            if (isNaN(fecha.getTime())) {
                console.error('❌ Fecha no válida');
                return;
            }
            try {
                const cData = clienteRepo.listar().find(c => c.id === clienteId);
                const cliente = new Cliente_1.Cliente(cData.id, cData.nombre, cData.email, cData.telefono);
                const eData = estilistaRepo.listar().find(e => e.id === estilistaId);
                const estilista = new Estilista_1.Estilista(eData.id, eData.nombre, eData.especialidades);
                const servicio = serviciosDisponibles.find(s => s.id === servicioId);
                const id = 'r' + (reservaService.listarAgenda().length + 1);
                reservaService.crearReserva(new Reserva_1.Reserva(id, cliente, estilista, servicio, fecha));
                console.log('✅ Reserva creada');
            }
            catch (err) {
                console.error('❌ Error al crear reserva:', err.message);
            }
            break;
        }
        case 'listar':
            console.log('📋 Agenda de reservas:');
            console.table(reservaService.listarAgenda());
            break;
        case 'cancelar': {
            const cancelId = await (0, prompts_1.input)({ message: '🆔 ID de reserva a cancelar:' });
            try {
                reservaService.cancelarReserva(cancelId);
                console.log('✅ Reserva cancelada');
            }
            catch (err) {
                console.error('❌ Error:', err.message);
            }
            break;
        }
        case 'reprogramar': {
            const reprogramId = await (0, prompts_1.input)({ message: '🆔 ID de reserva a reprogramar:' });
            const nuevaFechaStr = await (0, prompts_1.input)({ message: '📅 Nueva fecha (YYYY-MM-DD):' });
            try {
                reservaService.reprogramarReserva(reprogramId, new Date(nuevaFechaStr));
                console.log('✅ Reserva reprogramada');
            }
            catch (err) {
                console.error('❌ Error:', err.message);
            }
            break;
        }
    }
}
// ----------------------
main().catch(err => console.error('💥 Error inesperado:', err));
