import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// Importar Providers
import { ActividadesProvider } from '../../providers/actividades-provider';
import { Auth } from '../../providers/auth';
// Importar otras paginas
import { DetallePage } from '../detalle/detalle';

@Component({
	selector: 'page-detalle-tag',
	templateUrl: 'detalle-tag.html',
	providers: [ActividadesProvider]
})

export class DetalleTagPage {
	/* DetalleTag: Pagina de detalle de cada tag. Se muestra la información del tag 
	seleccionado y las actividades que contienen ese tag */

	// Navegacion
	tagSeleccionado: any;
	// Obtener el id del tag seleccionado
	tag_id: any;
	// Credenciales para enviar
	credenciales: any;
	// Actividades del tag seleccionado
	actividades: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public actividades_provider: ActividadesProvider, 
		public auth: Auth) {
			// Configurar navegacion
			this.tagSeleccionado = navParams.get('actividades_1')
			// Credenciales para enviar POST a la api y recibir las actividades
			this.credenciales = { token: this.auth.getUserInfo().token, tag: this.tagSeleccionado.id }
			// Recibir las actividades del tag seleccionado
			this.getActividades();
	}

	getActividades() {
		/* getActividades: llama a la funcion getActividadesByTag del provider de 
		acividades y manda las credenciales para reibir las actividades del tag */
		this.actividades_provider.getActividadesByTag(this.credenciales)
			.then(data => {
				this.actividades = data;
			})
	}

	verActividad(event, item) {
		/* verActividad: funcion al apretar una actividad dentro de un tag. Pushea
		la pagina de detalle de la actividad y les pasa la info de la actividad */
		this.navCtrl.push(DetallePage, {
			// Pasar información de la actividad seleccionada
			item: item
		})
	}
}