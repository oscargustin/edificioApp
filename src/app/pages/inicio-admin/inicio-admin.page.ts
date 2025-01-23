import { Component, OnInit } from '@angular/core';
import { Items } from 'src/models/muroComunidad.model';
import { UtilsService } from '../../services/utils.service';
import { AddUpdateItemComponent } from 'src/app/shared/components/add-update-item/add-update-item.component';
import { User } from 'src/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.page.html',
  styleUrls: ['./inicio-admin.page.scss'],
})
export class InicioAdminPage implements OnInit {

  constructor(private utilSrc: UtilsService,
    private firebaseSrv: FirebaseService,
  ) { }

  
  items: Items[] = [];
  itemUser: {tituloUser: string; descripcionUser: string; fechaUser: string; avatarUser: string }[] = [];
  selectedTab: string ="muro";


  ngOnInit() {
        //  let user: User = this.utilSrc.getElementFromLocalStorage('user')
        //  let path = `users/${user.uid}`
     
        //  this.firebaseSrv.getSubColleccion(path, 'items').subscribe({
        //    next: (res: Items[]) => {
        //      console.log('Items obtenidos:', res);
        //    },
        //    error: (error) => {
        //      console.error('Error al obtener items:', error);
        //    },
        //  });
       }

  

  addOrUpdateItem(item?: Items){
    this.utilSrc.presentModal({
      component: AddUpdateItemComponent,
      componentProps: {item,
        isModal:true
      },
      cssClass: 'agregar-editar-modal'
    })
  }

  //
}
