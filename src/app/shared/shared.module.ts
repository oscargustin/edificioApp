import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HistoricoAdminComponent } from './components/historico-admin/historico-admin.component';
import { HeaderComponent } from './components/header/header.component';
import { MuroComunidadComponent } from './components/muro-comunidad/muro-comunidad.component';
import { AgregarResidenteComponent } from './components/agregar-residente/agregar-residente.component';
import { AddUpdateItemComponent } from './components/add-update-item/add-update-item.component';
import { PagoModalComponent } from './components/pago-modal/pago-modal.component';
import { DeudaComponent } from './components/deuda/deuda.component';



@NgModule({
  declarations: [HistoricoAdminComponent,
    HeaderComponent,
    MuroComunidadComponent,
    AgregarResidenteComponent,
    AddUpdateItemComponent,
    PagoModalComponent,
    DeudaComponent
    
  ],
  exports:[
    HistoricoAdminComponent,
    HeaderComponent,
    MuroComunidadComponent,
    AgregarResidenteComponent,
    ReactiveFormsModule,
    RouterModule,
    AddUpdateItemComponent,
    PagoModalComponent,
    DeudaComponent
  ]
  ,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule, 
    RouterModule
  ]
})
export class SharedModule { }
