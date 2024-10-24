import { Component } from '@angular/core';
import { EarthService } from '../services/earth.service';
import { AlertController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs'; // Importa lastValueFrom de una biblioteca que permite la programación reactiva usando Observables
// Los Observables son objetos que representan flujos de datos asíncronos y te permiten manejar eventos como clics, respuestas HTTP, y más de manera eficiente.

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
export class Tab2Page {
  imagenSatelital: string | null = null;  // Inicializa como null, se llena dependiendo la info de abajo

  // Lista de lugares de interés con nombre, latitud y longitud para mandar como parámetro a la API
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

  // Función para mostrar la alerta si la API no devuelve el blob para la url = imagen
  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Ups!',
      message: 'Un alienigena se robó la imagen en el camino. Por favor, proba más tarde o elegí otro destino.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Función para obtener la imagen satelital de la ubicación actual
  async obtenerImagenSatelital() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Obtiene latitud y longitud gracias a la geolocalizacion que acepta el usuario
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            // Usamos lastValueFrom para convertir el Observable en una Promise, facilitando su manejo con async/await.
            // Un Observable es una fuente de datos que emite múltiples valores a lo largo del tiempo, mientras que una Promise representa un único valor que se resolverá en el futuro.
            const imagenBlob = await lastValueFrom(this.earthService.obtenerImagenSatelital(lat, lon)); 
            if (imagenBlob) {
              this.imagenSatelital = URL.createObjectURL(imagenBlob); // La función obtiene como parámetro un BLOB y crea un URL con la función ".createObjectURL" para mostrar la imagen en pantalla
            } else {
              this.mostrarAlerta();  // Mostrar alerta si no hay imagen
              this.imagenSatelital = null;
            }
          } catch (error) {
            console.error('Error obteniendo la imagen satelital:', error);
            this.mostrarAlerta();  // Mostrar alerta en caso de error
            this.imagenSatelital = null;
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          this.mostrarAlerta();  // Mostrar alerta si falla la geolocalización
        }
      );
    } else {
      console.error('Geolocalización no es soportada por este navegador.');
      this.mostrarAlerta();  // Mostrar alerta si la geolocalización no es compatible
    }
  }

  // Función para obtener la imagen de un lugar de interés seleccionado
  async obtenerImagenDeLugar(lugar: { nombre: string; lat: number; lon: number }) {
    try {
      const imagenBlob = await lastValueFrom(this.earthService.obtenerImagenSatelital(lugar.lat, lugar.lon));
      if (imagenBlob) {
        this.imagenSatelital = URL.createObjectURL(imagenBlob);
      } else {
        this.mostrarAlerta();  // Mostrar alerta si no hay imagen
        this.imagenSatelital = null;
      }
    } catch (error) {
      console.error('Error obteniendo la imagen satelital:', error);
      this.mostrarAlerta();  // Mostrar alerta en caso de error
      this.imagenSatelital = null;
    }
  }
}
