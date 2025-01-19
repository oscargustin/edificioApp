import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[{
      path: 'settings',
      loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
    },
    {
      path: 'transacciones',
      loadChildren: () => import('./transacciones/transacciones.module').then( m => m.TransaccionesPageModule)
    },
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    },
    {
      path: 'servicios',
      loadChildren: () => import('./servicios/servicios.module').then( m => m.ServiciosPageModule)
    }]
  }

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
