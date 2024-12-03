export interface User {
    correo: string;
    password:string;
    exp: string;
    rol: string[];
    id: number;
    turno: string;
    isActive: number;
    id_punto: number;
    rol_nombre: string[];
    tipo_usuario: string;
    avatar: string;
    celular: string;
    apellido_paterno: string;
    apellido_materno: string;
    nombre: string;
    deviceId:string;
    id_puestos_acargo: number[];
}
