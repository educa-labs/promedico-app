import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, MenuController } from 'ionic-angular';

// Importar Providers
import { Auth } from '../../providers/auth';
import { Storage } from '@ionic/storage';

// Importar Paginas
import { RegisterPage } from '../register/register'
import { Page1 } from '../page1/page1';
 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

/* Pagina de Login */
export class LoginPage {

	loading: Loading;
	registerCredentials = {mail: '', password: ''};

	// Info Clinicas
	clinicas: any;

	constructor(private nav: NavController, private auth: Auth, 
				private loadingCtrl: LoadingController, 
				private menuCtrl: MenuController, public storage: Storage) {
		
		/* Guardar en el storage el usuario actual,
		si el usuario actual está guardado, la página 
		principal es Inicio y se habilita el menu */
		this.storage.get('user').then((val) => {
			if (val != null){
				this.auth.setUserInfo(val);	
				this.nav.setRoot(Page1);
				this.menuCtrl.enable(true);
			}			
		});

		// Deshabilitar Menu dentro del Login
		this.menuCtrl.enable(false);

	}

	// Navegación para página de registrarse
	public createAccount(){
		// Pushear y entrar en la página de Registro
		this.nav.push(RegisterPage);
	}

	// Funcion para Login
	public login(){
		// Mostrar cargando...
		this.auth.login(this.registerCredentials).subscribe(allowed => {
			// Si está aceptado
			if (allowed) {
					/* Cambiar la página Root a Inicio
					Habilitar menu y sacar cargando... */
					this.storage.set('user', this.auth.getUserInfo());
					this.nav.setRoot(Page1);
					this.menuCtrl.enable(true);
			}

			// Si no tiene acceso
			else {
				 this.loading = this.loadingCtrl.create({
					content: 'Cargando...'
				});
				this.loading.present();
				setTimeout(() => {
					alert("Acceso denegado...");
					console.log(this.auth.getUserInfo());
					this.loading.dismiss();
				}, 3000);
				/*this.loading.dismiss();*/
			}
		},
		error => {
			alert(error);
		});
	}

	// Funcion para mostrar Loading
	showLoading(){
		/* Crear login y mostrarlo */
		this.loading = this.loadingCtrl.create({
			content: 'Cargando...'
		});

		this.loading.present();
	}
}
