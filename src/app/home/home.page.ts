import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/messaging';

const userPicElement: HTMLElement = document.getElementById('user-pic');
const userNameElement: HTMLElement = document.getElementById('user-name');

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  user: Observable<firebase.User>;
  currentUser: firebase.User;;
  messages: Observable<any[]>;
  signedIn: boolean;

  constructor() {
    console.log('firebase initialized');
    this.initFirebaseAuth();
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

  authStateObserver(u) {
    if (u) { // User is signed in!
      
      this.user.subscribe((user: firebase.User) => {
        console.log(user);
        this.currentUser = user;
        this.signedIn = true;
      })

      console.log('observing current user -> ', this.currentUser.displayName);
      
      const profilePicUrl = u.photoURL;
      const userName = u.displayName;
  
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
      console.log('user is not currently signed in -> ', this.currentUser);
      // Hide user's profile and sign-out button.
      // userNameElement.setAttribute('hidden', 'true');
      // userPicElement.setAttribute('hidden', 'true');
      // signOutButtonElement.setAttribute('hidden', 'true');
  
      // // Show sign-in button.
      // signInButtonElement.removeAttribute('hidden');
    }
  }

}
