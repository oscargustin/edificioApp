import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private LoadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }


// ================ LOADING ================
async presentLoading(opts?: LoadingOptions){
  const loading = await this.LoadingController.create(opts);
  await loading.present();
}

async dismissLoading(){
  return await this.LoadingController.dismiss()
}


// ====================== LocalStorage ======================
//SET
setElementInLocalStorage(key:string, element: any){
  return localStorage.setItem(key, JSON.stringify(element))
}

//GET
getElementFromLocalStorage(key: string){
  return JSON.parse(localStorage.getItem(key));
}


// ====================== Router ======================

routerLink(url: string){
  return this.router.navigateByUrl(url);
}



// ====================== TOAST ======================
async presentToast(opts: ToastOptions) {
  const toast = await this.toastController.create(opts);
  toast.present();
}

// ====================== Modal ======================
async presentModal(opts: ModalOptions) {
  const modal = await this.modalController.create(opts);
  await modal.present();

  const data = await modal.onWillDismiss();

  return data || {};
}
// ====================== Dismiss ======================
dismissModal(data?: any){
  this.modalController.dismiss(data);
}

}
3