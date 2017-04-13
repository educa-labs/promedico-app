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
	/* Registro: pagina para registrarse dentro de la aplicación. Tiene navegacion
	con la pagina de login */

	// Variable para ver si el registro fue exitoso
	createSuccess = false;
	// Credenciales para el registro
	registerCredentials = {nombre: '', ocupacion: '', password: '', mail: '', clinica: '', departamento: ''};
	// Informacion clinicas y departamento
	clinicas: any;
	deptos: any;

	constructor(
		private nav: NavController, 
		private auth: Auth, 
		public http: Http, 
		public loading: LoadingController) {
			// Recibir informacion de las clinicas
			this.getclinicas()
	}

	public register() {
		/* Register: funcion para registrarse. Manda las credenciales a la funcion 
		de Auth y revisa si el estado fue exitoso o no */

		// Llamar a la funcion auth.register y manda las credenciales de registro
		this.auth.register(this.registerCredentials).subscribe(success => {
			// Si el registro fue exitoso
			if (success){
				// Se cambia el valor de la variable createSuccess
				this.createSuccess = true;
				alert("Creado con éxito");
				this.nav.pop();
			}
			// Si el registro no fue exitoso
			else {
				alert("Error al crear cuenta");
			}
		},

		// Si es que ocurre un error en auth.register
		error => {
			// Mostrar el error
			alert(error);
		});
	}

	getclinicas() {
		/* getClinicas: funcion para recibir la informacion de las clinicas
		y guardarlas en la variable clinicas */
		this.auth.getClinicasInfo()
			.then(data => {
				// Guardar la informacion recibida en la variable clinicas
				this.clinicas = data
			})
	}

	getDeptos(clinica_id) {
		/* getDeptos: funcion para cargar los deptos de una clinica. Recibe el 
		id de la clinica y llama a la funcion getDeptosInfo y retorna los deptos */
		this.auth.getDeptosInfo(clinica_id)
			.then(data => {
				// Guardar la informacion recibida en la variable deptos
				this.deptos = data
			});
	}
}