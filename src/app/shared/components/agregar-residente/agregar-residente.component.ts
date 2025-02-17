import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UserLogin, User } from 'src/models/user.model';

@Component({
  selector: 'app-agregar-residente',
  templateUrl: './agregar-residente.component.html',
  styleUrls: ['./agregar-residente.component.scss'],
})
export class AgregarResidenteComponent implements OnInit {
  userLog = {} as UserLogin;

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rut: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required]),
    piso: new FormControl('', [Validators.required, Validators.min(1)]),
    rol: new FormControl('', [Validators.required]),
  });

  hide: boolean = true;

  constructor(
    private router: Router,
    private firebaseSrv: FirebaseService,
    private utilsSrv: UtilsService
  ) {}

  ngOnInit() {
    this.userLog = this.utilsSrv.getElementFromLocalStorage('user');
    if (this.userLog) {
      this.form.patchValue(this.userLog);
      this.form.updateValueAndValidity();
    }
  }

  registrarResidente() {
    if (this.form.valid) {
      this.utilsSrv.presentLoading({ message: 'Registrando...' });
  
      this.firebaseSrv.register(this.form.value as User).then(async (res) => {
        console.log('Usuario creado:', res);
  
        const user: User = {
          uid: res.user?.uid || '',
          nombre: this.form.value.nombre || '',
          email: this.form.value.email || '',
          rut: this.form.value.rut || '',
          telefono: this.form.value.telefono || '',
          departamento: this.form.value.departamento || '',
          piso: this.form.value.piso || '',
          rol: this.form.value.rol || '',
        };
  
        this.utilsSrv.setElementInLocalStorage('user', user);
        this.utilsSrv.dismissLoading();
  
        this.utilsSrv.presentToast({
          message: `Te damos la bienvenida ${user.nombre}`,
          duration: 1500,
          color: 'primary',
          icon: 'person-outline',
        });

      }).catch((error) => {
        this.utilsSrv.dismissLoading();
        console.error('Error al registrar el residente:', error);
        this.utilsSrv.presentToast({
          message: 'Error al registrar el residente. Intenta nuevamente.',
          duration: 5000,
          color: 'danger',
          icon: 'alert-circle-outline',
        });
      });
    } else {
      this.utilsSrv.presentToast({
        message: 'Por favor completa todos los campos correctamente.',
        duration: 3000,
        color: 'warning',
        icon: 'alert-circle-outline',
      });
    }
  }
  
}
