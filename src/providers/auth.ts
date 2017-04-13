import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

export class User {
	/* Clase usuario. Tiene id, nombre, ocupación, email, clinica y token */
	
	// Datos basicos del usuario
	id: number;
	name: string;
	ocupacion: string;
	email: string;
	clinica: string;
	token: any;

	constructor(id: number, name: string, 
				ocupacion: string, email: string, 
				token: any, clinica: string) {
		this.id = id
		this.name = name ;
		this.email = email;
		this.token = token;
		this.ocupacion = ocupacion;
		this.clinica = clinica;
  	}
}


@Injectable()
export class Auth {
	/* Provider Auth para todo lo relacionado con autentificación dentro 
	de la aplicación. Mantiene los datos del usuario actual dentro del provider */
  
	// Usuario actual. Se mantienen dentro del provider de forma global
	currentUser: User;
	data: any;

	// Infomacion para las promesas
	clinicas: any;
	deptos: any;

	constructor(public http: Http, public loading: LoadingController) {}

	// Funciones del provider

	public login(credentials) {
		/* login: recibe las credenciales y hace un POST al Backend y recibe todos 
		los datos basicos del usuario */

		// Si no ingresa las credenciales
		if (credentials.email === null || credentials.password === null){
			return Observable.throw("Ingresa las credenciales");
		}

		// Si ingresan correctamente las credenciales
		else {
			
			// Retornar y crear el Observable
			return Observable.create(observer => {
				// Crear y agregar los headers para el POST
				let headers = new Headers();
				headers.append('Content-Type', undefined);

				this.http.post('http://api.promedico.cl/login', JSON.stringify(credentials), {headers: headers})
					.map(res => res.json())
					.subscribe(data => {
						// Crear loader
						let loader = this.loading.create({
							content: 'Cargando...'
						});
						// Mostrar loader en pantalla
						loader.present()
						// Guardar la info en una variable local
						this.data = data._body;
						/* Para imprimir la info recibida 
						console.log(data) */
						// Guardar los datos recibidos en el usuario actual
						this.currentUser = new User(0, data["nombre"], 
									data["ocupacion"], data["mail"], data["token"], data["clinica"])
						// Desaparece loader de la pantalla
						loader.dismiss()
						
						// Si el status es true, cambia de pagina
						observer.next(data["status"]);
						observer.complete();
				});
			})
		}
	}


	public register(credentials) {
		/* register: Funcion para registrarse. Recibe las credenciales y hace POST a la
		base de datos, recibe True o False. */
	
		// Si no ingresa las credenciales
		if (credentials.email === null || credentials.password === null){
			return Observable.throw("Por favor ingresa las credenciales");
		}

		// Si ingresa credenciales correctamente
		else {
			return Observable.create(observer => {
				// Crear y agregar headers para hacer POST
				let headers = new Headers();
				headers.append('Content-Type', undefined);

				this.http.post('http://api.promedico.cl/signup', JSON.stringify(credentials), {headers: headers})
					.map(res => res.json())
					.subscribe(data => {
						// Crear loader
						let loader = this.loading.create({
							content: 'Cargando...'
						});
						// Mostrar loader en la pantalla
						loader.present()
						// Guardar la data recibida en una variable local
						this.data = data._body;
						/* Imprimir data recibida
						console.log(data) */
						// Desaparece loader de pantalla
						loader.dismiss()

						observer.next(data['status']);
						observer.complete();
					});
			})
		}
	}

	public getUserInfo(): User {  
		/* getUserInfo: Retorna la información del usuario actual guardada
		en la variable global currentuser */
		return this.currentUser;
	}

	public getClinicasInfo() {
		/* getClinicasInfo: GET y recibe la información de las clinicas */
		if (this.clinicas) {
			return Promise.resolve(this.clinicas);
		}

		// Crear loading
		let loader = this.loading.create({
			content: 'Cargando clínicas...'
		});

		// Mostrar loading en pantalla
		loader.present();
		// Retornar promesa
		return new Promise(resolve => {
			// GET a la API
			this.http.get('http://api.promedico.cl/getclinicas')
				.map(res => res.json())
				.subscribe(data => {
					this.clinicas = data['clinicas'];
					resolve(this.clinicas);
				});
				// Loader desaparece de la pantalla
				loader.dismiss();

		})
	}

	public getDeptosInfo(id_clinica) {
		/* getDeptosInfo: GET y recibe a la información de los departamentos de 
		una clinica en especifico. SIEMPRE carga la promesa de nuevo, no la guarda
		en ningun lado */
		// Crear loading
		let loader = this.loading.create({
			content: 'Cargando departamentos...'
		});

		// Mostrar loading en pantalla
		loader.present();
		// Retornar promesa
		return new Promise(resolve => {
			// GET a la API poniendo el id de la clinica
			this.http.get('http://api.promedico.cl/getdeptos/' + id_clinica)
				.map(res => res.json())
				.subscribe(data => {
					this.deptos = data['deptos'];
					resolve(this.deptos);
				});
				// Loader desaparece de la pantalla
				loader.dismiss();
		})
	}

	public setUserInfo(value) {
		/* setUserInfo: Funcion para setear información del usuario
		actual */
		this.currentUser = value
	}

	public logout() {
		/* logout: Cerrar la sesión actual. Borra la info de la variable
		currenuser y cambia de pantalla */
		return Observable.create(observer => {
			this.currentUser = null;
			observer.next(true);
			observer.complete();
		});
	}
}