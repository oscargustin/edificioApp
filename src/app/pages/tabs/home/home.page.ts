import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/models/user.model';
import { Items } from 'src/models/muroComunidad.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  
  items: Items[] = []
  loading: boolean = false;

  constructor(private firebaseSrv: FirebaseService,
    private utilsSrv: UtilsService
  ){}

  ngOnInit() {

  }

  

}
