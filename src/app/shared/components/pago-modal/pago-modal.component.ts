import { User } from 'src/models/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Pagos } from 'src/models/pagos.models';

@Component({
  selector: 'app-pago-modal',
  templateUrl: './pago-modal.component.html',
  styleUrls: ['./pago-modal.component.scss'],
})
export class PagoModalComponent implements OnInit {
  @Input() isModal: boolean;
  pagos: Pagos;
  userId: string | null = null;
  user:User;

  formItem = new FormGroup({
    departamento: new FormControl('', [Validators.required]),
    monto: new FormControl('', [Validators.required, Validators.min(1)]),
    cntaBancaria: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
  });

  constructor(private firebaseSrv: FirebaseService, private utilsSrv: UtilsService) {}

  ngOnInit() {
    const user: User = this.utilsSrv.getElementFromLocalStorage('user');
    if (user && user.uid) {
      this.userId = user.uid; // Aseguramos que el UID del usuario logeado se almacena
      console.log('Usuario logeado:', this.userId);
    } else {
      console.error('No se encontró información del usuario logeado o está incompleta.');
      this.utilsSrv.presentToast({
        message: 'Error: No se encontró información del usuario logeado.',
        color: 'danger',
        icon: 'alert-circle-outline',
        duration: 1500,
      });
    }
  }

  submit() {
    console.log('Estado del formulario:', this.formItem.status);
    console.log('Valor del formulario:', this.formItem.value);

    if (this.formItem.invalid) {
      console.error('Formulario inválido:', this.formItem.errors);
      this.utilsSrv.presentToast({
        message: 'Por favor, completa todos los campos correctamente.',
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 1500,
      });
      return;
    }
    this.agregarPago();
  }

  agregarPago() {
    if (this.formItem.invalid) {
      console.log('Formulario inválido:', this.formItem.errors);
      return;
    }
  
    const pago = this.formItem.value; // Datos del formulario
    const pathUsuario = `registroPagos/${this.userId}/pagos`;
    const pathPagoAdmin = 'pagoAdmin'; // Nueva colección para pagos generales
  
    this.utilsSrv.presentLoading({ message: 'Guardando pago...' });
  
    // Guardar en la colección específica del usuario
    this.firebaseSrv
      .addDocument(pathUsuario, { ...pago })
      .then(() => {
        // También agregar en la colección "pagoAdmin"
        this.firebaseSrv
          .addDocument(pathPagoAdmin, { ...pago, uidUsuario: this.userId })
          .then(() => {
            this.utilsSrv.dismissLoading();
            this.utilsSrv.presentToast({
              message: 'Pago registrado exitosamente',
              color: 'success',
              icon: 'checkmark-circle-outline',
              duration: 1500,
            });
            this.formItem.reset(); // Limpia el formulario
            this.closeModal(); // Cierra el modal si es necesario
          })
          .catch((error) => {
            console.error('Error al registrar pago en pagoAdmin:', error);
            this.utilsSrv.presentToast({
              message: 'Error al guardar en pagoAdmin. Inténtalo nuevamente.',
              color: 'danger',
              icon: 'alert-circle-outline',
              duration: 1500,
            });
          });
      })
      .catch((error) => {
        this.utilsSrv.dismissLoading();
        console.error('Error al registrar pago:', error);
        this.utilsSrv.presentToast({
          message: 'Error al registrar el pago. Inténtalo nuevamente.',
          color: 'danger',
          icon: 'alert-circle-outline',
          duration: 1500,
        });
      });
  }
  

  closeModal() {
    if (this.isModal) {
      this.utilsSrv.dismissModal();
    }
  }
}
