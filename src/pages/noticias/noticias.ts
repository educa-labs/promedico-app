import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Importar pagina de detalle de noticias
import { DetalleNoticiaPage } from '../detalle-noticia/detalle-noticia';

// Importar Providers
import { ActividadesProvider } from '../../providers/actividades-provider';


@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html',
  providers: [ActividadesProvider]
})


export class NoticiasPage {

    // Elemento para navegacion entre noticias
    noticiaSeleccionada: any;
    persona : any;
    noticias: Array<{id: any, foto: any, title: string, fecha: any, texto: string, favorito: boolean}>

  constructor(public navCtrl: NavController, public navParams: NavParams, public ActividadesProvider: ActividadesProvider) {
    // Navegación entre noticias
  	this.noticiaSeleccionada = navParams.get('noticias');

  	this.noticias = [
  		{ id: 1, title: "Primera Noticia", foto: "assets/img/card1.jpg", fecha: "", texto: "Descripcion de la noticia, texto más o menos largo, pero se limitan los caracteres", favorito: true },
  		{ id: 2, title: "Segunda Noticia", foto: "assets/img/card2.jpg", fecha: "", texto: "Descripcion de la noticia, texto más o menos largo, pero se limitan los caracteres", favorito: true },
  		{ id: 3, title: "Tercera Noticia", foto: "assets/img/card3.jpg", fecha: "", texto: "Descripcion de la noticia, texto más o menos largo, pero se limitan los caracteres", favorito: false },
  		{ id: 4, title: "Cuarta Noticia", foto: "assets/img/card1.jpg", fecha: "", texto: "Descripcion de la noticia, texto más o menos largo, pero se limitan los caracteres", favorito: true },
  		{ id: 5, title: "Quinta Noticia", foto: "assets/img/card3.jpg", fecha: "", texto: "Descripcion de la noticia, texto más o menos largo, pero se limitan los caracteres", favorito: false }
   	];

   // this.cargarNoticias();

  }

  // Nagegar entre noticias y noticia sola
  verNoticia(event, item) {
  	this.navCtrl.push(DetalleNoticiaPage, {
      noticias: item
    });
  };

  // Al agregar a favoritos
  agregarFavoritos(event, item) {
	  item.favorito = !item.favorito
  };

  /*cargarNoticias(){
    this.ActividadesProvider.load()
    .then(data => {
      this.persona = data;
    })
  };*/



}
