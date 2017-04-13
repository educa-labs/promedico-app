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

export class LoginPage {
	/* Login: Pagina principal de login de la aplicación */

	// Crear loading
	loading: Loading;
	// Credenciales para hacer login
	registerCredentials = {mail: '', password: ''};
	
	constructor(
		private nav: NavController, private auth: Auth, 
		private loadingCtrl: LoadingController, 
		private menuCtrl: MenuController, public storage: Storage) {
		
		/* Guardar en el storage local el usuario actual. Si el usuario ya está 
		guardado localmente, se convierte la página Root en Inicio y se habilita el menu */
		this.storage.get('user').then((val) => {
			// Si está 'user' guardado en el storage
			if (val != null) {
				// Setear el usuario actual con el valor que está guardado
				this.auth.setUserInfo(val);	
				// Convertir la pagina root en la página de inicio
				this.nav.setRoot(Page1);
				// Habilitar el menú principal
				this.menuCtrl.enable(true);
			}			
		});

		// Dentro del login se dehabilita el menu
		this.menuCtrl.enable(false);
	}

	public createAccount() {
		/* createAccount: Para la navegación entre la pagina de registro y login */
		this.nav.push(RegisterPage);
	}

	public login(){
		/* login: funcion para hacer login dentro de la aplicación. Llama a la funcion
		del provider Auth y si está permitido se cambia la página y habilita el menú, si 
		no está permitido se muestra una alerta */
		this.auth.login(this.registerCredentials).subscribe(allowed => {
			// Si está aceptado
			if (allowed) {
					// Guardar el usuario actual en el storage local
					this.storage.set('user', this.auth.getUserInfo());
					// Convertir la pagina de inicio en la pagin Root
					this.nav.setRoot(Page1);
					// Habilitar el menu principal
					this.menuCtrl.enable(true);
			}

			// Si no tiene acceso
			else {
				alert('Acceso denegado')
			}
		},
		// En el caso de recibir un error en la funcion del provider auth
		error => {
			alert(error);
		});
	}
}