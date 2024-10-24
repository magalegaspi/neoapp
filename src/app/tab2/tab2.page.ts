import { Component } from '@angular/core';
import { EarthService } from '../services/earth.service';
import { AlertController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
export class Tab2Page {
  imagenSatelital: string | null = null;  
  tituloLugarSeleccionado: string | null = null;  // Variable para el título del lugar seleccionado

  lugaresInteres = [
    { nombre: 'Chichen Itzá', lat: 20.6843, lon: -88.5678, imagen: "assets/imagenes/chichenitza.jpg" },
    { nombre: 'Cristo Redentor', lat: -22.9519, lon: -43.2105, imagen: "assets/imagenes/cristoredentor.jpg" },
    { nombre: 'Machu Picchu', lat: -13.1631, lon: -72.5450, imagen: "assets/imagenes/machupichu.jpg" },
    { nombre: 'Gran Muralla China', lat: 40.4319, lon: 116.5704, imagen: "assets/imagenes/granmurallachina.jpg" },
    { nombre: 'Taj Mahal', lat: 27.1751, lon: 78.0421, imagen: "assets/imagenes/tajmahal.jpg" },
    { nombre: 'Coliseo de Roma', lat: 41.8902, lon: 12.4922, imagen: "assets/imagenes/coliseo.jpg" },
    { nombre: 'Petra', lat: 30.3285, lon: 35.4444, imagen: "assets/imagenes/petra.jpg" },
    { nombre: 'Obelisco de Buenos Aires', lat: -34.6037, lon: -58.3816, imagen: "assets/imagenes/obelisco.jpg" },
    { nombre: 'Cañon del Antílope', lat: 36.8619, lon: -111.374, imagen: "assets/imagenes/canonantilope.jpg" }
  ];

  constructor(
    private earthService: EarthService,
    private alertController: AlertController 
  ) {}

  async mostrarAlerta() {
    this.tituloLugarSeleccionado = null; // Reiniciar el título al mostrar la alerta, para que no aparezca si hay un error con la imagen
    const alert = await this.alertController.create({
      header: 'Ups!',
      message: 'Un alienígena se robó la imagen en el camino. Por favor, prueba más tarde o elige otro destino.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async obtenerImagenUsuario() {
    // Cambia el título cuando se presiona el botón
    this.tituloLugarSeleccionado = "Como me ven los alienígenas"; 
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const imagenBlob = await lastValueFrom(this.earthService.obtenerImagenSatelital(lat, lon)); 
            if (imagenBlob) {
              this.imagenSatelital = URL.createObjectURL(imagenBlob); // Se obtiene la imagen satelital
            } else {
              this.mostrarAlerta(); // Muestra alerta si no se obtiene la imagen
              this.imagenSatelital = null;
            }
          } catch (error) {
            console.error('Error obteniendo la imagen satelital:', error);
            this.mostrarAlerta(); // Muestra alerta en caso de error
            this.imagenSatelital = null;
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          this.mostrarAlerta(); // Muestra alerta si no se puede obtener la ubicación
        }
      );
    } else {
      console.error('Geolocalización no es soportada por este navegador.');
      this.mostrarAlerta(); // Muestra alerta si geolocalización no está soportada
    }
  }

  async obtenerImagenDeLugar(lugar: { nombre: string; lat: number; lon: number }) {
    this.tituloLugarSeleccionado = lugar.nombre;  // Actualiza el título con el lugar seleccionado
    try {
      const imagenBlob = await lastValueFrom(this.earthService.obtenerImagenSatelital(lugar.lat, lugar.lon));
      if (imagenBlob) {
        this.imagenSatelital = URL.createObjectURL(imagenBlob); // Se obtiene la imagen satelital
      } else {
        this.mostrarAlerta(); // Muestra alerta si no se obtiene la imagen
        this.imagenSatelital = null;
      }
    } catch (error) {
      console.error('Error obteniendo la imagen satelital:', error);
      this.mostrarAlerta(); // Muestra alerta en caso de error
      this.imagenSatelital = null;
    }
  }
}
