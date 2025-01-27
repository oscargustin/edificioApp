import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-historico-admin',
  templateUrl: './historico-admin.component.html',
  styleUrls: ['./historico-admin.component.scss'],
})
export class HistoricoAdminComponent implements OnInit {
  historialPagos: {
    tituloUser: string;
    descripcionUser: string;
    fechaUser: string;
    avatarUser: string;
    seleccionado?: boolean;
  }[] = [];
  filteredPagos: any[] = [];
  searchTerm: string = '';

  constructor(private firebaseSrv: FirebaseService) {}

  ngOnInit() {
    this.loadPagos();
  }

  // Cargar pagos desde Firebase
  async loadPagos() {
    const path = 'pagoAdmin';  // Nueva colección para pagos generales
    try {
      // Obtener todos los pagos de la colección 'pagoAdmin'
      const pagos = await this.firebaseSrv.getCollection(path).toPromise(); 
      const allPayments: any[] = pagos.map((pago: any) => ({
        uid: pago.id, // ID del documento
        departamento: pago.departamento || 'N/A',
        monto: pago.monto || 0,
        cntaBancaria: pago.cntaBancaria || 'N/A',
        descripcion: pago.descripcion || 'Sin descripción',
        fecha: pago.fecha || 'Sin fecha',
        seleccionado: false, // Para manejar selección
      }));
  
      // Asignar los pagos cargados
      this.historialPagos = allPayments;
      this.filteredPagos = [...this.historialPagos];
    } catch (error) {
      console.error('Error al cargar pagos:', error);
    }
  }
  
  

  // Filtrar pagos según el término de búsqueda
  filterPagos() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPagos = this.historialPagos.filter(
      (pago) =>
        pago.tituloUser.toLowerCase().includes(term) ||
        pago.descripcionUser.toLowerCase().includes(term) ||
        pago.fechaUser.toLowerCase().includes(term)
    );
  }

  // Publicar un nuevo pago
  publicarPago() {
    console.log('Funcionalidad de publicar pendiente.');
  }

  // Eliminar pagos seleccionados
  eliminarSeleccionados() {
    const seleccionados = this.historialPagos.filter((pago) => pago.seleccionado);
    if (seleccionados.length > 0) {
      console.log('Eliminando:', seleccionados);
      // Aquí puedes implementar la eliminación en Firebase
    } else {
      console.warn('No hay pagos seleccionados para eliminar.');
    }
  }
}
