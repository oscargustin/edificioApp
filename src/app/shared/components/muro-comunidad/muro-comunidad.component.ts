import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Items } from 'src/models/muroComunidad.model';

@Component({
  selector: 'app-muro-comunidad',
  templateUrl: './muro-comunidad.component.html',
  styleUrls: ['./muro-comunidad.component.scss'],
})
export class MuroComunidadComponent implements OnInit {
  items: Items[] = []; // Lista para almacenar las noticias

  constructor(
    private firebaseSrv: FirebaseService,
    private utilsSrv: UtilsService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  ionViewWillEnter() {
    this.getItems();
  }

  // Método para obtener las noticias de la nueva ruta
  getItems() {
    const path = `users/noticias/colecNoticias`; // Ruta fija a la subcolección
    this.firebaseSrv.getCollection(path).subscribe({
      next: (res: Items[]) => {
        console.log('Noticias obtenidas:', res);
        this.items = res; // Almacenar las noticias obtenidas en el array
      },
      error: (error) => {
        console.error('Error al obtener noticias:', error);
        this.utilsSrv.presentToast({
          message: 'Error al cargar noticias.',
          color: 'danger',
          duration: 2000,
        });
      },
    });
  }
}
