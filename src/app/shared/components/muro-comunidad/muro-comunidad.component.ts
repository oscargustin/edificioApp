import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Items } from 'src/models/muroComunidad.model';
import { User } from 'src/models/user.model';


@Component({
  selector: 'app-muro-comunidad',
  templateUrl: './muro-comunidad.component.html',
  styleUrls: ['./muro-comunidad.component.scss'],
})
export class MuroComunidadComponent  implements OnInit {

  items: Items[] = []

  constructor(private firebaseSrv: FirebaseService,
    private utilsSrv: UtilsService
  ){}

  ngOnInit() {

  }
  
  ionViewWillEnter() {
    this.getItems()
  }
  
//min 2:14:00 para visualizar esto en el html
  getItems(){
    let user: User = this.utilsSrv.getElementFromLocalStorage('user')
    let path = `users/${user.uid}`

    this.firebaseSrv.getSubColleccion(path, 'items').subscribe({
      next: (res) => {
        console.log('Items obtenidos:', res);
      },
      error: (error) => {
        console.error('Error al obtener items:', error);
      },
    });
  }



}
