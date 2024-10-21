import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EarthService {
  private apiKey = 'IbcwJVTzW74LWfiBnw6NLdeWKKggHlzY4t1kH5gO';
  private apiUrl = 'https://api.nasa.gov/planetary/earth/imagery';

  constructor(private http: HttpClient) {}

  obtenerImagenSatelital(lat: number, lon: number, dim: number = 0.1) {
    const url = `${this.apiUrl}?lon=${lon}&lat=${lat}&dim=${dim}&api_key=${this.apiKey}`;
    return this.http.get(url, { responseType: 'blob' });  // Obtener imagen como blob porque es muy grande, despues se transorma a URL para mostrarla en pantalla
  }
}
