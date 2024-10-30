import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;
  passwordFieldType: string = 'password'; // Tipo de campo para la contraseña
  passwordIcon: string = 'eye-off'; // Icono que representa la visibilidad de la contraseña

  constructor(
    private fb: FormBuilder, // Inyecta el FormBuilder para crear formularios reactivos
    private alertController: AlertController, // Inyecta el AlertController para mostrar alertas
    private router: Router, // Inyecta el Router para la navegación
    private afAuth: AngularFireAuth // Inyecta AngularFireAuth para la autenticación con Firebase
  ) {
    // Inicializa el formulario de inicio de sesión con validaciones
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo de correo electrónico
      password: ['', Validators.required], // Campo de contraseña
    });
  }

  ngOnInit() {
    // Método que se ejecuta al inicializar el componente
  }

  /**
   * Método para iniciar sesión
   * Intenta autenticar al usuario con Firebase y redirige a la página principal.
   */
  async ingresar() {
    const { email, password } = this.formularioLogin.value; // Obtiene los valores del formulario
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password); // Intenta iniciar sesión
      this.router.navigate(['/tabs'], { replaceUrl: true }); // Redirige a la página principal
    } catch (error: any) { // Captura errores de autenticación
      console.error('Error en el ingreso:', error);
      let errorMessage: string;

      // Manejo de errores específicos
      switch(error.code){
        case 'auth/user-not-found':
          errorMessage = 'No hay ninguna cuenta asociada a este correo electrónico.'; // Mensaje si el usuario no existe
        break;
        case 'auth/wrong-password': 
        errorMessage = 'La contraseña es incorrecta. Por favor, inténtalo de nuevo.'; // Mensaje si la contraseña es incorrecta
        break;
        case "auth/invalid-credential":
          errorMessage = 'Contraseña o correo electrónico inválido. Por favor, inténtalo de nuevo.'; //Mensaje si las credenciales son inválidas
        break;
        default:
          errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.'; // Mensaje para otros errores
      }

      // Muestra una alerta con el mensaje de error
      const alert = await this.alertController.create({
        header: 'Error de inicio de sesión',
        message: errorMessage,
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }

  /**
   * Método para alternar visibilidad de la contraseña
   * Cambia el tipo de campo de contraseña entre 'password' y 'text'.
   */
  visibilidadContrasenia() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text'; // Cambia a texto para mostrar la contraseña
      this.passwordIcon = 'eye'; // Cambia el icono a 'eye' para indicar que se puede ver
    } else {
      this.passwordFieldType = 'password'; // Cambia de nuevo a 'password' para ocultar la contraseña
      this.passwordIcon = 'eye-off'; // Cambia el icono a 'eye-off'
    }
  }

  /**
   * Método para ir a la página de registro
   * Navega a la página de registro cuando el usuario lo solicita.
   */
  registrar() {
    this.router.navigate(['/registro']); // Redirige a la página de registro
  }

  /**
   * Método para iniciar sesión con Google
   * Intenta autenticar al usuario utilizando Google como proveedor.
   */
  async ingresarConGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider(); // Crea un proveedor de autenticación de Google
      await this.afAuth.signInWithPopup(provider); // Muestra el popup de Google para iniciar sesión
      this.router.navigate(['/tabs'], { replaceUrl: true }); // Redirige a la página principal
    } catch (error: any) {
      // Muestra una alerta con el mensaje de error en caso de fallo
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.message,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
