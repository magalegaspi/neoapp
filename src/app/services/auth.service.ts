import { Injectable } from '@angular/core'; // Importa Injectable para definir el servicio
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth para manejar autenticación
import firebase from 'firebase/compat/app'; // Importa Firebase para utilizar sus funcionalidades
import 'firebase/compat/auth'; // Importa la compatibilidad para autenticación de Firebase
import { Storage } from '@ionic/storage-angular'; // Importa el almacenamiento de Ionic

@Injectable({
  providedIn: 'root' // Proporciona el servicio a nivel de la aplicación
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private storage: Storage) { // Inyecta AngularFireAuth y Storage
    this.init(); // Inicializa el almacenamiento al crear el servicio
  }

  async init() {
    await this.storage.create(); // Crea el almacenamiento al inicializar el servicio
  }

  async login(email: string, password: string): Promise<void> { // Método para iniciar sesión con email y contraseña
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password); // Inicia sesión con Firebase
      await this.storage.set('user', { email: userCredential.user?.email }); // Almacena el email del usuario en el almacenamiento local
    } catch (error: any) { // Manejo de errores durante el inicio de sesión
      throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
  }

  async loginWithGoogle(): Promise<void> { // Método para iniciar sesión con Google
    try {
      const provider = new firebase.auth.GoogleAuthProvider(); // Crea un proveedor de autenticación de Google
      await this.afAuth.signInWithRedirect(provider); // Redirige al usuario para iniciar sesión
    } catch (error: any) { // Manejo de errores durante el inicio de sesión con Google
      throw new Error(`Error al iniciar sesión con Google: ${error.message}`);
    }
  }

  async logout(): Promise<void> { // Método para cerrar sesión
    await this.afAuth.signOut(); // Cierra la sesión en Firebase
    await this.storage.remove('user'); // Elimina el usuario del almacenamiento local
  }

  async isAuthenticated(): Promise<boolean> { // Método para verificar si el usuario está autenticado
    const user = await this.storage.get('user'); // Obtiene el usuario almacenado
    return !!user; // Devuelve true si hay un usuario almacenado, de lo contrario, false
  }
}
