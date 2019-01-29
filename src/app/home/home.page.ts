import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  signedIn: boolean;
  currentUser: any;
  
  constructor(private firebaseService: FirebaseService) {
    firebaseService.initFirebaseAuth(this.authStateObserver);
  }

  signIn() {
    this.firebaseService.signIn();
  }

  signOut() {
    this.firebaseService.signOut();
  }

  authStateObserver(user) {
    console.log('auth state observer');
  
    const userPicElement: HTMLElement = document.getElementById('user-pic');
    const userNameElement: HTMLElement = document.getElementById('user-name');;

    if (user) {
      this.signedIn = true;
      this.currentUser = user;    
      
      // Get the signed-in user's profile pic and name.
      // let profilePicUrl = this.firebaseService.getProfilePicUrl();
      let profilePicUrl = user.photoURL;
      // let userName = this.firebaseService.getUserName();
      let userName = user.displayName;
  
      // Set the user's profile pic and name.
      // userPicElement.style.backgroundImage = 'url(' + this.firebaseService.addSizeToGoogleProfilePic(profilePicUrl) + ')';
      // userNameElement.textContent = userName;
  
      // We save the Firebase Messaging Device token and enable notifications.
      // this.firebaseService.saveMessagingDeviceToken();
    } else {
      this.signedIn = false;
      console.log('user is not current signed in')

      // Show sign-in button.
    }
    console.log('current user -> ', this.currentUser.displayName);
    console.log('current signed in bool state -> ', this.signedIn)
  }
}
