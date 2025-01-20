import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User, UserLogin } from 'src/models/user.model';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // Método para registrar un usuario
  register(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password).then(userCredential => {
      const uid = userCredential.user?.uid; // Obtén el UID del usuario
      const usersCollection = this.firestore.collection('residentes'); // Define la colección

      // Agrega el usuario a Firestore
      return usersCollection.doc(uid).set({
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

  // actualizarUsuario(user: any) {
  //   const auth = getAuth(); // Obtén la instancia de autenticación
  //   if (!auth.currentUser) {
  //     throw new Error('No hay un usuario autenticado.');
  //   }
  //   return updateProfile(auth.currentUser, user);
  // }
  



}
