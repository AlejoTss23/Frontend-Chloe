import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private baseUrl = 'http://localhost:8080/api/eventos';

  constructor(private http: HttpClient) {}

  // Crear un nuevo evento
  createEvento(evento: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, evento);
  }

  // Obtener todos los eventos
  getEventos(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Asignar vestidos a un evento
  assignVestidosToEvento(eventoId: number, alquileres: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/${eventoId}/alquileres`, alquileres);
  }
}

