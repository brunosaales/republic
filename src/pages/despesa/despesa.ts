import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { InformacaoAdicionalPage } from '../informacao-adicional/informacao-adicional';

import {Utils} from "../../app/utils";

@Component({
  selector: 'page-despesa',
  templateUrl: 'despesa.html'
})
export class DespesaPage {

  moradias: FirebaseListObservable<any>;

  amount: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFireDatabase, private utils: Utils) {
    this.moradias = af.list('/moradias');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DespesaPage');
  }

  nextStep(despesa) {

    let objeto3 = {
      despesa: despesa
    };

    var mergedObj = Object.assign({}, this.navParams.data, objeto3);

    console.log(mergedObj);
    this.navCtrl.push(InformacaoAdicionalPage, mergedObj);
  };

  voltar(){
    this.navCtrl.pop();
  }

  amountChange() {
    this.amount = this.utils.detectAmount(this.amount);
  }

}
