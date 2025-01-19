import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage  {
  constructor(private alertController: AlertController){}

  async selectSpace(space: string) {
    const alert = await this.alertController.create({
      header: 'Reservar espacio',
      message: `¿Desea reservar el espacio: <strong>${space}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Reservar',
          handler: () => {
            this.confirmReservation(space);
          },
        },
      ],
    });

    await alert.present();
  }

  confirmReservation(space: string) {
    // Lógica para confirmar la reserva
    console.log(`Reserva confirmada para: ${space}`);
    // Aquí puedes agregar la lógica para registrar la reserva en tu backend
  }
  }
