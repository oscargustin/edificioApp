import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { User } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Items } from 'src/models/muroComunidad.model';

@Component({
  selector: 'app-add-update-item',
  templateUrl: './add-update-item.component.html',
  styleUrls: ['./add-update-item.component.scss'],
})
export class AddUpdateItemComponent implements OnInit {
  @Input() isModal: boolean;
  item: Items;
  user = {} as User;

  formItem = new FormGroup({
    id: new FormControl(''),
    tittle: new FormControl('', [Validators.required, Validators.minLength(4)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(4)]),
    fecha: new FormControl('', [Validators.required, this.fechaEnRango]),
  });

  constructor(private firebaseSrv: FirebaseService, private utilsSrv: UtilsService) {}

  ngOnInit() {
    this.user = this.utilsSrv.getElementFromLocalStorage('user');
    if (this.item) {
      this.formItem.setValue(this.item);
      this.formItem.updateValueAndValidity();
    }
  }

  submit() {
    if (this.formItem.invalid) {
      console.log('Formulario inválido:', this.formItem.errors);
      return;
    }
  
    const noticia = this.formItem.value; // Datos del formulario
    const path = `users/noticias/colecNoticias`; // Ruta fija donde se guardarán las noticias
  
    this.utilsSrv.presentLoading({ message: 'Subiendo aviso...' });
  
    this.firebaseSrv
      .addDocument(path, { ...noticia }) // No necesitas un ID personalizado, Firestore lo autogenera
      .then(() => {
        this.utilsSrv.dismissLoading();
        this.utilsSrv.dismissModal({ success: true });
        this.utilsSrv.presentToast({
          message: 'Aviso publicado exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });
        this.formItem.reset(); // Limpia el formulario después de enviar
      })
      .catch((error) => {
        this.utilsSrv.dismissLoading();
        console.error('Error al publicar aviso:', error);
        this.utilsSrv.presentToast({
          message: 'Error al publicar aviso. Inténtalo nuevamente.',
          color: 'danger',
          icon: 'alert-circle-outline',
          duration: 1500,
        });
      });
      }

  // Validador personalizado para rango de fechas
  fechaEnRango(control: FormControl): ValidationErrors | null {
    const fecha = new Date(control.value);
    const hoy = new Date();
    const limite = new Date();
    limite.setDate(hoy.getDate() + 30);

    if (isNaN(fecha.getTime())) {
      return { invalidDate: 'Fecha no válida' };
    }

    if (fecha < hoy) {
      return { pastDate: 'La fecha debe ser a partir de hoy' };
    }

    if (fecha > limite) {
      return { fechaFueraDeRango: 'La fecha debe estar dentro de los próximos 30 días.' };
    }

    return null;
  }



      
      closeModal() {
        if (this.isModal) {
          this.utilsSrv.dismissModal();
        }
      }

      
}
