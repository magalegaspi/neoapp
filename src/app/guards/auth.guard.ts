import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Hace que este servicio esté disponible en toda la aplicación
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Método que se ejecuta al intentar activar una ruta.
  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe( // Escucha el estado de autenticación del usuario.
      map(user => {
        if (user) {
          return true; // Permite el acceso si el usuario está autenticado
        } else {
          this.router.navigate(['/login']); // Redirige a la página de login si no está autenticado
          return false; // Bloquea el acceso a la ruta
        }
      })
    );
  }
}
