import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-residente',
  templateUrl: './agregar-residente.component.html',
  styleUrls: ['./agregar-residente.component.scss'],
})
export class AgregarResidenteComponent  {
submit() {
throw new Error('Method not implemented.');
}
agregarResidente() {
throw new Error('Method not implemented.');
}

form  = new FormGroup({
  email: new FormControl('',[Validators.email, Validators.required]),
  nombre: new FormControl('', [Validators.required]),
  rut: new FormControl('',[ Validators.required]),
  telefono: new FormControl('', [Validators.required]),
  departamento: new FormControl('',[Validators.required]),
  piso: new FormControl('', [Validators.required, Validators.min(1)]),
  rol: new FormControl('',[Validators.required]),
  password: new FormControl('', [Validators.required]),
  
  
})



residente = {
  nombre: '',
  correo: '',
  rut: '',
  telefono: '',
  departamento: '',
  piso: '',
  rol: ''
};


  constructor(private router:Router) { }

  ngOnInit() {}

}