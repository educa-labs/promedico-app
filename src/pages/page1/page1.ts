import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

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

// Inicio
export class Page1 {

  // Datos del usuario
  usuario: string; 
  email: string;
  token: any;

  datos: any;

  tab1: any;
  tab2: any;
  tab3: any;

  credenciales_tab1: any;
  credenciales_tab2: any;
  credenciales_tab3: any;

  tagSeleccionado: any;
  actividades_1: Array<{id: any, title: string, color: string, detalle: string, puntaje: string}>;

	// Pestaña por defecto
	pet: string = "pag1";

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth, public actividades_provider: ActividadesProvider, public loading: LoadingController) {
    // Navegacion entre tags
    this.tagSeleccionado = navParams.get('actividades_1')

    // Pasar datos de usuario actual a datos
    this.usuario = this.auth.getUserInfo().name;
    this.email = this.auth.getUserInfo().email;  
    this.token = this.auth.getUserInfo().token;

    this.credenciales_tab1 = { token: this.auth.getUserInfo().token, modo: 0 }
    this.credenciales_tab2 = { token: this.auth.getUserInfo().token, modo: 1 }
    this.credenciales_tab3 = { token: this.auth.getUserInfo().token, modo: 2 }

    // Al abrir pantalla, se carga las 3 pestañas
    this.getTags();
 

  }

  itemTapped(event) {
    // Pushear a la misma pagina con el item
    this.navCtrl.push(NuevaActividadPage, {});
  }

  verTag(event, item) {
    this.navCtrl.push(DetalleTagPage, {
      actividades_1: item
    })
  }


  getTags() {
    let loader = this.loading.create({});
    loader.present()
    this.actividades_provider.getInfoTags(this.credenciales_tab1)
      .then(data => {
        this.tab1 = data;
      })

    this.actividades_provider.getInfoTags(this.credenciales_tab2)
      .then(data => {
        this.tab2 = data;
        loader.dismiss();

      })

    this.actividades_provider.getInfoTags(this.credenciales_tab3)
      .then(data => {
        this.tab3 = data;
      })
  }

  doRefresh(refresher) {
    this.navCtrl.setRoot(Page1)
  }




}
