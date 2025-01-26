import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/models/user.model';
import { Pagos } from 'src/models/pagos.models';
import { ModalController } from '@ionic/angular';
import { PagoModalComponent } from 'src/app/shared/components/pago-modal/pago-modal.component';


@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.page.html',
  styleUrls: ['./transacciones.page.scss'],
})
export class TransaccionesPage implements OnInit {

  allTransactions: any[] = [];
  transactions: any[] = [];
  segmentValue = 'in';
  pago: Pagos[] =[]
@Input() isModal: boolean;


  constructor(private utilsSrv:UtilsService,
    private firebaseSrv: FirebaseService,
    private modal:ModalController
  ) { }

  ngOnInit() {   
    this.getTransaccion(this.pago[0])
  }

  filterTransactions() {
    if(this.segmentValue == 'in') {
      this.transactions = this.allTransactions.filter(x => x.amount >= 0);
    } else {
      this.transactions = this.allTransactions.filter(x => x.amount < 0);
    }
  }

  segmentChanged(event: any) {
    console.log(event);
    this.segmentValue = event.detail.value;
    this.filterTransactions();
  }

  modalPagos(item?: Pagos){
    this.utilsSrv.presentModal({
      component: PagoModalComponent,
      componentProps: {item,
        isModal:true
      },
      cssClass: 'obtener-pagos'
    })
  }
  closeModal() {
    if (this.isModal) {
      this.utilsSrv.dismissModal();
    }}

    

    getTransaccion(item?: Pagos) {
      const user: User = this.utilsSrv.getElementFromLocalStorage('user');
      console.log('Usuario recuperado:', user); // Revisa que los datos sean correctos
    
      if (!user || !user.uid) {
        console.error('No se encontró un usuario autenticado.');
        return;
      }
    
      const path = `registroPagos/${user.uid}`;
      console.log('Path generado:', path);
    
      this.firebaseSrv.getSubColleccion(path, 'pagos').subscribe({
        next: (res: Pagos[]) => {
          console.log('Pagos obtenidos:', res);
          this.pago = res;
        },
        error: (error) => {
          console.error('Error al obtener pagos:', error);
        },
      });
    }
    

  

  


  

}
