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
      this.auth.getClinicasInfo()
        .then(data => {
          this.clinicas = data
        })
    }

    getDeptos(clinica_id) {
      this.auth.getDeptosInfo(clinica_id)
        .then(data => {
          this.deptos = data
        });
    }
}
