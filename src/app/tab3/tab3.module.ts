import { IonicModule } from '@ionic/angular'; // Importa el módulo de Ionic
import { NgModule } from '@angular/core'; // Importa NgModule
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { Tab3Page } from './tab3.page'; // Importa el componente de Tab3
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module'; // Importa módulo adicional para el contenedor de exploración

import { Tab3PageRoutingModule } from './tab3-routing.module'; // Importa el módulo de enrutamiento para Tab3

@NgModule({
  imports: [
    IonicModule, // Agrega el módulo de Ionic
    CommonModule, // Agrega el módulo común
    FormsModule, // Agrega el módulo de formularios
    ExploreContainerComponentModule, // Agrega el módulo del contenedor de exploración
    Tab3PageRoutingModule // Agrega el módulo de enrutamiento específico de Tab3
  ],
  declarations: [Tab3Page] // Declara el componente Tab3Page
})
export class Tab3PageModule {} // Exporta el módulo
