import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { IonicStorageModule } from '@ionic/storage-angular'; // Importa IonicStorageModule
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Firebase config

@NgModule({
  declarations: [AppComponent], // Declara el componente principal de la aplicación
  imports: [
    BrowserModule, // Importa el módulo del navegador, necesario para aplicaciones web
    IonicModule.forRoot(), // Inicializa Ionic con configuraciones predeterminadas
    AppRoutingModule, // Importa las rutas definidas para la navegación
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase con la configuración del entorno
    AngularFireAuthModule, // Importa el módulo de autenticación de Firebase
    IonicStorageModule.forRoot() // Inicializa el almacenamiento de Ionic
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Configura la estrategia de reutilización de rutas
    provideHttpClient() // Proporciona el cliente HTTP para realizar solicitudes HTTP
  ],
  bootstrap: [AppComponent] // Define el componente raíz que se inicializa al cargar la aplicación
})
export class AppModule {}
