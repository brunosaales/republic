import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


import { DespesaPage } from '../pages/despesa/despesa';
import { AcomodacaoPage } from '../pages/acomodacao/acomodacao';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { ContaPage } from '../pages/conta/conta';
import { InformacaoAdicionalPage } from '../pages/informacao-adicional/informacao-adicional';
import { LoginPage } from '../pages/login/login';
import { MoradiaPage } from '../pages/moradia/moradia';
import { MoradiaInformacaoPage } from '../pages/moradia-informacao/moradia-informacao';
import { MoradiaFotosPage } from '../pages/moradia-fotos/moradia-fotos';
import { ChatPage } from '../pages/chat/chat';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../providers/auth/auth-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  displayName: string;
  imgUrl: string;

  pages: Array<{title: string, component: any}>;


  constructor(
    public events: Events,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    afAuth: AngularFireAuth,
    private authService: AuthService,
 ) {

   this.events.subscribe('userloggedin', (() => {
     console.log('event received');
   }));



    const authObserver = afAuth.authState.subscribe(user => {
      this.displayName = '';
      this.imgUrl = '';
      if (user) {
        this.rootPage = MoradiaPage;
        this.displayName = user.displayName;
        this.imgUrl = user.photoURL;
        authObserver.unsubscribe();
      } else {
        this.rootPage = SigninPage;
        authObserver.unsubscribe();
      }
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Minha República', component: LoginPage},
      { title: 'Cadastrar República', component: CadastroPage},
      { title: 'Procurar Moradia', component: MoradiaPage },
      { title: 'Minha Conta', component: ContaPage },
      { title: 'Conversas', component: ChatPage }
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut() {
    this.authService.signOut()
      .then(() => {
        this.nav.setRoot(SigninPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
