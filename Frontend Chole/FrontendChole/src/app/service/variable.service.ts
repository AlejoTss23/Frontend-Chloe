import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariableService {
  private baseUrl = 'http://localhost:8080/api/balances';
  private variableUrl = 'http://localhost:8080/api/variables';

  constructor(private http: HttpClient) {}

  // Obtener variables por balance ID
  getVariablesByBalanceId(balanceId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${balanceId}/variables`);
  }

  // Crear una nueva variable en un balance específico
  createVariable(variable: any, balanceId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${balanceId}/variables`, variable);
  }

  // Actualizar una variable
  updateVariable(id: number, variable: any): Observable<any> {
    return this.http.put(`${this.variableUrl}/${id}`, variable); // Cambiado a /api/variables
  }

  // Eliminar una variable
  deleteVariable(id: number): Observable<any> {
    return this.http.delete(`${this.variableUrl}/${id}`); // Cambiado a /api/variables
  }
}



