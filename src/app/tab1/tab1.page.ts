import { Component, OnInit } from '@angular/core';
import { AsteroidsService } from '../services/asteroids.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(public asteroidsService: AsteroidsService) {}

  ngOnInit() {
    console.log("Funcionando");
  }

  ionViewWillEnter() {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0]; // Obtener solo la parte de la fecha
    this.searchAsteroids(); // Llama a la función para buscar asteroides
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

  async searchAsteroids() {
    if (!this.selectedDate) {
      console.error('Por favor, selecciona una fecha.');
      return;
    }

    this.asteroidsService.asteroids = []; // Reiniciar la lista de asteroides
    await this.asteroidsService.fetchAsteroids(); // Llama al método del servicio
  }

  onDateChange(event: any) {
    const date = new Date(event.detail.value);
    this.selectedDate = date.toISOString().split('T')[0]; // Solo la parte de la fecha
  }
}
