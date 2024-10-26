import { Component, OnInit } from '@angular/core'; // Importa Component y OnInit para definir el componente
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // Importa módulos para la gestión de formularios
import { AlertController } from '@ionic/angular'; // Importa AlertController para mostrar alertas
import { Router } from '@angular/router'; // Importa Router para la navegación
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth para autenticación con Firebase

@Component({
  selector: 'app-registro', // Selector para el componente
  templateUrl: './registro.page.html', // Archivo de plantilla HTML del componente
  styleUrls: ['./registro.page.scss'], // Archivo de estilos SCSS del componente
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup; // FormGroup para el formulario de registro

  // Control de visibilidad para los dos campos de contraseña
  passwordFieldType: string = 'password'; // Tipo del campo de contraseña
  passwordIcon: string = 'eye-off'; // Icono para mostrar/ocultar contraseña
  confirmPasswordFieldType: string = 'password'; // Tipo del campo de confirmación de contraseña
  confirmPasswordIcon: string = 'eye-off'; // Icono para mostrar/ocultar confirmación de contraseña

  constructor(
    public fb: FormBuilder, // Inyecta FormBuilder para crear formularios reactivos
    public alertController: AlertController, // Inyecta AlertController para mostrar alertas
    private router: Router, // Inyecta Router para la navegación
    private afAuth: AngularFireAuth // Inyecta AngularFireAuth para autenticación con Firebase
  ) {
    // Inicializa el formulario de registro
    this.formularioRegistro = this.fb.group({
      nombre: new FormControl('', Validators.required), // Campo para el nombre, requerido
      email: new FormControl('', [Validators.required, Validators.email]), // Campo para el email, requerido y validado como email
      password: new FormControl('', Validators.required), // Campo para la contraseña, requerido
      confirmacionPassword: new FormControl('', Validators.required), // Campo para confirmar la contraseña, requerido
    }, { validators: this.passwordsMatchValidator }); // Aplica la validador para verificar que las contraseñas coincidan
  }

  ngOnInit() {
    console.log("Bienvenido a la NASA!"); // Mensaje de bienvenida en la consola
  }

  // Función para validar si las contraseñas coinciden
  passwordsMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmacionPassword')?.value
      ? null : { mismatch: true }; // Retorna null si coinciden, de lo contrario, retorna un error
  }

  // Alternar visibilidad del campo de contraseña
  cambiarVisibilidadContrasenia() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text'; // Cambia el tipo a texto para mostrar la contraseña
      this.passwordIcon = 'eye'; // Cambia el icono a "eye" para mostrar que se puede ver
    } else {
      this.passwordFieldType = 'password'; // Cambia el tipo a password para ocultar la contraseña
      this.passwordIcon = 'eye-off'; // Cambia el icono a "eye-off" para mostrar que está oculta
    }
  }

  // Alternar visibilidad del campo de confirmación de contraseña
  cambiarConfirmacionVisibilidadContrasenia() {
    if (this.confirmPasswordFieldType === 'password') {
      this.confirmPasswordFieldType = 'text'; // Cambia el tipo a texto para mostrar la contraseña
      this.confirmPasswordIcon = 'eye'; // Cambia el icono a "eye" para mostrar que se puede ver
    } else {
      this.confirmPasswordFieldType = 'password'; // Cambia el tipo a password para ocultar la contraseña
      this.confirmPasswordIcon = 'eye-off'; // Cambia el icono a "eye-off" para mostrar que está oculta
    }
  }

  // Método para guardar el registro del usuario
  async guardar() {
    if (this.formularioRegistro.valid) { // Verifica si el formulario es válido
      const { email, password } = this.formularioRegistro.value; // Obtiene el email y la contraseña del formulario

      try {
        // Registra el usuario en Firebase
        await this.afAuth.createUserWithEmailAndPassword(email, password);
        const alert = await this.alertController.create({ // Crea una alerta de éxito
          header: 'Registro exitoso',
          message: 'Usuario registrado correctamente.',
          buttons: ['Aceptar'] // Botón para aceptar
        });
        await alert.present(); // Presenta la alerta
        this.router.navigate(['/login']); // Redirige al login
      } catch (error: any) { // Captura errores durante el registro
        console.error('Error en el registro:', error); // Muestra el error en la consola
        let errorMessage: string;

        // Manejo de errores específicos
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Este correo electrónico ya está en uso. Por favor, intenta con otro.'; // Mensaje si el email ya está en uso
        } else {
          errorMessage = 'No se pudo registrar al usuario. Intenta de nuevo.'; // Mensaje general de error
        }

        const alert = await this.alertController.create({ // Crea una alerta para mostrar el error
          header: 'Error',
          message: errorMessage, // Mensaje del error
          buttons: ['Aceptar'] // Botón para aceptar
        });
        await alert.present(); // Presenta la alerta
      }
    } else {
      const alert = await this.alertController.create({ // Crea una alerta para formulario inválido
        header: 'Formulario inválido',
        message: 'Por favor, completa todos los campos correctamente.', // Mensaje para indicar campos inválidos
        buttons: ['Aceptar'] // Botón para aceptar
      });
      await alert.present(); // Presenta la alerta
    }
  }
}
