import { Component, OnInit } from '@angular/core';
import { AsteroidsService } from '../services/asteroids.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // Estado para manejar si se está buscando asteroides o no (esto nos sirve para mostrar el spinner)
  buscando: boolean = false; 
  
  // Para saber si ya se realizó una búsqueda (y mostrar mensajes si no hay asteroides)
  busquedaRealizada: boolean = false; 

  constructor(public asteroidsService: AsteroidsService) {}

  ngOnInit() {
    // Cuando el componente se inicializa, establecemos la fecha seleccionada a la fecha de hoy
    const hoy = new Date();
    this.fechaSeleccionada = hoy.toISOString().split('T')[0]; // Solo la parte de la fecha
    console.log("Funcionando");
  }

  // Getter para obtener la fecha seleccionada del servicio
  get fechaSeleccionada() {
    return this.asteroidsService.fechaSeleccionada;
  }

  // Setter para cambiar la fecha seleccionada desde el servicio
  set fechaSeleccionada(valor: string) {
    this.asteroidsService.fechaSeleccionada = valor;
  }

  // Getter para obtener los asteroides del servicio
  get asteroides() {
    return this.asteroidsService.asteroides;
  }

  // Esta función se encarga de buscar asteroides para la fecha seleccionada
  async buscarAsteroides() {
    // Validamos que se haya seleccionado una fecha, si no, mostramos un error
    if (!this.fechaSeleccionada) {
      console.error('Por favor, selecciona una fecha.');
      return;
    }

    // Marcamos que estamos buscando (esto es para mostrar el spinner mientras esperamos la respuesta de la API)
    this.buscando = true;
    
    // Limpiamos la lista de asteroides antes de hacer la nueva búsqueda
    this.asteroidsService.asteroides = [];
    
    // Llamamos al servicio que se conecta con la API de la NASA para traer los asteroides
    await this.asteroidsService.obtenerAsteroides();
    
    // Una vez que terminamos la búsqueda, indicamos que ya no estamos buscando
    this.buscando = false;
    
    // Marcamos que ya se hizo una búsqueda, así podemos mostrar los resultados o el mensaje de que no se encontraron asteroides
    this.busquedaRealizada = true;
  }

  // Esta función se ejecuta cuando el usuario cambia la fecha, actualizamos la fecha seleccionada
  alCambiarFecha(evento: any) {
    const fecha = new Date(evento.detail.value);
    
    // Convertimos la fecha al formato "YYYY-MM-DD" que necesita la API
    this.fechaSeleccionada = fecha.toISOString().split('T')[0]; 
  }

  // Función para borrar el caché (la lista de asteroides) y resetear el estado de búsqueda
  borrarCache() {
    this.asteroidsService.asteroides = [];
    this.busquedaRealizada = false; // Volvemos a estado inicial de búsqueda
    console.log('Caché borrado');
  }

  // Función para buscar asteroides para la fecha de hoy
  mostrarAsteroidesHoy() {
    // Obtenemos la fecha de hoy en formato "YYYY-MM-DD"
    const hoy = new Date();
    this.fechaSeleccionada = hoy.toISOString().split('T')[0];
    
    // Llamamos a la función de búsqueda
    this.buscarAsteroides();
  }
}
