import { select, input } from '@inquirer/prompts';
import { Cliente } from './models/Cliente';
import { Estilista } from './models/Estilista';
import { Reserva } from './models/Reserva';
import { Corte } from './services/Corte';
import { Tinte } from './services/Tinte';
import { Barba } from './services/Barba';
import { ClienteRepository } from './repositories/ClienteRepository';
import { EstilistaRepository } from './repositories/EstilistaRepository';
import { ReservaRepository } from './repositories/ReservaRepository';
import { InventarioService, Producto } from './reservations/InventarioService';
import { ReservaService } from './reservations/ReservaService';
import { ReportService } from './reservations/ReportService';
import { IRepository } from './interfaces/IRepository';

// ----------------------
// Repositorio de productos para inventario
// ----------------------
class ProductoRepository implements IRepository<Producto> {
  private productos: Producto[] = [
    { id: 'p1', nombre: '🧴 Shampoo', stock: 10 },
    { id: 'p2', nombre: '🎨 Tinte Rojo', stock: 5 },
    { id: 'p3', nombre: '🧼 Cera Barba', stock: 8 },
  ];

  crear(p: Producto) { this.productos.push(p); }
  listar() { return this.productos; }
  actualizar(id: string, cambios: Partial<Producto>): Producto | null {
    const p = this.productos.find(x => x.id === id);
    if (!p) return null;
    Object.assign(p, cambios);
    return p;
  }

  eliminar(id: string) { this.productos = this.productos.filter(x => x.id !== id); }
  buscarPorCampo<K extends keyof Producto>(campo: K, valor: Producto[K]): Producto[] {
    return this.productos.filter(p => p[campo] === valor);
  }
}

const inventarioRepo = new ProductoRepository();

// ----------------------
// Servicios y repositorios
// ----------------------
const clienteRepo = new ClienteRepository();
const estilistaRepo = new EstilistaRepository();
const reservaRepo = new ReservaRepository();
const inventarioService = new InventarioService(inventarioRepo);

const serviciosDisponibles = [
  new Corte('s1', 30, 30000, 20),        // ✂️ Corte
  new Tinte('s2', 45, 50000, 'Rojo'),    // 🎨 Tinte
  new Barba('s3', 15, 20000, 'Clásico'), // 🧔 Barba
];

const reservaService = new ReservaService(
  reservaRepo,
  clienteRepo,
  estilistaRepo,
  {
    listar: () => serviciosDisponibles,
  } as any,
  inventarioService
);

const reportService = new ReportService(reservaRepo);

// ----------------------
// Menú principal
// ----------------------
async function menuReportes() {
  const action = await select({
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
    const choice = await select({
      message: '📌 Four blades - Menú principal ✂️',
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
  const action = await select({
    message: '🧑 Clientes',
    choices: [
      { name: '➕ Agregar cliente', value: 'agregar' },
      { name: '📋 Listar clientes', value: 'listar' },
      { name: '↩️ Volver', value: 'volver' },
    ],
  });

  switch (action) {
    case 'agregar': {
      const nombre = await input({ message: '📝 Nombre:' });
      const email = await input({ message: '📧 Email:' });
      const telefono = await input({ message: '📱 Teléfono:' });
      const id = 'c' + (clienteRepo.listar().length + 1);
      clienteRepo.crear(new Cliente(id, nombre, email, telefono));
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
  const action = await select({
    message: '💇 Estilistas',
    choices: [
      { name: '➕ Agregar estilista', value: 'agregar' },
      { name: '📋 Listar estilistas', value: 'listar' },
      { name: '↩️ Volver', value: 'volver' },
    ],
  });

  switch (action) {
    case 'agregar': {
      const nombre = await input({ message: '📝 Nombre:' });
      const especialidadesRaw = await input({ message: '🎯 Especialidades (separadas por coma):' });
      const especialidades = especialidadesRaw.split(',').map((s: string) => s.trim());
      const id = 'e' + (estilistaRepo.listar().length + 1);
      estilistaRepo.crear(new Estilista(id, nombre, especialidades));
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
  const action = await select({
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
      const clienteId = await select({
        message: '🧑 Selecciona cliente:',
        choices: clienteRepo.listar().map(c => ({ name: c.nombre, value: c.id })),
      });

      const estilistaId = await select({
        message: '💇 Selecciona estilista:',
        choices: estilistaRepo.listar().map(e => ({ name: e.nombre, value: e.id })),
      });

      const servicioId = await select({
        message: '💈 Selecciona servicio:',
        choices: serviciosDisponibles.map(s => ({ name: s.descripcion(), value: s.id })),
      });

      const fechaStr = await input({ message: '📅 Fecha (YYYY-MM-DD):' });
      const fecha = new Date(fechaStr);

      if (isNaN(fecha.getTime())) {
        console.error('❌ Fecha no válida');
        return;
      }

      try {
        const cData = clienteRepo.listar().find(c => c.id === clienteId)!;
        const cliente = new Cliente(cData.id, cData.nombre, cData.email, cData.telefono);

        const eData = estilistaRepo.listar().find(e => e.id === estilistaId)!;
        const estilista = new Estilista(eData.id, eData.nombre, eData.especialidades);

        const servicio = serviciosDisponibles.find(s => s.id === servicioId)!;

        const id = 'r' + (reservaService.listarAgenda().length + 1);
        reservaService.crearReserva(new Reserva(id, cliente, estilista, servicio, fecha));
        console.log('✅ Reserva creada');
      } catch (err: any) {
        console.error('❌ Error al crear reserva:', err.message);
      }
      break;
    }
    case 'listar':
      console.log('📋 Agenda de reservas:');
      console.table(reservaService.listarAgenda());
      break;
    case 'cancelar': {
      const cancelId = await input({ message: '🆔 ID de reserva a cancelar:' });
      try {
        reservaService.cancelarReserva(cancelId);
        console.log('✅ Reserva cancelada');
      } catch (err: any) {
        console.error('❌ Error:', err.message);
      }
      break;
    }
    case 'reprogramar': {
      const reprogramId = await input({ message: '🆔 ID de reserva a reprogramar:' });
      const nuevaFechaStr = await input({ message: '📅 Nueva fecha (YYYY-MM-DD):' });
      try {
        reservaService.reprogramarReserva(reprogramId, new Date(nuevaFechaStr));
        console.log('✅ Reserva reprogramada');
      } catch (err: any) {
        console.error('❌ Error:', err.message);
      }
      break;
    }
  }
}

// ----------------------
main().catch(err => console.error('💥 Error inesperado:', err));