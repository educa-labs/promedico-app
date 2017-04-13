import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detalle-noticia',
  templateUrl: 'detalle-noticia.html'
})
export class DetalleNoticiaPage {
	/* DetalleNoticia: Pagina del detalle de una noticia seleccionada */
	
	// Navecacion entre noticias
	noticiaSeleccionada: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams) {
			// Configurar navegacion entre noticias
			this.noticiaSeleccionada = navParams.get('noticias')
	}
}