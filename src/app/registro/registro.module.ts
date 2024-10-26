import { NgModule } from '@angular/core'; // Importa NgModule para definir un módulo
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar directivas comunes
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule y ReactiveFormsModule para manejar formularios
import { IonicModule } from '@ionic/angular'; // Importa IonicModule para componentes de Ionic

import { RegistroPageRoutingModule } from './registro-routing.module'; // Importa el módulo de enrutamiento específico para la página de registro
import { RegistroPage } from './registro.page'; // Importa el componente de la página de registro

@NgModule({
  imports: [
    CommonModule, // Importa el módulo común para funcionalidades básicas
    FormsModule, // Importa el módulo para formularios basados en plantillas
    ReactiveFormsModule, // Importa el módulo para formularios reactivos
    IonicModule, // Importa el módulo de Ionic para utilizar componentes de Ionic
    RegistroPageRoutingModule // Importa el módulo de enrutamiento de la página de registro
  ],
  declarations: [RegistroPage] // Declara el componente de la página de registro
})
export class RegistroPageModule {} // Exporta el módulo para su uso en otras partes de la aplicación
