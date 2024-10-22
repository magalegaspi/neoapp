import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth
import firebase from 'firebase/compat/app'; // Importa Firebase

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    private afAuth: AngularFireAuth // Inyecta AngularFireAuth
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    });
  }

  async ingresar() {
    const f = this.formularioLogin.value;
    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;

    // Lógica de inicio de sesión usando almacenamiento local (actualmente)
    if (usuario && usuario.nombre === f.nombre && usuario.password === f.password) {
      console.log('Ingresando');
      this.router.navigate(['/tabs']); // Redirige a tabs en lugar de tabs/tab1
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos ingresados no son correctos',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.formularioLogin.reset();
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      // Aquí puedes almacenar la información del usuario si es necesario
      console.log('Usuario autenticado:', result.user);
      this.router.navigate(['/tabs']); // Redirige después de la autenticación
    } catch (error) {
      console.error('Error durante el inicio de sesión con Google:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo iniciar sesión con Google. Intenta de nuevo.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }

  registrar() {
    // Navegar a la página de registro
    this.router.navigate(['/registro']).then(() => {
      window.location.reload();
    });
  }
}
