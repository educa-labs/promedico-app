import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Importar paginas
import { DetalleAboutPage } from '../detalle-about/detalle-about';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

	tarjetaseleccionada: any;
	tarjetas: Array<{id: number, title: string, img: string, detalle: any}>;
	item: any;


  	constructor(public navCtrl: NavController, public navParams: NavParams) {

  		this.tarjetaseleccionada = navParams.get('tarjetas')

  		this.tarjetas = [
  						{id: 1, title: "Planeando tu progreso médico continuo", img: "assets/img/card1.jpg", detalle: [
                          "1.Considera todo tipo de aprendizajes - desde revistas y charlas hasta discusiones con colegas.", 
                           "2.No te enfoques en aprendizaje médico únicamente - también piensa en destrezas generales, como comunicación, administración e investigación.", 
                           "3.0btén ayuda de colegas y pacientes para determinar en qué áreas debes enfocarte.",
                           "4.Planear y evaluar tu aprendizaje debe ser algo continuo",
                           "5.No todo aprendizaje es planeado - oportunidades informales de mejorar pueden aparecer de forma espontánea día a día."]},
  						
              {id: 2, title: "Reflexionando sobre tu aprendizaje", img:"assets/img/card2.jpg", detalle: [
                           "1.Reflexiona sobre todos los aspectos de tu trabajo profesional de forma retroalimentativa y considerando evidencia empírica (críticas, cumplidos, etc).",
                           "2.Reflexiona sobre lo que has aprendido y úsalo par mejorar tu rendimiento.",
                           "3.Busca añadir valor a tu servicio. Aprende de los cambios efectuados por tu aprendizaje y mira hacia atrás para ver si han marcado la diferencia con el tiempo.",
                           "4.Reflexiona sobre cómo el aprendizaje informal puede ser utilizado para mejorar tus prácticas.",
                           "5.No es necesario escribir demasiado para dejar evidencia de que has reflexionado sobre tu práctica profesional."]},
  						
              {id: 3, title: "Evaluando tu aprendizaje", img:"assets/img/card3.jpg", detalle: [
                           "1.Debes evaluar tu aprendizaje durante el año, no esperes hasta el último minuto.",
                           "2.Evalúa de forma crítica si tus actividades han ayudado a mejorar la calidad de tu cuidado con tus pacientes.",
                           "3.Debes reflexionar sobre si tus actividades te han ayudado a alcanzar tus metas y, en caso de no ser así, si necesitas un aprendizaje más profundo."]},

              {id: 4, title: "Preparándote para una autoevaluación", img:"assets/img/card4.jpg", detalle: [
                           "1.Para revalidar, asegúrate de que tu autoevaluación anual cubre la totalidad de tu práctica.",
                           "2.Muestra que tu progreso médico continuo ha sido suficiente para mantenerte actualizado en tu disciplina."]}];
  	}


  	itemTapped(event, item) {
     	// Pushear a la pagina con el item
    	this.navCtrl.push(DetalleAboutPage, {
      		tarjetas: item
    	});
  	}
}
