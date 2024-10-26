import { NgModule } from '@angular/core'; // Importa NgModule para definir un módulo
import { IonicModule } from '@ionic/angular'; // Importa IonicModule para usar componentes de Ionic
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar directivas comunes de Angular
import { FormsModule } from '@angular/forms'; // Importa FormsModule para manejar formularios
import { Tab1Page } from './tab1.page'; // Importa el componente de la página Tab1
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module'; // Importa el módulo del componente ExploreContainer

import { Tab1PageRoutingModule } from './tab1-routing.module'; // Importa el módulo de enrutamiento específico para Tab1

@NgModule({
  imports: [
    IonicModule, // Agrega IonicModule al módulo
    CommonModule, // Agrega CommonModule para usar directivas comunes
    FormsModule, // Agrega FormsModule para manejar formularios reactivos
    ExploreContainerComponentModule, // Agrega el módulo de ExploreContainer
    Tab1PageRoutingModule // Agrega el módulo de enrutamiento para esta página
  ],
  declarations: [Tab1Page] // Declara el componente Tab1Page
})
export class Tab1PageModule {} // Exporta el módulo de Tab1Page
