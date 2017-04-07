import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';


// Importar providers
import { Auth } from '../../providers/auth';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})


export class RegisterPage {

	createSuccess = false;
	registerCredentials = {nombre: '', ocupacion: '', password: '', mail: '', clinica: '', departamento: ''};

  // Informacion clinicas y departamento
  clinicas: any;
  deptos: any;

  constructor(private nav: NavController, private auth: Auth, public http: Http, public loading: LoadingController) {
    
    // Recibir informacion de las clinicas
    this.getclinicas()

  }

  	public register() {
  		this.auth.register(this.registerCredentials).subscribe(success => {
  			if (success){
  				this.createSuccess = true;
  				alert("Creado con éxito: " + this.registerCredentials.mail + " " + this.registerCredentials.password);
          this.nav.pop();
  			}

  			else {
  				alert("Error al crear cuenta");
  			}
  		},

  		error => {
  			alert(error);
  		});
  	}


    getclinicas() {
      this.http.get('http://educalabs.cl:5000/getclinicas')
        .map(res => res.json())
        .subscribe( data => {
          let loader = this.loading.create({
            content: 'Recibiendo información...',
            duration: 2000
          });
          this.clinicas = data['clinicas'];
          loader.present();
          console.log(data['clinicas'])
        })
    }

    getDeptos(clinica_id) {
      this.http.get('http://educalabs.cl:5000/getdeptos/' + clinica_id)
        .map(res => res.json())
        .subscribe(data => {
          let loader = this.loading.create({
            content: 'Cargando departamentos...',
            duration: 1000
          });
          this.deptos = data["deptos"];
          loader.present()
          console.log(data["deptos"])
        })
    }
}
