import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { getAuth,   } from 'firebase/auth'; 
import { Firestore, doc, getDoc,  } from '@angular/fire/firestore';
import { UtilsService } from 'src/app/services/utils.service';
import { User, UserLogin } from 'src/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form  = new FormGroup({
  email: new FormControl('',[Validators.email, Validators.required]),
  password: new FormControl('',[ Validators.required])
})
 
  constructor(private firebaseSrv:FirebaseService,
    private utilsSrv: UtilsService
  ) { }

  ngOnInit() {
  }

  getCurrentUserUid(): string | null {
    const auth = getAuth();
    const user = auth.currentUser;
    return user ? user.uid : null; // Retorna el UID si el usuario está autenticado, de lo contrario null
  }
login() {
      if (this.form.valid) {
         this.utilsSrv.presentLoading({ message: 'Autenticando...' });  
        this.firebaseSrv.login(this.form.value as UserLogin).then(async res => {
          console.log('Usuario creado:', res);


          let user: UserLogin ={
            uid: res.user.uid,
            email: this.form.value.email,
            password: this.form.value.password
          }

          this.utilsSrv.setElementInLocalStorage('user', user)
          this.utilsSrv.routerLink('tabs/home')
          this.utilsSrv.dismissLoading();
          
          this.utilsSrv.presentToast({
            message: `Te damos la bienvenida ${user.email}`,
            duration: 1500,
            color: 'primary',
            icon: 'person-outline',

          })

          this.utilsSrv.dismissLoading();
          this.form.reset();
        
        },error => {
          this.utilsSrv.dismissLoading();
          console.error('Error al registrar el residente:', error);
          this.utilsSrv.dismissLoading();
          this.utilsSrv.presentToast({
            message: 'Error al registrar el residente. Intenta nuevamente.',
            duration: 5000,
            color: 'danger',
            icon: 'alert-circle-outline',
          })
        
        })
      }
  }
  }