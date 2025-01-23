import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/models/user.model';
import { Items } from 'src/models/muroComunidad.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  
  items: Items[] = []
  loading: boolean = false;

  constructor(private firebaseSrv: FirebaseService,
    private utilsSrv: UtilsService
  ){}

  ngOnInit() {

  }

  
  
  ionViewWillEnter() {
    this.getItems()
  }

  getItems() {
    const user: User = this.utilsSrv.getElementFromLocalStorage('user'); // Obtener usuario autenticado
    const path = `users/${user.uid}`; // Ruta para las publicaciones del usuario
  
      this.loading= true;
    this.firebaseSrv.getSubColleccion(path, 'items').subscribe({
      next: (res: Items[]) => {
        console.log('Items obtenidos:', res);
        this.items = res; 
        this.loading= false;// Asignar los datos obtenidos a la lista de items
      },
      error: error => {
        console.error('Error al obtener items:', error);
        this.utilsSrv.presentToast({
          message: 'Error al cargar publicaciones.',
          color: 'danger',
          duration: 2000,
        });
      },
    });
  }
  

  modalPago(item?: Items){
      this.utilsSrv.presentModal({
        component: 'AddUpdateItemComponent',
        componentProps: {item,
          isModal:true
        },
        cssClass: 'agregar-editar-modal'
      })
    }
  

}
