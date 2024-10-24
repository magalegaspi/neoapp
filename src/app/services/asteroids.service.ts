import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsteroidsService {
  fechaSeleccionada: string = '';
  asteroides: any[] = [];

  constructor(private http: HttpClient) {} // Inyectar HttpClient

  // Método para buscar asteroides en la fecha seleccionada
  async obtenerAsteroides() {
    if (!this.fechaSeleccionada) {
      console.error('No se ha seleccionado una fecha.');
      return;
    }

    const apiKey = 'IbcwJVTzW74LWfiBnw6NLdeWKKggHlzY4t1kH5gO';
    const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.fechaSeleccionada}&end_date=${this.fechaSeleccionada}&api_key=${apiKey}`;

    try {
      const response: any = await lastValueFrom(this.http.get(apiUrl));
      const nearEarthObjects = response.near_earth_objects[this.fechaSeleccionada] || [];

      this.asteroides = nearEarthObjects.map((asteroid: any) => ({
        name: asteroid.name,
        estimated_diameter: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
        miss_distance: asteroid.close_approach_data[0].miss_distance.kilometers
      }));
    } catch (error) {
      console.error('Error buscando asteroides:', error);
    }
  }
}
