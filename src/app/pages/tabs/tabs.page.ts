import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  
  @ViewChild('tabs', {static: false}) tabs!: IonTabs;
  selectedTab: any;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }
  logout() {
    // Limpia el estado de la sesión (puedes borrar tokens, datos de usuario, etc.)
    localStorage.removeItem('user'); // Por ejemplo, eliminamos el usuario de localStorage
    this.router.navigate(['/login']); // Redirige al login
  }

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
    console.log(this.selectedTab);
  }
  
}
