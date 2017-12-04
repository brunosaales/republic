import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, MenuController, Events } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { HomePage } from '../home/home';
import { MoradiaPage } from '../moradia/moradia';
import { SignupPage } from '../signup/signup';
import { SigninWithEmailPage } from '../signinwithemail/signinwithemail';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public events: Events,
    private menu: MenuController,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService) {
  }

  // ionViewDidEnter() {
  //   this.menu.swipeEnable(false, 'menu');
  // }

  createAccount() {
    this.navCtrl.push(SignupPage);
  }

  signInWithEmailPage() {
    this.navCtrl.push(SigninWithEmailPage);
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then(() => {
        this.navCtrl.setRoot(MoradiaPage);
      })
      .catch((error) => {
        this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
          .present();
      });
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then(() => {
        //this.events.publish('displayName:changed', this.displayName);
        this.navCtrl.setRoot(MoradiaPage);
      })
      .catch((error) => {
        this.toastCtrl.create({ duration: 3000, position: 'bottom', message: 'Erro ao efetuar o login' })
          .present();
      });
  }

}
