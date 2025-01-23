import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  

  constructor(private utilsSrv:UtilsService) { }

  ngOnInit() {}

  
  // logout() {
  //   this.auth.signOut().then(() => {
  //     this.utilsSrv.removeElementFromLocalStorage('user');
  //     this.utilsSrv.routerLink('/login');
  //   });
  // }
  

}
