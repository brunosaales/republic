import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


import { AcomodacaoPage } from '../acomodacao/acomodacao';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  moradias: FirebaseListObservable<any>;

  uid: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.moradias = af.list('/moradias');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
    console.log(this.afAuth.auth.currentUser.uid);


  }

  nextStep(cidade, endereco, numero, complemento) {
    let objeto = {
      cidade: cidade,
      endereco: endereco,
      numero: numero,
      complemento: complemento,
      uid: this.afAuth.auth.currentUser.uid,
      imgUrl: this.afAuth.auth.currentUser.photoURL
    };
    //this.moradias.push(objeto);
    console.log(objeto);
    this.navCtrl.push(AcomodacaoPage, objeto);
  };

  cancelar(){
    this.navCtrl.pop();
  }

}
