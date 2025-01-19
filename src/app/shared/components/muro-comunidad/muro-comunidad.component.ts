import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-muro-comunidad',
  templateUrl: './muro-comunidad.component.html',
  styleUrls: ['./muro-comunidad.component.scss'],
})
export class MuroComunidadComponent  implements OnInit {
  items: { titulo: string; descripcion: string; fecha: string; avatar: string }[] = [];
  itemUser: {tituloUser: string; descripcionUser: string; fechaUser: string; avatarUser: string }[] = [];

  ngOnInit() {
    this.loadInitialItems();
    this.loadInitiaUHistorialPagosUser();
  }

  segments= this.loadInitialItems;
  
  // Cargar publicaciones iniciales
  private loadInitialItems() {
    this.items = [
      {
        titulo: 'Recordatorio: Día de mantenimiento',
        descripcion: 'Se informa a los residentes que el próximo martes 07 de enero de 2025 se realizará el mantenimiento general del edificio. Por favor, eviten usar los ascensores durante la jornada.',
        fecha: '2025-01-07',
        avatar: 'https://via.placeholder.com/80?text=M'
      },
      {
        titulo: 'Actualización de gastos comunes',
        descripcion: 'Los gastos comunes del mes de diciembre ya están disponibles en la plataforma. Por favor, revisen y realicen sus pagos antes del 10 de enero.',
        fecha: '2024-12-26',
        avatar: 'https://via.placeholder.com/80?text=G'
      },
      {
        titulo: 'Cierre de áreas comunes',
        descripcion: 'Se informa que la sala de eventos estará cerrada por mantenimiento desde el 25 hasta el 30 de diciembre.',
        fecha: '2024-12-25',
        avatar: 'https://via.placeholder.com/80?text=A'
      },
      {
        titulo: 'Recordatorio: Día de mantenimiento',
        descripcion: 'Se informa a los residentes que el próximo martes 07 de enero de 2025 se realizará el mantenimiento general del edificio. Por favor, eviten usar los ascensores durante la jornada.',
        fecha: '2025-01-07',
        avatar: 'https://via.placeholder.com/80?text=M'
      },
      {
        titulo: 'Actualización de gastos comunes',
        descripcion: 'Los gastos comunes del mes de diciembre ya están disponibles en la plataforma. Por favor, revisen y realicen sus pagos antes del 10 de enero.',
        fecha: '2024-12-26',
        avatar: 'https://via.placeholder.com/80?text=G'
      },
      {
        titulo: 'Cierre de áreas comunes',
        descripcion: 'Se informa que la sala de eventos estará cerrada por mantenimiento desde el 25 hasta el 30 de diciembre.',
        fecha: '2024-12-25',
        avatar: 'https://via.placeholder.com/80?text=A'
      },
    ];
}

private loadInitiaUHistorialPagosUser() {
  this.itemUser = [
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
      tituloUser: 'Pago realizado: Uso de piscina',
      descripcionUser: 'Se registró el pago de $20.000 correspondiente al uso de la piscina el 10 de noviembre.',
      fechaUser: '2024-11-11',
      avatarUser: 'https://via.placeholder.com/80?text=P'
    },
    {
      tituloUser: 'Pago realizado: Gasto común de octubre',
      descripcionUser: 'Se registró el pago de $100.000 correspondiente al gasto común del mes de octubre.',
      fechaUser: '2024-10-30',
      avatarUser: 'https://via.placeholder.com/80?text=GC'
    }
  ];
}

}
