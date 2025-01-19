import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  isDarkTheme: boolean = false;  // Estado inicial del tema
  isSpanish: boolean = true;     // Estado inicial del idioma (Español)
  currentLanguage: string = 'Español';

  constructor() {}

  // Cambiar tema entre oscuro y claro
  toggleTheme(event: any) {
    this.isDarkTheme = event.detail.checked;
    document.body.classList.toggle('dark', this.isDarkTheme); // Aplica el tema
  }

  // Cambiar idioma entre Español e Inglés
  toggleLanguage(event: any) {
    this.isSpanish = event.detail.checked;
    this.currentLanguage = this.isSpanish ? 'Español' : 'Inglés';
    // Aquí puedes agregar la lógica para cambiar el idioma de la aplicación.
  }
}