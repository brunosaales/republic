import { NgModule, Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import * as firebase from 'firebase/app';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user: Observable<firebase.User>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angularFireAuth: AngularFireAuth, private facebook: Facebook, private googlePlus: GooglePlus) {
    // this.user = angularFireAuth.authState;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signInWithFacebook() {
    return this.facebook.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        return this.angularFireAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
      })
  }

  signInWithGoogle() {
    return this.googlePlus.login({
      'webClientId': '80897062909-hmkso9rioa0ne4jv77mppu4niqvbphjq.apps.googleusercontent.com',
      'offline': true
    })
      .then(res => {
        return this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then((user: firebase.User) => {
            // atualizando o profile do usuario
            return user.updateProfile({ displayName: res.displayName, photoURL: res.imageUrl });
          });
      });
  }

  signOut() {
    if (this.angularFireAuth.auth.currentUser.providerData.length) {
      for (var i = 0; i < this.angularFireAuth.auth.currentUser.providerData.length; i++) {
        var provider = this.angularFireAuth.auth.currentUser.providerData[i];

         if (provider.providerId == firebase.auth.FacebookAuthProvider.PROVIDER_ID) {
          return this.facebook.logout()
            .then(() => {
              return this.signOutFirebase();
            })
        }
      }
    }

    return this.signOutFirebase();
  }

  private signOutFirebase() {
    return this.angularFireAuth.auth.signOut();
  }


}
