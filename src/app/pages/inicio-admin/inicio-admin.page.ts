import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.page.html',
  styleUrls: ['./inicio-admin.page.scss'],
})
export class InicioAdminPage implements OnInit {

  constructor() { }

  
  items: { titulo: string; descripcion: string; fecha: string; avatar: string }[] = [];
  itemUser: {tituloUser: string; descripcionUser: string; fechaUser: string; avatarUser: string }[] = [];
  selectedTab: string ="muro";
  ngOnInit() {

  }

  //
}
