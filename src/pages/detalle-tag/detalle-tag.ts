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

	tagSeleccionado: any;

	tag_id: any;
	credenciales: any;

	actividades: any;

  	constructor(public navCtrl: NavController, public navParams: NavParams, public actividades_provider: ActividadesProvider, public auth: Auth) {
  		this.tagSeleccionado = navParams.get('actividades_1')
  		// Credenciales para enviar POST a la api y recibir las actividades
  		this.credenciales = { token: this.auth.getUserInfo().token, tag: this.tagSeleccionado.id }
  		this.getActividades();
  	}

  	getActividades() {
  		this.actividades_provider.getActividadesByTag(this.credenciales)
  			.then(data => {
  				this.actividades = data;
  			})
  	}



  	verActividad(event, item) {
    	this.navCtrl.push(DetallePage, {
      	item: item
    	})
  	}


}
