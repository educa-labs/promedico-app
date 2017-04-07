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

  // Actividad seleccionada
  selectedItem: any;

  items: any[];

  // Actividades
  actividades: Array<{id: any, title: string, detalle: string, fecha: any, tags: any}>;

  info: any;
  token: any;

  // Elementos para fecha
  d : any;
  dia: any;
  mes: any;
  year: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public actividades_provider: ActividadesProvider, private auth: Auth) {
    // Navegacion
    this.selectedItem = navParams.get('item');

    this.token = {token: this.auth.getUserInfo().token}

    // Elementos para fecha
    this.d = new Date();
    this.dia = this.d.getDate();
    this.mes = this.d.getMonth();
    this.year = this.d.getFullYear();


    this.cargarActividades();

    // Recibir información de las actividades
    this.actividades = [
      {id: 1, title: "Primera Charla", fecha: this.dia + "/" + this.mes + "/" + this.year, detalle : "Detalle de la charla número uno", tags: [{ title: 'Manteniendo la confianza', component: '', color: 'confianza' }, { title: 'Conocimiento, habilidades' , component: '', color: 'conocimiento' }, { title: 'Seguridad y calidad', component: '', color: 'seguridad' }]},
      {id: 2, title: "Segunda Charla", fecha: this.dia + "/" + this.mes + "/" + this.year, detalle : "Detalle de la charla número dos", tags: [{ title: 'Manteniendo la confianza', component: '', color: 'confianza' }, { title: 'Trabajo en equipo', component: '', color: 'comunicacion'}, { title: 'Seguridad y calidad', component: '', color: 'seguridad' }]},
      {id: 3, title: "Tercera Charla", fecha: this.dia + "/" + this.mes + "/" + this.year, detalle : "Detalle de la charla número tres", tags: [{ title: 'Trabajo en equipo', component: '', color: 'comunicacion' }, { title: 'Conocimiento, habilidades' , component: '', color: 'conocimiento' }]},
      {id: 4, title: "Cuarta Charla", fecha: this.dia + "/" + this.mes + "/" + this.year, detalle : "Detalle de la charla número cuatro", tags : [{ title: 'Trabajo en equipo', component: '', color: 'comunicacion'}, ]},
      {id: 5, title: "Quinta Charla", fecha: this.dia + "/" + this.mes + "/" + this.year, detalle : "Detalle de la charla número cinco", tags: [{ title: 'Trabajo en equipo', component: '', color: 'comunicacion'}, { title: 'Conocimiento, habilidades' , component: '', color: 'conocimiento' },{ title: 'Seguridad y calidad', component: '', color: 'seguridad' }]}

    ];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        text: 'Item ' + i,
        fecha: this.dia + "/" + this.mes + "/" + this.year,
        id: i
      });
    }
  }

  itemTapped(event, item) {
     // Pushear a la pagina con el item
    this.navCtrl.push(DetallePage, {
      item: item
    });
  }

  agregarActividad(event) {
    // Pushear a la pagina 
    this.navCtrl.push(NuevaActividadPage, {});
  }

  cargarActividades() {
    this.actividades_provider.getActividades(this.token)
      .then(data => {
        this.info = data
      })
  }

  doRefresh(refresher) {
    this.navCtrl.setRoot(Page2)
  }



}
