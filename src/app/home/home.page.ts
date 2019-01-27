import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  
  constructor(private firebaseService: FirebaseService) {
    firebaseService.initFirebaseAuth();
    document.getElementById('sign-in').removeAttribute('hidden');

  }

  signIn() {
    this.firebaseService.signIn();
  }

  signOut() {
    this.firebaseService.signOut();
  }
}
