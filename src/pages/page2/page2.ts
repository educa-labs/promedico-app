import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// Importar Pagina de Detalle
import { DetallePage } from '../detalle/detalle';
import { NuevaActividadPage } from '../nueva-actividad/nueva-actividad'
// Importar Provider
import { ActividadesProvider } from '../../providers/actividades-provider';
import { Auth } from '../../providers/auth';

@Component({
	selector: 'page-page2',
	templateUrl: 'page2.html',
	providers: [ActividadesProvider]
})
export class Page2 {
	/* Pagina de actividades: se muestra una lista de las actividades del usuario
	actual. Tiene navegacion el con detalle de cada actividad */

	// Actividad seleccionada
	selectedItem: any;
	// Actividades
	actividades: any;
	token: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public actividades_provider: ActividadesProvider, 
		private auth: Auth) {
			// Configurar para navegacion
			this.selectedItem = navParams.get('item');
			// Token del usuario actual
			this.token = {token: this.auth.getUserInfo().token}
			// Recibir información de las actividades
			this.cargarActividades();
	}

	itemTapped(event, item) {
		/* itemTapped: al apretar una actividad se pushea la pagina
		de detalle y se pasa la informacion */
		this.navCtrl.push(DetallePage, {
			// Pasar información a la nueva página
			item: item
		});
	}

	agregarActividad(event) {
		/* agregarActividad: al apretar el FAB se pushea la pagina */
		this.navCtrl.push(NuevaActividadPage,{});
	}

	cargarActividades() {
		/* cargarActividades: funcion para cargar las actividades del 
		usuario actual */
		this.actividades_provider.getActividades(this.token)
			.then(data => {
				// Guardar la informacion en la variable actuvidades
				this.actividades = data
			})
	}

	doRefresh(refresher) {
		/* doRefresh: funcion para refrescar el contenido de las paginas
		convierte la pagina Root en la pagina de actividades */
		this.navCtrl.setRoot(Page2)
	}
}