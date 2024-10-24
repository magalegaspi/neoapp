import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;

  // Control de visibilidad para los dos campos de contraseña
  passwordFieldType: string = 'password';
  passwordIcon: string = 'eye-off';
  confirmPasswordFieldType: string = 'password';
  confirmPasswordIcon: string = 'eye-off';

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmacionPassword: new FormControl('', Validators.required),
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit() {
    console.log("Bienvenido a la NASA!")
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

  // Alternar visibilidad del campo de confirmación de contraseña
  toggleConfirmPasswordVisibility() {
    if (this.confirmPasswordFieldType === 'password') {
      this.confirmPasswordFieldType = 'text';
      this.confirmPasswordIcon = 'eye';
    } else {
      this.confirmPasswordFieldType = 'password';
      this.confirmPasswordIcon = 'eye-off';
    }
  }

  // Validador personalizado para verificar si las contraseñas coinciden
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmacionPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  async guardar() {
    const f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tenes que llenar todos los campos y las contraseñas deben coincidir',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    const usuario = {
      nombre: f.nombre,
      password: f.password,
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));

    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: 'Bienvenido a la NASA!',
      buttons: ['Aceptar'],
    });

    await alert.present();

    // Redirigir al login después de cerrar la alerta
    alert.onDidDismiss().then(() => {
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }
}
