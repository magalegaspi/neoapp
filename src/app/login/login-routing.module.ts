import { NgModule } from '@angular/core'; // Importa NgModule para definir el módulo
import { RouterModule, Routes } from '@angular/router'; // Importa RouterModule y Routes para configurar las rutas
import { LoginPage } from './login.page'; // Importa el componente LoginPage

// Define las rutas para el módulo de inicio de sesión
const routes: Routes = [
  {
    path: '', // Ruta vacía que corresponde a la página de inicio de sesión
    component: LoginPage // Asocia la ruta con el componente LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Configura las rutas como un módulo hijo
  exports: [RouterModule] // Exporta RouterModule para que otras partes de la aplicación puedan usar las rutas
})
export class LoginPageRoutingModule {} // Exporta el módulo de rutas de la página de inicio de sesión
