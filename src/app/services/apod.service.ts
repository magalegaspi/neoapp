import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApodService {

  private apiKey = 'IbcwJVTzW74LWfiBnw6NLdeWKKggHlzY4t1kH5gO'; // Clave de API de NASA
  private apiUrl = 'https://api.nasa.gov/planetary/apod';

  constructor(private http: HttpClient) { }

  obtenerImagenDelDia(fecha: string): Observable<any> {
    const url = `${this.apiUrl}?api_key=${this.apiKey}&date=${fecha}`;
    return this.http.get<any>(url);
  }
}