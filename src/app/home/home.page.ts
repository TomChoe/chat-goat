import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  
  constructor(private firebaseService: FirebaseService) {
    firebaseService.initFirebaseAuth(this.authStateObserver);
    console.log(document.getElementById(''))
  }

  signIn() {
    this.firebaseService.signIn();
  }

  signOut() {
    this.firebaseService.signOut();
  }

  authStateObserver(user) {
    console.log('auth state observer');
    const signInButton: HTMLElement = document.getElementById('sign-in');
    const signOutButton: HTMLElement = document.getElementById('sign-out');
    const userPicElement: HTMLElement = document.getElementById('user-pic');
    const userNameElement: HTMLElement = document.getElementById('user-name');
    var profilePic;

    if (user) {
      console.log('user is signed in');
      // Get the signed-in user's profile pic and name.
      let profilePicUrl = this.firebaseService.getProfilePicUrl();
      let userName = this.firebaseService.getUserName();
      // let profilePicUrl = this.getProfilePicUrl();
      // let userName = this.getUserName();
  
      // Set the user's profile pic and name.
      userPicElement.style.backgroundImage = 'url(' + this.firebaseService.addSizeToGoogleProfilePic(profilePicUrl) + ')';
      userNameElement.textContent = userName;
      // document.getElementById('user-pic').style.backgroundImage = 'url(' + this.firebaseService.addSizeToGoogleProfilePic(profilePicUrl) + ')';
      // document.getElementById('user-name').textContent = userName;
  
      // // Show user's profile and sign-out button.
      userNameElement.removeAttribute('hidden');
      // document.getElementById('user-name').removeAttribute('hidden');
      userPicElement.removeAttribute('hidden');
      // document.getElementById('user-pic').removeAttribute('hidden');
      signOutButton.removeAttribute('hidden');
      // document.getElementById('sign-out').removeAttribute('hidden');
  
      // // Hide sign-in button.
      signInButton.setAttribute('hidden', 'true');
      // document.getElementById('sign-in').setAttribute('hidden', 'true');
  
      // We save the Firebase Messaging Device token and enable notifications.
      this.firebaseService.saveMessagingDeviceToken();
    } else {
      console.log('user is not current signed in')
      // Hide user's profile and sign-out button.
      userNameElement.setAttribute('hidden', 'true');
      userPicElement.setAttribute('hidden', 'true');
      signOutButton.setAttribute('hidden', 'true');
      // document.getElementById('user-name').setAttribute('hidden', 'true');
      // document.getElementById('user-pic').setAttribute('hidden', 'true');
      // document.getElementById('sign-out').setAttribute('hidden', 'true');
  
      // Show sign-in button.
      signInButton.removeAttribute('hidden')
      // document.getElementById('sign-in').removeAttribute('hidden');
    }
  }
}
