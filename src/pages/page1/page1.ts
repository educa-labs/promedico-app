import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
// Importar paginas necesarias
import { NuevaActividadPage } from '../nueva-actividad/nueva-actividad';
import { DetalleTagPage } from '../detalle-tag/detalle-tag';
// Importar Providers
import { Auth } from '../../providers/auth';
import { ActividadesProvider } from '../../providers/actividades-provider';

@Component({
	selector: 'page-page1',
	templateUrl: 'page1.html',
	providers: [ActividadesProvider]
})

export class Page1 {
	/* Pagina de inicio: se muestran los tags con los puntajes y metas. Al 
	apretar un tag se muestram las actividades de ese tag */

	// Datos del usuario
	usuario: string; 
	email: string;
	token: any;
	// Tags
	tags: any;
	// Credenciales
	credenciales: any;
	// Datos para navegacion
	tagSeleccionado: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, private auth: Auth, 
		public actividades_provider: ActividadesProvider, 
		public loading: LoadingController) {
		
			// Navegacion entre tags
			this.tagSeleccionado = navParams.get('actividades_1')
			// Configurar datos del usuario
			this.usuario = this.auth.getUserInfo().name;
			this.email = this.auth.getUserInfo().email;  
			this.token = this.auth.getUserInfo().token;
			// Credenciales para hacer POST 
			this.credenciales = { token: this.auth.getUserInfo().token, modo: 0 }
			// Cargar las tags
			this.getTags();
			// Cambiar el color de la barra de estado
			StatusBar.backgroundColorByHexString('#3b6ab5');
	}

	itemTapped(event) {
		/* itemTapped: al apretar boton de agregar nueva actividad.
		Pushear pagina de NuevaActividad */
		this.navCtrl.push(NuevaActividadPage, {});
	}

	verTag(event, item) {
		/* verTag: al apretar pushea la pagina de detalle de cada tag  */
		this.navCtrl.push(DetalleTagPage, {
			actividades_1: item
		})
	}

	getTags() {
		/* getTags: recibir los tags con los puntajes del usuario y metas 
		de los tags */
		this.actividades_provider.getInfoTags(this.credenciales)
			 .then(data => {
				this.tags = data;
			})
	}

	doRefresh(refresher) {
		/* doRefresh: convertir en pagina Root la pagina de inicio */
		this.navCtrl.setRoot(Page1)
	}
}