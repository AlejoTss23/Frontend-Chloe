import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  private baseUrl = 'http://localhost:8080/api/alquileres';

  constructor(private http: HttpClient) {}

  // Crear un nuevo alquiler
  createAlquiler(alquiler: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, alquiler);
  }

  // Actualizar un alquiler
  updateAlquiler(id: number, alquiler: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, alquiler);
  }

  // Eliminar un alquiler
  deleteAlquiler(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Obtener todos los alquileres
  getAlquileres(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }


  
}
