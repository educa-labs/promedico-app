import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  isRound: boolean = true;
  isOutline: boolean = true;
  pages: Array<{title: string, component: any, color: string, isOutline: boolean}>;

  // Credenciales para agregar actividades
  credenciales: any;
  titulo: string;
  tipos: any;
  reflexion: string;

  data: any;
  tags: any;
  tags_clickeados: Array<{}>;
  fecha_actual: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth, public actividades_provider: ActividadesProvider) {
    this.titulo = '';
    this.fecha_actual = '';
    this.credenciales = { token: this.auth.getUserInfo().token, fecha: '', titulo: '', tipo: '', tags: [], reflexion: '' }
    this.getTipos();
    this.getTags();

  	/* this.pages = [
      { title: 'Seguridad y calidad', component: '', color: 'seguridad', isOutline: true },
      { title: 'Manteniendo la confianza', component: '', color: 'confianza', isOutline: true },
      { title: 'Conocimiento, habilidades' , component: '', color: 'conocimiento', isOutline: true },
      { title: 'Comunicación, trabajo en equipo', component: '', color: 'comunicacion', isOutline: true }
    ]; */

  }

  public event = {
    fecha: '2017-01-01'
  }

  itemTapped(event, item) {
	  item.isOutline = !item.isOutline
  }

  public nuevaActividad() {
    this.actividades_provider.nuevaActividad(this.credenciales)
      .then(data => {
        this.data = data
      })

    this.navCtrl.setRoot(Page2)  


  }

  getTipos() {
    this.actividades_provider.getTipos()
      .then(data => {
        this.tipos = data;
      })
  }

  getTags() {
    this.actividades_provider.getTags()
      .then(data => {
        this.tags = data;
        console.log(this.tags)
      })
  }

  agregarTag(tag_id, checked) {
    alert(checked)
    this.credenciales.tags.push(tag_id)
    alert(this.credenciales.tags)
    
  }


}
