import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';


import { HomePage } from '../home/home';

import firebase from 'firebase';

@Component({
  selector: 'page-informacao-adicional',
  templateUrl: 'informacao-adicional.html'
})
export class InformacaoAdicionalPage {

  moradias: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFireDatabase, private camera: Camera, alertCtrl: AlertController, public afAuth: AngularFireAuth) {
    this.moradias = af.list('/moradias');
    //this.moradias = af.list('/moradias/' + this.afAuth.auth.currentUser.uid);
    this.alertCtrl = alertCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformacaoAdicionalPage');
  }

  nextStep(nomeRepublica, celular) {

    let objeto4 = {
      nomeRepublica: nomeRepublica,
      celular: celular
    };

    var mergedObj = Object.assign({}, this.navParams.data, objeto4);

    console.log(mergedObj);
    //salvar o objeto completo
    this.moradias.push(mergedObj);
    //this.moradias[this.afAuth.auth.currentUser.uid].push(mergedObj);
    //this.upload();
    this.navCtrl.push(HomePage);
  };

  captureDataUrl: string;
  alertCtrl: AlertController;

  capture() {
      const cameraOptions: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      };

      this.camera.getPicture(cameraOptions).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
      });
    }

    upload() {
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      // Do something here when the data is succesfully uploaded!
      this.showSuccesfulUploadAlert();
    });

  }

  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();

    // clear the previous photo data in the variable
    this.captureDataUrl = "";
  }

  voltar(){
    this.navCtrl.pop();
  }

}
