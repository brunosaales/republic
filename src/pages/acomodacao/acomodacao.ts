import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { DespesaPage } from '../despesa/despesa';

@Component({
  selector: 'page-acomodacao',
  templateUrl: 'acomodacao.html'
})
export class AcomodacaoPage {

  moradias: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFireDatabase) {
    this.moradias = af.list('/moradias');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcomodacaoPage');
    console.log(this.navParams);
    // console.log(this.navParams.get('numero'));
  }

  nextStep(quartoMobiliado, garagem, fumantes, animaisEstimacao, tipoRepublica) {

    if (quartoMobiliado == undefined) {
      quartoMobiliado = false;
    }
    if (garagem == undefined) {
      garagem = false;
    }
    if (fumantes == undefined) {
      fumantes = false;
    }
    if (animaisEstimacao == undefined) {
      animaisEstimacao = false;
    }

    let objeto2 = {
      quartoMobiliado: quartoMobiliado,
      garagem: garagem,
      fumantes: fumantes,
      animaisEstimacao: animaisEstimacao,
      tipoRepublica: tipoRepublica
    };

    var mergedObj = Object.assign({}, this.navParams.data, objeto2);

    console.log(mergedObj);
    this.navCtrl.push(DespesaPage, mergedObj);
  };

  voltar(){
    this.navCtrl.pop();
  }

}
