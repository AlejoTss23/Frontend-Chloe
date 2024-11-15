export interface Variable {
    id?: number; // Opcional, ya que es asignado por el backend
    nombre: string;
    monto: number;
    esIngreso: boolean; 
    balanceId?: number; // Relación con el balance, opcional si aún no se ha asignado
  }
  