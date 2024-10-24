import { Component, OnInit } from '@angular/core';
import { ApodService } from '../services/apod.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  imagenDelDia: any = null;

  constructor(private apodService:ApodService) {}


  ionViewWillEnter() {
    console.log("Cargando foto del día...");
    // Lógica para cargar foto del día
  }
  

  ngOnInit() {
    const fechaActual = this.obtenerFechaActual();
    this.buscarUltimaImagenDisponible(fechaActual);
  }

  // Método para obtener la fecha actual en formato YYYY-MM-DD
  obtenerFechaActual(): string {
    const hoy = new Date();
    return hoy.toISOString().split("T")[0];
  }

  // Buscar la última imagen disponible de forma recursiva
  buscarUltimaImagenDisponible(fecha: string) {
    this.apodService.obtenerImagenDelDia(fecha).subscribe(
      data => {
        // Validar que la respuesta sea válida y contenga la información esperada
        if (data && data.media_type === 'image' && data.url) {
          this.imagenDelDia = data;
        } else {
          console.warn(`No se encontró una imagen para: ${fecha}. Buscando día anterior...`);
          const fechaAnterior = this.obtenerFechaAnterior(fecha);
          this.buscarUltimaImagenDisponible(fechaAnterior);
        }
      },
      error => {
        console.error('Error en la API:', error);
        const fechaAnterior = this.obtenerFechaAnterior(fecha);
        this.buscarUltimaImagenDisponible(fechaAnterior);
      }
    );
  }

  // Método para obtener la fecha anterior
  obtenerFechaAnterior(fecha: string): string {
    const fechaObj = new Date(fecha);
    fechaObj.setDate(fechaObj.getDate() - 1);
    return fechaObj.toISOString().split("T")[0];
  }

}
