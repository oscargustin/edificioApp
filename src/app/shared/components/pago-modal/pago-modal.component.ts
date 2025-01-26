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
    this.generarPago();
  }

  generarPago() {
    if (!this.userId) {
      console.error('No se pudo obtener el ID del usuario logeado.');
      this.utilsSrv.presentToast({
        message: 'Error: No se encontró usuario logeado.',
        color: 'danger',
        icon: 'alert-circle-outline',
        duration: 1500,
      });
      return;
    }

    const path = `registroPagos/${this.userId}/pagos`; // Ruta basada en el usuario logeado
    const data = {
      ...this.formItem.value,
      createdAt: new Date().toISOString(), // Fecha actual generada automáticamente
    };

    this.utilsSrv.presentLoading({ message: 'Guardando pago...' });
    this.firebaseSrv.addToSubCollection(path, '', data).then(
      (res) => {
        console.log('Pago guardado exitosamente:', res);
        this.utilsSrv.dismissModal({ success: true });
        this.utilsSrv.presentToast({
          message: 'Pago realizado exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });
      },
      (error) => {
        console.error('Error al guardar el pago:', error);
        this.utilsSrv.presentToast({
          message: 'Error al guardar el pago.',
          color: 'danger',
          icon: 'alert-circle-outline',
          duration: 1500,
        });
      }
    ).finally(() => {
      this.utilsSrv.dismissLoading();
    });
  }

  closeModal() {
    if (this.isModal) {
      this.utilsSrv.dismissModal();
    }
  }
}
