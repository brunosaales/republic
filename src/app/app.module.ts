import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { AuthService } from '../providers/auth/auth-service'

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SigninWithEmailPage } from '../pages/signinwithemail/signinwithemail';
import { SignupPage } from '../pages/signup/signup';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';


import { MyApp } from './app.component';
import { Utils } from './utils';
import { AcomodacaoPage } from '../pages/acomodacao/acomodacao';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { ChatPage } from '../pages/chat/chat';
import { ContaPage } from '../pages/conta/conta';
import { DespesaPage } from '../pages/despesa/despesa';
import { InformacaoAdicionalPage } from '../pages/informacao-adicional/informacao-adicional';
import { LoginPage } from '../pages/login/login';
import { MoradiaPage } from '../pages/moradia/moradia';
import { MoradiaInformacaoPage } from '../pages/moradia-informacao/moradia-informacao';
import { MoradiaFotosPage } from '../pages/moradia-fotos/moradia-fotos';


// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


// Import the Camera Module
import { Camera } from '@ionic-native/camera';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCHsHND6QtqcsjJ9Oj14h7K26Cw8FD4RDs",
  authDomain: "republic-1493133364527.firebaseapp.com",
  databaseURL: "https://republic-1493133364527.firebaseio.com",
  projectId: "republic-1493133364527",
  storageBucket: "republic-1493133364527.appspot.com",
  messagingSenderId: "80897062909"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SigninWithEmailPage,
    SignupPage,
    ResetpasswordPage,
    AcomodacaoPage,
    CadastroPage,
    ChatPage,
    ContaPage,
    DespesaPage,
    InformacaoAdicionalPage,
    LoginPage,
    MoradiaPage,
    MoradiaInformacaoPage,
    MoradiaFotosPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SigninWithEmailPage,
    SignupPage,
    ResetpasswordPage,
    AcomodacaoPage,
    CadastroPage,
    ChatPage,
    ContaPage,
    DespesaPage,
    InformacaoAdicionalPage,
    LoginPage,
    MoradiaPage,
    MoradiaInformacaoPage,
    MoradiaFotosPage,
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    Camera,
    ScreenOrientation,
    Facebook,
    GooglePlus,
    AuthService,
    Utils,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
