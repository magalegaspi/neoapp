import { NgModule } from '@angular/core'; // Importa NgModule para definir el módulo de la aplicación
import { BrowserModule } from '@angular/platform-browser'; // Importa BrowserModule para habilitar la aplicación en el navegador
import { RouteReuseStrategy } from '@angular/router'; // Importa RouteReuseStrategy para personalizar la reutilización de rutas
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'; // Importa IonicModule y la estrategia de rutas para Ionic
import { AppRoutingModule } from './app-routing.module'; // Importa el módulo de enrutamiento de la aplicación
import { AppComponent } from './app.component'; // Importa el componente raíz de la aplicación

// Importar HttpClientModule para manejar las peticiones HTTP
import { HttpClientModule } from '@angular/common/http';

// Importar IonicStorageModule para gestionar el almacenamiento local
import { IonicStorageModule } from '@ionic/storage-angular';

// Importar AngularFire y Firebase para la autenticación y otros servicios de Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Importa el módulo de autenticación de Firebase
import { environment } from '../environments/environment'; // Importa la configuración de Firebase desde el entorno

@NgModule({
  declarations: [AppComponent], // Declara el componente raíz de la aplicación
  imports: [
    BrowserModule, // Importa el módulo del navegador
    IonicModule.forRoot(), // Inicializa el módulo de Ionic
    AppRoutingModule, // Importa el módulo de enrutamiento de la aplicación
    HttpClientModule, // Asegúrate de incluir el módulo HttpClient para peticiones HTTP
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase con la configuración del entorno
    AngularFireAuthModule, // Agrega el módulo de autenticación de Firebase
    IonicStorageModule.forRoot(), // Inicializa el módulo de almacenamiento de Ionic
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Proporciona una estrategia personalizada para reutilizar rutas
  ],
  bootstrap: [AppComponent] // Establece el componente raíz para iniciar la aplicación
})
export class AppModule {}
