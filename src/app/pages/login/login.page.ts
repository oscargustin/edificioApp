import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 
  constructor() { }

  usuario={
    username:'',
    password:''
  }
  ngOnInit() {
  }
    
    onSubmit(){
      console.log("works!!!!")
    }

}
