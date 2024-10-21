import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsteroidsService } from '../services/asteroids.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(private http: HttpClient, public asteroidsService: AsteroidsService) {}

  ngOnInit() {
    console.log("Funcionando");
  }

  ionViewWillEnter() {
    // Siempre que entre al tab, se utiliza la fecha del dia de hoy para que muestre resultados de una
    console.log("Adentro de ionViewWillEnter");
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0]; // solo la parte de la fecha

    // Realizar la búsqueda de asteroides para la fecha actual
    this.searchAsteroids();
    console.log("Fin de ionViewWillEnter");
  }

  get selectedDate() {
    return this.asteroidsService.selectedDate;
  }

  set selectedDate(value: string) {
    this.asteroidsService.selectedDate = value;
  }

  get asteroids() {
    return this.asteroidsService.asteroids;
  }

  onDateChange(event: any) {
    const date = new Date(event.detail.value);
    this.selectedDate = date.toISOString().split('T')[0]; // Solo la parte de la fecha
  }

  searchAsteroids() {
    if (!this.selectedDate) {
      console.error('Por favor, selecciona una fecha.');
      return;
    }

    this.asteroidsService.asteroids = []; // Reiniciar la lista de asteroides

    const apiKey = 'IbcwJVTzW74LWfiBnw6NLdeWKKggHlzY4t1kH5gO';
    const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.selectedDate}&end_date=${this.selectedDate}&api_key=${apiKey}`;

    this.http.get(apiUrl).subscribe({
      next: (response: any) => {
        const nearEarthObjects = response.near_earth_objects[this.selectedDate] || [];

        this.asteroidsService.asteroids = nearEarthObjects.map((asteroid: any) => ({
          name: asteroid.name,
          estimated_diameter: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
          miss_distance: asteroid.close_approach_data[0].miss_distance.kilometers
        }));
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
  }
}
