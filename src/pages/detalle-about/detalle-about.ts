import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detalle-about',
  templateUrl: 'detalle-about.html'
})
export class DetalleAboutPage {

	tarjetaseleccionada: any;

  	constructor(public navCtrl: NavController, public navParams: NavParams) {
  		this.tarjetaseleccionada = navParams.get('tarjetas')
  	}

  

}
