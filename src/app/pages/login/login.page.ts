import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { getAuth,   } from 'firebase/auth'; 

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
  utilSrc: any;
 
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
        const uid = res.user.uid;
        const email = this.form.value.email;
  
        // Crear el objeto del usuario
        const user: UserLogin = {
          uid: uid,
          email: email,
          password: this.form.value.password,
        };
  
        // Guardar en LocalStorage
        this.utilsSrv.setElementInLocalStorage('user', user);
  
        // Redirección basada en el rol
        if (email.includes('admin')) {
          // Si el correo incluye "admin", redirigir al inicio de administrador
          this.utilsSrv.routerLink('inicio-admin');
        } else {
          // Si no, redirigir al inicio normal
          this.utilsSrv.routerLink('tabs/home');
        }
  
        this.utilsSrv.dismissLoading();
        this.form.reset();
      }).catch(error => {
        this.utilsSrv.dismissLoading();
        console.error('Error al iniciar sesión:', error);
  
        // Mostrar mensaje de error
        this.utilsSrv.presentToast({
          message: 'Error al iniciar sesión. Verifica tus credenciales.',
          duration: 5000,
          color: 'danger',
          icon: 'alert-circle-outline',
        });
      });
    }
  }
  









  
  }