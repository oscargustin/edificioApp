export interface Deuda {
    id: string; 
    userId: string; 
    departamento: string; 
    descripcion: string; 
    monto: number; 
    estado: 'Pendiente' | 'Pagado'; 
    createdAt: string; 
    paidAt?: string; 
  }
  