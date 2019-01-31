import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/messaging';

import { fireConfig } from '../config';

const userPicElement: HTMLElement = document.getElementById('user-pic');
const userNameElement: HTMLElement = document.getElementById('user-name');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  user: firebase.User;
  currentUser: firebase.User;
  messages: Observable<any[]>;
  signedIn: boolean;

  constructor() {
    firebase.initializeApp(fireConfig);
    console.log('firebase initialized');
    this.initFirebaseAuth()
    if(firebase.auth().currentUser) {
      this.user = firebase.auth().currentUser
      this.signedIn = true;
    }
  }

  // ** USER AUTH initalizing and functions **
  signIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    firebase.auth().signOut();
  }

  initFirebaseAuth() {
    firebase.auth().onAuthStateChanged(this.authStateObserver);
  }

  addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
      return url + '?sz=150';
    }
    return url;
  }

  authStateObserver(user) {
    if (user) { // User is signed in!
      this.user = user;
      this.signedIn = true;
      console.log('current user -> ' + this.user.displayName + ' state of user signed is -> ' + this.signedIn);
      // Get the signed-in user's profile pic and name.
      const profilePicUrl = user.photoURL;
      const userName = user.displayName;
  
      // Set the user's profile pic and name.
      // userPicElement.style.backgroundImage = 'url(' + this.addSizeToGoogleProfilePic(profilePicUrl) + ')';
      // userNameElement.textContent = userName;
  
      // // Show user's profile and sign-out button.
      // userNameElement.removeAttribute('hidden');
      // userPicElement.removeAttribute('hidden');
      // signOutButtonElement.removeAttribute('hidden');
  
      // Hide sign-in button.
      // signInButtonElement.setAttribute('hidden', 'true');
  
      // We save the Firebase Messaging Device token and enable notifications.
      // saveMessagingDeviceToken();
    } else { // User is signed out!
      this.signedIn = false;
      // Hide user's profile and sign-out button.
      // userNameElement.setAttribute('hidden', 'true');
      // userPicElement.setAttribute('hidden', 'true');
      // signOutButtonElement.setAttribute('hidden', 'true');
  
      // // Show sign-in button.
      // signInButtonElement.removeAttribute('hidden');
    }
  }

}
