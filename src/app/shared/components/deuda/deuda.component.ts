import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-deuda',
  templateUrl: './deuda.component.html',
  styleUrls: ['./deuda.component.scss'],
})
export class DeudaComponent implements OnInit {
  deudas: any[] = [];
  usuarios: any[] = [];
  formDeuda: FormGroup;
  modalAbierto = false;
  deudaSeleccionada: any = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    // this.obtenerUsuarios();
    // this.obtenerDeudas();
    // this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formDeuda = new FormGroup({
      userId: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl('', [Validators.required, Validators.min(1)]),
      fechaLimite: new FormControl('', Validators.required),
    });
  }

  obtenerUsuarios() {
    this.firebaseService.getCollection('usuarios').subscribe((usuarios: any[]) => {
      this.usuarios = usuarios;
    });
  }

  obtenerDeudas() {
    this.firebaseService.getCollection('deudas').subscribe((deudas: any[]) => {
      this.deudas = deudas;
    });
  }

  crearNuevaDeuda() {
    this.deudaSeleccionada = null;
    this.modalAbierto = true;
    this.formDeuda.reset();
  }

  editarDeuda(deuda: any) {
    this.deudaSeleccionada = deuda;
    this.modalAbierto = true;
    this.formDeuda.patchValue(deuda);
  }

  guardarDeuda() {
    if (this.formDeuda.invalid) return;

    const deuda = this.formDeuda.value;
    if (this.deudaSeleccionada) {
      this.firebaseService
        .updateDocument(`deudas/${this.deudaSeleccionada.id}`, deuda)
        .then(() => {
          this.obtenerDeudas();
          this.modalAbierto = false;
        });
    } else {
      this.firebaseService.addDocument('deudas', deuda).then(() => {
        this.obtenerDeudas();
        this.modalAbierto = false;
      });
    }
  }

  cerrarDeuda(deuda: any) {
    deuda.estado = 'Pagado';
    this.firebaseService.updateDocument(`deudas/${deuda.id}`, deuda).then(() => {
      this.obtenerDeudas();
    });
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
}
