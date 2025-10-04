"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRepository = void 0;
const fs = __importStar(require("fs"));
class JsonRepository {
    constructor(filePath) {
        this.filePath = filePath;
        this.data = [];
        this.cargar();
    }
    crear(item) {
        this.data.push(item);
        this.guardar();
    }
    listar() {
        return [...this.data];
    }
    actualizar(id, cambios) {
        const index = this.data.findIndex((item) => item.id === id);
        if (index === -1)
            return null;
        this.data[index] = { ...this.data[index], ...cambios };
        this.guardar();
        return this.data[index];
    }
    eliminar(id) {
        this.data = this.data.filter((item) => item.id !== id);
        this.guardar();
    }
    buscarPorCampo(campo, valor) {
        return this.data.filter((item) => item[campo] === valor);
    }
    cargar() {
        if (fs.existsSync(this.filePath)) {
            const contenido = fs.readFileSync(this.filePath, "utf-8");
            this.data = JSON.parse(contenido) || [];
        }
    }
    guardar() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    }
}
exports.JsonRepository = JsonRepository;
