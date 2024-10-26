import { Component, OnInit } from '@angular/core';
import { ApodService } from '../services/apod.service'; // Importa el servicio para obtener imágenes APOD

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  imagenDelDia: any = null; // Variable para almacenar la imagen del día

  constructor(private apodService: ApodService) {} // Inyección del servicio APOD

  // Método que se llama cuando la vista va a entrar
  ionViewWillEnter() {
    console.log("Cargando foto del día...");
    // Aquí puedes incluir lógica adicional para cargar la foto
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    const fechaActual = this.obtenerFechaActual(); // Obtiene la fecha actual
    this.buscarUltimaImagenDisponible(fechaActual); // Busca la última imagen disponible
  }

  // Método para obtener la fecha actual en formato YYYY-MM-DD
  obtenerFechaActual(): string {
    const hoy = new Date();
    return hoy.toISOString().split("T")[0]; // Convierte a cadena en formato correcto
  }

  // Método para buscar la última imagen disponible de forma recursiva
  buscarUltimaImagenDisponible(fecha: string) {
    this.apodService.obtenerImagenDelDia(fecha).subscribe(
      data => {
        // Validar que la respuesta sea válida y contenga la información esperada
        if (data && data.media_type === 'image' && data.url) {
          this.imagenDelDia = data; // Almacena la imagen del día
        } else {
          console.warn(`No se encontró una imagen para: ${fecha}. Buscando día anterior...`);
          const fechaAnterior = this.obtenerFechaAnterior(fecha); // Obtiene la fecha anterior
          this.buscarUltimaImagenDisponible(fechaAnterior); // Busca nuevamente
        }
      },
      error => {
        console.error('Error en la API:', error); // Manejo de errores
        const fechaAnterior = this.obtenerFechaAnterior(fecha); // Obtiene la fecha anterior
        this.buscarUltimaImagenDisponible(fechaAnterior); // Busca nuevamente
      }
    );
  }

  // Método para obtener la fecha anterior
  obtenerFechaAnterior(fecha: string): string {
    const fechaObj = new Date(fecha);
    fechaObj.setDate(fechaObj.getDate() - 1); // Resta un día
    return fechaObj.toISOString().split("T")[0]; // Devuelve la fecha en formato YYYY-MM-DD
  }
}
