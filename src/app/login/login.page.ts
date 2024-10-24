import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formularioLogin: FormGroup;

  // Control de visibilidad del campo de contraseña
  passwordFieldType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router,
    private afAuth: AngularFireAuth 
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    });
  }

  // Alternar visibilidad del campo de contraseña
  togglePasswordVisibility() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordFieldType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }

  async ingresar() {
    const f = this.formularioLogin.value;
    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;

    if (usuario && usuario.nombre === f.nombre && usuario.password === f.password) {
      console.log('Ingresando');
      this.router.navigate(['/tabs'], { replaceUrl: true });
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
      console.log('Usuario autenticado:', result.user);
      this.router.navigate(['/tabs'], { replaceUrl: true });
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
    this.router.navigate(['/registro'], { replaceUrl: true });
  }
}
