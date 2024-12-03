export interface AuthResponse {
    correo: string;
    password: string;
    exp: string;
    rol: string[];
    id: number;
    turno: string;
    token: string;
    isActive: number;
    id_punto: number;
    // Campos opcionales solo si los necesitas en el login
    tipo_usuario: string;
    avatar: string;
    celular: string;
    apellido_paterno: string;
    apellido_materno: string;
    nombre: string;
    rol_nombre: string[];
    deviceId:string;
    id_puestos_acargo: number[];
}
