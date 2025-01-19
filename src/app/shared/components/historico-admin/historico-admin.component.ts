import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historico-admin',
  templateUrl: './historico-admin.component.html',
  styleUrls: ['./historico-admin.component.scss'],
})
export class HistoricoAdminComponent  implements OnInit {

  historialPagos: { tituloUser: string; descripcionUser: string; fechaUser: string; avatarUser: string }[] = [];

  ngOnInit() {
    this.loadHistorialPagos();
  }
  
  private loadHistorialPagos() {
    this.historialPagos = [
      {
        tituloUser: 'Pago realizado: Gasto común de diciembre',
        descripcionUser: 'Se registró el pago de $100.000 correspondiente al gasto común del mes de diciembre.',
        fechaUser: '2024-12-28',
        avatarUser: 'https://via.placeholder.com/80?text=GC'
      },
      {
        tituloUser: 'Pago realizado: Uso de quincho',
        descripcionUser: 'Se registró el pago de $50.000 correspondiente al arriendo del quincho el 15 de diciembre.',
        fechaUser: '2024-12-16',
        avatarUser: 'https://via.placeholder.com/80?text=Q'
      },
      {
        tituloUser: 'Pago realizado: Gasto común de noviembre',
        descripcionUser: 'Se registró el pago de $100.000 correspondiente al gasto común del mes de noviembre.',
        fechaUser: '2024-11-25',
        avatarUser: 'https://via.placeholder.com/80?text=GC'
      },
      {
        tituloUser: 'Pago realizado: Gasto común de noviembre',
        descripcionUser: 'Se registró el pago de $100.000 correspondiente al gasto común del mes de noviembre.',
        fechaUser: '2024-11-25',
        avatarUser: 'https://via.placeholder.com/80?text=GC'
      },
      {
        tituloUser: 'Pago realizado: Gasto común de noviembre',
        descripcionUser: 'Se registró el pago de $100.000 correspondiente al gasto común del mes de noviembre.',
        fechaUser: '2024-11-25',
        avatarUser: 'https://via.placeholder.com/80?text=GC'
      }
    ];
  }
}
