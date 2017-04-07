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

	selectedItem: any;
	credenciales: any;

  constructor(public navCtrl: NavController, private auth: Auth, public navParams: NavParams, public actividades_provider: ActividadesProvider) {
  	this.selectedItem = navParams.get('item');
  	this.credenciales = { token: this.auth.getUserInfo().token, id_actividad: this.selectedItem.id }

  }


  borrarActividad(){
  	this.actividades_provider.borrarActividad(this.credenciales)
  	this.navCtrl.pop()
    this.navCtrl.setRoot(Page2)
  }

}
