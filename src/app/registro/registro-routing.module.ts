import { NgModule } from '@angular/core'; // Importa NgModule para definir un módulo
import { Routes, RouterModule } from '@angular/router'; // Importa Routes y RouterModule para manejar el enrutamiento
import { RegistroPage } from './registro.page'; // Importa el componente de la página de registro

// Define las rutas para la página de registro
const routes: Routes = [
  {
    path: '', // Ruta vacía para esta página
    component: RegistroPage // Componente que se renderizará en esta ruta
  }
];

// Define el módulo de enrutamiento para la página de registro
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa el RouterModule configurado con las rutas definidas
  exports: [RouterModule], // Exporta el RouterModule para que esté disponible en otras partes de la aplicación
})
export class RegistroPageRoutingModule {} // Exporta el módulo de enrutamiento
