import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VestidoService {
  private baseUrl = 'http://localhost:8080/api/vestidos';

  constructor(private http: HttpClient) {}

  // Método para obtener el token desde el localStorage o donde lo almacenes
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Ajusta según cómo almacenes el token
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  // Obtener todos los vestidos
  getVestidos(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { headers: this.getAuthHeaders() });
  }

  // Obtener detalles de un vestido por ID
  getVestidoById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }


// Crear un nuevo vestido
createVestido(vestido: any): Observable<any> {
  return this.http.post(`${this.baseUrl}`, vestido, { headers: this.getAuthHeaders() });
}


  // Actualizar un vestido existente
  updateVestido(id: number, vestido: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, vestido, { headers: this.getAuthHeaders() });
  }

  // Eliminar un vestido
  deleteVestido(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/uploadImage`, formData, { responseType: 'text' });
  }
  
}

