import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioAdminPageRoutingModule } from './inicio-admin-routing.module';

import { InicioAdminPage } from './inicio-admin.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioAdminPageRoutingModule,
    SharedModule
  ],
  declarations: [InicioAdminPage]
})
export class InicioAdminPageModule {}
