import { IonicModule } from '@ionic/angular'; // Importa el módulo de Ionic
import { NgModule } from '@angular/core'; // Importa NgModule para definir el módulo
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar directivas comunes
import { FormsModule } from '@angular/forms'; // Importa FormsModule para trabajar con formularios
import { Tab2Page } from './tab2.page'; // Importa el componente de la página Tab2
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module'; // Importa el módulo del contenedor de exploración

import { Tab2PageRoutingModule } from './tab2-routing.module'; // Importa el módulo de enrutamiento específico de Tab2

@NgModule({
  imports: [
    IonicModule, // Importa IonicModule para utilizar componentes de Ionic
    CommonModule, // Importa CommonModule para directivas comunes de Angular
    FormsModule, // Importa FormsModule para manejar formularios
    ExploreContainerComponentModule, // Importa el módulo del contenedor de exploración
    Tab2PageRoutingModule // Importa el módulo de enrutamiento de Tab2
  ],
  declarations: [Tab2Page] // Declara el componente Tab2Page en este módulo
})
export class Tab2PageModule {} // Exporta el módulo para ser utilizado en otras partes de la aplicación
