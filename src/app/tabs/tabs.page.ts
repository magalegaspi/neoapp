// tabs.page.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Está seguro que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.authService.logout().then(() => {
              this.navCtrl.navigateRoot('/login'); // Redirige a la página de login
            }).catch(err => {
              console.error('Error al cerrar sesión', err);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  login() {
    this.authService.login(this.email, this.password).then(() => {
      this.navCtrl.navigateRoot('/home'); // Redirige a la página principal después de iniciar sesión
    }).catch(err => {
      console.error('Error al iniciar sesión', err);
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().then(() => {
      this.navCtrl.navigateRoot('/home'); // Redirige a la página principal después de iniciar sesión
    }).catch(err => {
      console.error('Error al iniciar sesión con Google', err);
    });
  }
}
