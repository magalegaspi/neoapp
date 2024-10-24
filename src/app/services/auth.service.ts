import { Injectable, Inject } from '@angular/core'; // Importa Inject para inyección explícita
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth para manejar autenticación
import firebase from 'firebase/compat/app'; // Importa Firebase para utilizar sus funcionalidades
import 'firebase/compat/auth'; // Importa la compatibilidad para autenticación de Firebase
import { Storage } from '@ionic/storage-angular'; // Importa el almacenamiento de Ionic

@Injectable({
  providedIn: 'root' // Proporciona el servicio a nivel de la aplicación
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    @Inject(Storage) private storage: Storage // Usa @Inject para especificar el token de inyección
  ) {
    this.init(); // Inicializa el almacenamiento al crear el servicio
  }

  async init() {
    await this.storage.create(); // Crea el almacenamiento al inicializar el servicio
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      await this.storage.set('user', { email: userCredential.user?.email });
    } catch (error: any) {
      throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.signInWithRedirect(provider);
    } catch (error: any) {
      throw new Error(`Error al iniciar sesión con Google: ${error.message}`);
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    await this.storage.remove('user');
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.storage.get('user');
    return !!user;
  }
}
