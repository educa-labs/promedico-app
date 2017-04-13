import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class ActividadesProvider {
	/* Provider de actividades, carga toda la información de las actividades
	y los usuarios */

	// Url global para la api
	api: any = 'http://api.promedico.cl';
	
	// Crear variables de info ya cargada
	data: any;
	tipos: any;
	tags: any;
	nueva_actividad: any;
	borrar: any;

	// Crear variables de info para el inicio
	tags_tab1: any;
	actividades_by_tag: any;

	constructor(public http: Http, public loading: LoadingController) {}

	// Funciones para las actividades

	getActividades(token) {
		/* getActividades: recibe el token del usuario, hace un post al backend
		y resuelve una promesa que retorna las actividades del usuario */
		if (this.data) {
			return Promise.resolve(this.data);
		}

		// Crear Loading	
		let loader = this.loading.create({
			content: 'Cargando actividades...'
		 });

		// Mostrar loading en pantalla
		loader.present();
		// Retornar promesa
		return new Promise(resolve => {
			// Headers para el el POST para el backend
			let headers = new Headers();
			headers.append('Content-Type', undefined);

			// Hacer POST al servidor
			this.http.post(this.api + '/get_actividades', JSON.stringify(token), {headers: headers})
				.map(res => res.json())
				.subscribe(data => {
					// Guardar la informacion que retorna en this.data
					this.data = data.actividades;
					/* Imprimir las actividades del usuario
					console.log(data.actividades) */
					resolve(this.data)
				});
				// Desaparece Loader de pantalla
				loader.dismiss()
		});
	}

	nuevaActividad(credenciales) {
		/* nuevaActividad: recibe credenciales para hacer POST al backend, resuelve
		una promesa que retorna True o False si se creo o no la nueva actividad */
		if (this.nueva_actividad) {
			return Promise.resolve(this.nueva_actividad);
		}

		// Crear Loading
		let loader = this.loading.create({
			content: 'Cargando...'
		});

		// Mostrar Loading en Pantalla
		loader.present();
		// Retornar promesa
		return new Promise(resolve => {
			// Crear y agregar headers para hacer POST al servidor			
			let headers = new Headers();
			headers.append('Content-Type', undefined);

			// Hacer POST al servidor
			this.http.post(this.api + '/nueva_actividad', JSON.stringify(credenciales), {headers: headers})
				.map(res => res.json())
				.subscribe(data => {
					let loader = this.loading.create({
						content: 'Creando actividad...'
					});
					this.data = data.results;
					/* Imprimir las actividades del usuario en la consola
					console.log(data) */
					resolve(this.data)
				});
			// Desaparece Loader en pantalla
			loader.dismiss()
		});
	}


	getTipos() {
		/* getTipos: Funcion para recibir todos los tipos de las actividades. 
		Hace GET al backend y retorna los tipos */
		if (this.tipos) {
			return Promise.resolve(this.tipos);
		}

		// Crear Loading
		let loader = this.loading.create({
			content: 'Recibiendo tipos...',
			//duration: 1500
		})

		// Mostrar loading en la pantalla
		loader.present()

		// Retornar promesa 
		return new Promise(resolve => {
			// Hacer get a la API
			this.http.get(this.api + '/gettipos')
				.map(res => res.json())
				.subscribe(data => {
					this.tipos = data['tipos'];
					//alert(this.tipos[0].id);
					resolve(this.tipos);
				});
				// Loader desaparece en pantalla
				loader.dismiss();
		});
	}

	getTags() {
		/* getTags: Funcion para recibir todos los tags. Manda GET a la API y retorna
		una promesa con los tags */
		if (this.tags) {
			return Promise.resolve(this.tags);
		}
	 
		// Retornar una promesa
		return new Promise(resolve => {
			// Hacer get a la API
			this.http.get(this.api + '/gettags')
				.map(res => res.json())
				.subscribe(data => {
					this.tags = data['tags']
					/* Imprimir los tags
					console.log(data) */
					resolve(this.tags);
				});
		})
	}

	borrarActividad(credenciales) {
		/* borrarActividad: Envía credenciales y retorna True o False
		No retorna la información si ya la tiene. Se carga siempre */		
		// Crear loader
		let loader = this.loading.create({
			content: 'Cargando...'
		});

		// Mostrar loder en pantalla
		loader.present();
		return new Promise(resolve => {
			// Crear y agregar headers para hacer POST
			let headers = new Headers();
			headers.append('Content-Type', undefined);
			
			// Hacer POST a la API 
			this.http.post(this.api + '/removeActividad', JSON.stringify(credenciales), {headers: headers})
				.map(res => res.json())
				.subscribe(data => {
					this.borrar = data.results;
					/* Imprimir status
					console.log(data) */
					resolve(this.borrar);
				});
				// Loader desaparace en pantalla
				loader.dismiss()
		});
	}   

	getInfoTags(credenciales) {
		/* getImfoTags: manda credenciales a la API, retorna los tags con la info
		del usuario, los puntajes y la meta */
		if (this.tags_tab1) {
			return Promise.resolve(this.tags_tab1);
		}

		// Crear loader
		let loader = this.loading.create({
			content: 'Recibiendo información de los tag...'
		});

		// Mostrar el loader en pantalla
		loader.present();

		// Retornar promesa
		return new Promise(resolve => {
			// Crear y agregar headers para hacer POST
			let headers = new Headers();
			headers.append('Content-Type', undefined);

			// Hacer POST a la API
			this.http.post(this.api + '/getTagsInfo', JSON.stringify(credenciales), {headers: headers})
				.map(res => res.json())
				.subscribe(data => {
					this.tags_tab1 = data['tags'];
					/* Imprimir tags 
					console.log(data) */
					resolve(this.tags_tab1);
				});
			// Desaparece Loader de la pantalla
			loader.dismiss();
		})
	}

	getActividadesByTag(credenciales) {
		/* getActividadesByTag: envía credenciales a la API, retorna las actividades
		de un usuario de un tag */
		if (this.actividades_by_tag) {
			return Promise.resolve(this.actividades_by_tag);
		}

		// Crar loader
		let loader = this.loading.create({
			content: 'Cargando actividades...'
		});

		// Mostrar loader en pantalla
		loader.present();
		// Retornar proomise
		return new Promise(resolve => {
			// Crear y agregar headers para POST
			let headers = new Headers();
			headers.append('Content-Type', undefined);
			
			// Hacer POST a la API
			this.http.post(this.api + '/get_actividades', JSON.stringify(credenciales), {headers: headers})
				.map(res => res.json())
				.subscribe(data => {
					this.actividades_by_tag = data['actividades'];
					/* Imprimir actividades de un tag
					concole.log(this.actividades_by_tag) */
					resolve(this.actividades_by_tag);
				});
			// Desaparecer Loader en pantalla
			loader.dismiss()
		})
	}
}