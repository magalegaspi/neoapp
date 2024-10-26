import { NgModule } from '@angular/core'; // Importa NgModule para definir el módulo
import { CommonModule } from '@angular/common'; // Importa CommonModule para funcionalidades comunes de Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa módulos para formularios
import { IonicModule } from '@ionic/angular'; // Importa IonicModule para componentes de Ionic
import { LoginPageRoutingModule } from './login-routing.module'; // Importa el módulo de rutas para la página de inicio de sesión
import { LoginPage } from './login.page'; // Importa el componente LoginPage
import { RouterModule } from '@angular/router';  // Importa RouterModule para la navegación

@NgModule({
  imports: [
    CommonModule, // Módulo que proporciona funcionalidades comunes de Angular
    FormsModule, // Módulo para el manejo de formularios
    ReactiveFormsModule, // Módulo para formularios reactivos
    IonicModule, // Módulo que proporciona componentes de Ionic
    LoginPageRoutingModule, // Módulo de rutas para la página de inicio de sesión
    RouterModule // Módulo para la gestión de rutas
  ],
  declarations: [LoginPage] // Declara el componente LoginPage en este módulo
})
export class LoginPageModule {} // Exporta el módulo de la página de inicio de sesión
