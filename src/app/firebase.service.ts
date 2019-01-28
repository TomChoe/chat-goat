import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/messaging';

import { fireConfig } from './config';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor() { 
    firebase.initializeApp(fireConfig);
    console.log('firebase initialized');
  }

  // ** USER AUTH FUNCTIONS AND ELEMENTS ** //

  initFirebaseAuth(authStateOberver) {
    firebase.auth().onAuthStateChanged(authStateOberver);
    console.log('init firebaseAuth');
  }

  // authStateObserver(user) {
  //   console.log('auth state observer');
  //   if (user) {
  //     console.log('user is signed in');
  //     // Get the signed-in user's profile pic and name.
  //     let profilePicUrl = this.getProfilePicUrl();
  //     let userName = this.getUserName();
  
  //     // Set the user's profile pic and name.
  //     document.getElementById('user-pic').style.backgroundImage = 'url(' + this.addSizeToGoogleProfilePic(profilePicUrl) + ')';
  //     document.getElementById('user-name').textContent = userName;
  
  //     // Show user's profile and sign-out button.
  //     document.getElementById('user-name').removeAttribute('hidden');
  //     document.getElementById('user-pic').removeAttribute('hidden');
  //     document.getElementById('sign-out').removeAttribute('hidden');
  
  //     // Hide sign-in button.
  //     document.getElementById('sign-in').setAttribute('hidden', 'true');
  
  //     // We save the Firebase Messaging Device token and enable notifications.
  //     this.saveMessagingDeviceToken();
  //   } else {
  //     console.log('user is not current signed in')
  //     // Hide user's profile and sign-out button.
  //     document.getElementById('user-name').setAttribute('hidden', 'true');
  //     document.getElementById('user-pic').setAttribute('hidden', 'true');
  //     document.getElementById('sign-out').setAttribute('hidden', 'true');
  
  //     // Show sign-in button.
  //     document.getElementById('sign-in').removeAttribute('hidden');
  //   }
  // }

  signIn() {
    console.log('signing in');
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    console.log('signing out');
    firebase.auth().signOut();
  }

  isUserSignedIn() {
    return !!firebase.auth().currentUser;
  }

  getProfilePicUrl() {
    console.log('returning profile pic')
    return firebase.auth().currentUser.photoURL || './assets/profile_placeholder.png';
  }

  getUserName() {
    return firebase.auth().currentUser.displayName;
  }

  addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
      return url + '?sz=150';
    }
    return url;
  }

  saveMessagingDeviceToken() {
    firebase.messaging().getToken().then((currentToken) => {
      if (currentToken) {
        console.log('Got FCM device token', currentToken);
        firebase.firestore().collection('fcmTokens').doc(currentToken)
            .set({uid: firebase.auth().currentUser.uid})
      } else {
        this.requestNotificationsPermissions();
      }
    }).catch((err) => {
      console.error('Unable to get messaging token.', err);
    });
  }

  requestNotificationsPermissions() {
    console.log('requesting permissions..');
    firebase.messaging().requestPermission().then(() => {
      this.saveMessagingDeviceToken();
    }).catch((err) => {
      console.error('Unable to get permission to notify', err)
    });
  }


}
