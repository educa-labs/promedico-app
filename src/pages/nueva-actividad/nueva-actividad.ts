import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
// Importar Providers
import { Auth } from '../../providers/auth';
import { ActividadesProvider } from '../../providers/actividades-provider';
// Importar otras paginas
import { Page2 } from '../page2/page2';

@Component({
	selector: 'page-nueva-actividad',
	templateUrl: 'nueva-actividad.html',
	providers: [ActividadesProvider]
})

export class NuevaActividadPage {
	/* NuevaActividad: Pagina para que un usuario agregue una actividad */

	// Credenciales para agregar actividades
	credenciales: any;
	// Tipos de la actividad
	tipos: any;
	// Tags de las actividades
	tags: any;
	// Data al recibir al intentar agregar actividad
	data: any;
	// Mostrar alerta para 
	showAlertMessage: any = true;
	

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private auth: Auth, 
		public actividades_provider: ActividadesProvider,
		public loading: LoadingController,
		private alertCtrl: AlertController) {

			this.credenciales = { 
				token: this.auth.getUserInfo().token, 
				fecha: '', 
				titulo: '', 
				tipo: '', 
				tags: [], 
				reflexion: '' 
			}
			
			// Cargar los tipos y tags de actividad
			this.getTiposYTags();

	}

	public event = {
		/* Funcion para setear la fecha */
		fecha: '2017-01-01'
	}

	public nuevaActividad() {
		/* nuevaActividad: funcion para enviar los datos y crear la actividad */
		// No mostrar alerta de irse
		this.showAlertMessage = false;
		// Llamar a la funcion de crear actividad
		this.actividades_provider.nuevaActividad(this.credenciales)
			.then(data => {
				this.data = data
			})
		// Convertir la pagina de actividades en la pagina Root
		this.navCtrl.setRoot(Page2)  
	}

	getTiposYTags() {
		/* getTiposYTags: funcion para recibir los tipos y los tags de las actividades
		se guardan en sus respectivas variables */
		this.actividades_provider.getTags()
			.then(data => {
				this.tags = data
			})

		this.actividades_provider.getTipos()
			.then(data => {
				this.tipos = data
			})
	}

	agregarTag(p) {
		/* agregarTag: al seleccionar un tag se agrega a una lista con los tags seleccionados
		en credenciales.tags para después al crear actividad se envíe la lista */

		// Seleccionar o deseleccionar tag
		p.pico = !p.pico;
		// Si la lista está vacía
		if (this.credenciales.tags.length == 0) {
			// Agregar primer item a la lista
			this.credenciales.tags.push(p.id)
		}
		// Si la lista tiene elementos
		else {
			if (p.pico == false) {
				// Agregar el id del tag a la lista
				this.credenciales.tags.push(p.id)
			}
			// Recorrer lista
			for (let i in this.credenciales.tags) {
				// Si el item recorrido es igual al id que se selecciono
				if (this.credenciales.tags[i] === p.id && p.pico == true) {
					// Borrar elemento de la lista
					this.credenciales.tags.splice(i, 1)
				}
			}
		}
		/* Para imprimir la lista 
		console.log(this.credenciales.tags) */
	}

	ionViewCanLeave() {
		/* ionViewCanLeave: funcion interna de navCtrl de Ionic que permite
		decidir si se puede salir de la pantalla actual o no. */

		// Si la variable showAlertMessage es true, muestra una alerta si se
		// desea realmente salir de la pagina actual o no
		if(this.showAlertMessage) {
			// Crea un popup con una alerta
			let alertPopup = this.alertCtrl.create({
				// Titulo del popup
				title: 'Salir sin guardar',
				// Mensaje del popup
				message: "¿Estás seguro que deseas salir sin guardar la actividad actual?",
				// Botones del popup
				buttons: [{
						text: 'Salir',
						// Que ocurre cuando se apreta este boton
						handler: () => {
							// Se cierra el popup
							alertPopup.dismiss()
								// Despues de cerrar el popup
								.then(() => {
									// Llamar a la funcion salir de la pantalla
									this.exitPage();
							});         
						}
					},
					{
						text: 'Quedarse',
						// Que ocurre al seleccionar el boton
						handler: () => {}
					}]
			});

			// Mostrar popup en pantalla
			alertPopup.present();
			// Retornar false para que no se salga de la pantalla actual
			return false;
		}
	}

	private exitPage() {
		/* exitPage: funcion privada para salir de la pagina */
		// Se vuelve falsa la alerta de popup
		this.showAlertMessage = false;
		// Se cierra la ventana
		this.navCtrl.pop();
	}
}