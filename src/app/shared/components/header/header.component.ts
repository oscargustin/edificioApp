import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  

  constructor(private router: Router) { }

  ngOnInit() {}

  
  logout() {
    // Limpia el estado de la sesión (puedes borrar tokens, datos de usuario, etc.)
    localStorage.removeItem('user'); // Por ejemplo, eliminamos el usuario de localStorage
    this.router.navigate(['/login']); // Redirige al login
  }
  

}
