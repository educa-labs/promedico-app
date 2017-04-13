import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// Importar providers
import { Auth } from '../../providers/auth';
import { ActividadesProvider } from '../../providers/actividades-provider';
// Importar otras paginas
import { Page2 } from '../page2/page2';

@Component({
	selector: 'page-detalle',
	templateUrl: 'detalle.html',
	providers: [ActividadesProvider]
})

export class DetallePage {
	/* Detalle: pagina de detalle de una actividad */

	// Datos para la navegacion
	selectedItem: any;
	// Credenciales para enviar, en el caso de borrar una actividad
	credenciales: any;

	constructor(public navCtrl: NavController, 
		private auth: Auth, 
		public navParams: NavParams, 
		public actividades_provider: ActividadesProvider) {
			
			// Configurar datos para la navegacion
			this.selectedItem = navParams.get('item');
			// Credenciales para borrar actividades
			this.credenciales = { token: this.auth.getUserInfo().token, id_actividad: this.selectedItem.id }

	}

	borrarActividad(){
		/* BorrarActividad: Manda token, id y todo. */
		this.actividades_provider.borrarActividad(this.credenciales)
		// Cierra el detalle de actividades
		this.navCtrl.pop()
		// Convierte en pagina Root a la list de las actividades
		this.navCtrl.setRoot(Page2)
	}
}