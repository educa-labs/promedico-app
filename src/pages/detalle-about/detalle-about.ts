import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-detalle-about',
	templateUrl: 'detalle-about.html'
})

export class DetalleAboutPage {
	/* Detalle de sobre nosotros */
	// Navegacion de entre pagina sobre nosotros
	tarjetaseleccionada: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams) {
			// Configurar navegacion
			this.tarjetaseleccionada = navParams.get('tarjetas')
	}
}