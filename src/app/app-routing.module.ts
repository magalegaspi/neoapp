import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Asegúrate de que la ruta es correcta

// Definición de las rutas de la aplicación
const routes: Routes = [
    {
        path: '',
        redirectTo: 'login', // Redirige la ruta raíz a la página de login
        pathMatch: 'full' // Asegura que la redirección solo ocurra si la ruta está vacía
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) // Carga el módulo de la página de login
    },
    {
        path: 'registro',
        loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule) // Carga el módulo de la página de registro
    },
    {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), // Carga el módulo de la página de tabs
        canActivate: [AuthGuard] // Agrega el guard para proteger la ruta
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) // Configura el enrutador con las rutas definidas y habilita la estrategia de pre-carga
    ],
    exports: [RouterModule] // Exporta el RouterModule para ser utilizado en otros módulos
})
export class AppRoutingModule {}
