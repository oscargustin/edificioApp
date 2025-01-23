import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransaccionesPageRoutingModule } from './transacciones-routing.module';

import { TransaccionesPage } from './transacciones.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransaccionesPageRoutingModule,
    SharedModule
  ],
  declarations: [TransaccionesPage]
})
export class TransaccionesPageModule {}
