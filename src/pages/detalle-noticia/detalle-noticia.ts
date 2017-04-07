import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detalle-noticia',
  templateUrl: 'detalle-noticia.html'
})
export class DetalleNoticiaPage {

	// Navecacion entre noticias
	noticiaSeleccionada: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.noticiaSeleccionada = navParams.get('noticias')


  }


}
