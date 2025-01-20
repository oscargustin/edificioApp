export interface User{
    uid : string,
    email: string,
    password?: string,
    nombre: string
    rut: string,
    telefono: string,
    departamento: string,
    piso: string,
    rol: string,
}

export interface UserLogin {
    uid : string,
    email: string;
    password: string;
  }