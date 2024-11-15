import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private baseUrl = 'http://localhost:8080/api/balances';

  constructor(private http: HttpClient) {}

  // Obtener todos los balances
  getBalances(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Crear un nuevo balance
  createBalance(balance: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, balance);
  }

  // Obtener un balance específico por ID
  getBalanceById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Actualizar un balance específico
  updateBalance(id: number, balance: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, balance);
  }
  
  // Eliminar un balance
  deleteBalance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
