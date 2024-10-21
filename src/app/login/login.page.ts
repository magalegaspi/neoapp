import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
              public alertController: AlertController,
              private router: Router) {

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    });
  }

  

  async ingresar() {
    const f = this.formularioLogin.value;
    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;

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
      // @Gabi Si los datos son incorrectos, se borran el usuario y contraseña en la proxima linea
      this.formularioLogin.reset();
    }
  }


/*async ingresar() {
  const f = this.formularioLogin.value;
  const usuarioString = localStorage.getItem('usuario');
  const usuario = usuarioString ? JSON.parse(usuarioString) : null;

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
  }
}
 */


  registrar() {
    // Navegar a la página de registro
    this.router.navigate(['/registro']).then(() => {
      // Recargar la página después de navegar
      window.location.reload();
    });
  }
}


