import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


import { MoradiaInformacaoPage} from '../moradia-informacao/moradia-informacao'
import { CadastroPage} from '../cadastro/cadastro'


@Component({
  selector: 'page-moradia',
  templateUrl: 'moradia.html'
})
export class MoradiaPage {

  moradias: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.moradias = af.list('/moradias');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoradiaPage');
  }

  abrirPagina() {
    this.navCtrl.push(MoradiaInformacaoPage);
  }

  cadastrarRepublica() {
    this.navCtrl.push(CadastroPage);
  }

  checkMoradia(moradia) {
    this.abrirPagina();
    //return moradia.uid == this.afAuth.auth.currentUser.uid;
}

}


// pensando bem mantem da forma que esta talvez vai ser mais facil usar o angular filter pra poder retornar
// as moradias de um usuario depois
// o que eu falei do filtro seria assim
// mandar em javascript puro tu adapta

// checkMoradia(moradia) {
//     return moradia.uid == this.afAuth.auth.currentUser.uid;
// }
//
// dai pra aplicar o filtro seria

// moradias.filter(checkMoradia);
