import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,  } from '@angular/fire/compat/firestore';
import { User, UserLogin } from 'src/models/user.model';
import {AngularFireStorage, } from '@angular/fire/compat/storage';
import { getFirestore,setDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}


// ======================= AUTENTICACION ========================
  // Método para registrar un usuario
  register(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password).then(userCredential => {
      const uid = userCredential.user?.uid; // Obtén el UID del usuario

      // Agrega el usuario a Firestore
      return this.firestore.collection(`residentes`).doc(uid).set({
        uid: uid,
        nombre: user.nombre,
        email: user.email,
        rut: user.rut,
        telefono: user.telefono,
        departamento: user.departamento,
        piso: user.piso,
        rol: user.rol,
        createdAt: new Date(),
      }).then(() => userCredential); // Devuelve el userCredential para usarlo después
    });
  }

  // Actualizar perfil del usuario autenticado
  async actualizarUsuario(profile: { displayName?: string }) {
    const currentUser = await this.auth.currentUser;
    if (currentUser) {
      return currentUser.updateProfile(profile);
    }
    return Promise.reject('No user is currently logged in');
  }

  

  // Método para logeo
  login(user: UserLogin) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password)

  }

// ======================== Firestore (Base de datos) ========================

generateId(): string {
  return this.firestore.createId();
}

addDocument(path: string, data: any) {
  return this.firestore.collection(path).add(data); // Agrega el documento con un ID autogenerado
}

getCollection(path: string) {
  return this.firestore.collection(path).valueChanges({ idField: 'id' });
}

addToCollection(path: string, data: any) {
  return this.firestore.collection(path).add(data);
}

updateDocument(path: string, data: any) {
  return this.firestore.doc(path).update(data);
}




getSubColleccion(path: string, subcollectionName: string) {
  return this.firestore.doc(path).collection(subcollectionName).valueChanges({ idFiel: 'id'})
}

addToSubCollection(path: string, subCollection: string, data: any) {
  const subCollectionPath = `${path}/${subCollection}/${data.id}`;
  return this.firestore.doc(subCollectionPath).set(data);
}

getPagos(path: string) {
  return this.firestore.collection(path, (ref) => ref.orderBy('createdAt', 'desc')).valueChanges({ idField: 'id' });
}



getCollectionGroup(collectionGroup: string) {
  return this.firestore.collectionGroup(collectionGroup).valueChanges();
}



// ======================== Deudas ========================



}
