import { Component, Input, input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Items } from 'src/models/muroComunidad.model';
import { Pagos } from 'src/models/pagos.models';

@Component({
  selector: 'app-pago-modal',
  templateUrl: './pago-modal.component.html',
  styleUrls: ['./pago-modal.component.scss'],
})
export class PagoModalComponent  implements OnInit {

//AUTOCOMPLETAR LOS DATOS DESDE EL LOCALSTOAGE O FIREBASE
@Input() isModal: boolean;
pagos: Pagos;


    formItem  = new FormGroup({
      id: new FormControl('', [Validators.required],),
      departamento: new FormControl('',[Validators.email, Validators.required]),
      monto: new FormControl('', [Validators.required, Validators.min(1)]),
      fechaPago: new FormControl('',[Validators.required, this.fechaEnRango]),
      cntaBancaria: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required],),
      
      })

  constructor(private firebaseSrv:FirebaseService,
    private utilsSrv: UtilsService) { }

  

  ngOnInit() {
    this.pagos = this.utilsSrv.getElementFromLocalStorage('user')
    if(this.pagos){
      // this.formItem.setValue(this.pagos);
      this.formItem.updateValueAndValidity();
    }
  }

  submit() {
    if (this.formItem.invalid) {
      console.log('Formulario inválido:', this.formItem.errors);
      return;
    }
  
    this.generarPago();
  }

  generarPago(){
    let path = `residente/${this.pagos.id}`;

    this.utilsSrv.presentLoading();
    delete this.formItem.value.id;

    this.firebaseSrv.addToSubCollection(path, 'pagos', this.formItem.value).then( res =>{
      this.utilsSrv.dismissModal({success: true});

      this.utilsSrv.presentToast({
        message: 'Pago realizado exitosamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500
      })
      this.utilsSrv.dismissModal();
    }, error =>{
      this.utilsSrv.presentToast({
        message: 'Error',
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 1500
      })

    })
  }

  fechaEnRango(control: FormControl) {
    const fecha = new Date(control.value);
    const hoy = new Date();
    if (isNaN(fecha.getTime())) {
      return { invalidDate: 'Fecha no válida' };
    }
    if (fecha < hoy) {
      return { pastDate: 'La fecha no puede ser anterior a hoy' };
    }
    return null;
  }

  closeModal() {
    if (this.isModal) {
      this.utilsSrv.dismissModal();
    }}

}
