import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { ChatPage } from '../chat/chat';
import { MoradiaFotosPage } from '../moradia-fotos/moradia-fotos';

declare var google;

@Component({
  selector: 'page-moradia-informacao',
  templateUrl: 'moradia-informacao.html'
})
export class MoradiaInformacaoPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    this.loadMap();
    console.log('ionViewDidLoad MoradiaInformacaoPage');
  }

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });

  }

  addMarker(){

  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });

  let content = "<h4>Information!</h4>";

  this.addInfoWindow(marker, content);

}

addInfoWindow(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });

}

abrirFotos() {
  this.navCtrl.push(MoradiaFotosPage);
}

abrirChat() {
  this.navCtrl.push(ChatPage);
}

ligar(celular){
    celular = encodeURIComponent(celular);
     window.location.href = "tel:"+celular;
    }

}
