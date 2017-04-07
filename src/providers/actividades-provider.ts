import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class ActividadesProvider {
	// Data Cargada
	data: any;
  tipos: any;
  tags: any;

  // Inicio
  tags_tab1: any;
  actividades_by_tag: any;

  	constructor(public http: Http, public loading: LoadingController) {}

    getActividades(token){
      if (this.data) {
        return Promise.resolve(this.data);
      }

      let loader = this.loading.create({
        content: 'Cargando...'
      });

      loader.present();
      return new Promise(resolve => {
        

        let headers = new Headers();
        headers.append('Content-Type', undefined);
        this.http.post('http://educalabs.cl:5000/get_actividades', JSON.stringify(token), {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            let loader = this.loading.create({
              content: 'Cargando...'
            });
            this.data = data.actividades;
            console.log(data.actividades);
            resolve(this.data)
          });
          loader.dismiss()
      });
    }


    // Nueva actividad
    nuevaActividad(credenciales) {
      let loader = this.loading.create({
        content: 'Cargando...'
      });
      console.log(JSON.stringify(credenciales))

      loader.present();
      return new Promise(resolver => {
        let headers = new Headers();
        headers.append('Content-Type', undefined);
        this.http.post('http://educalabs.cl:5000/nueva_actividad', JSON.stringify(credenciales), {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            let loader = this.loading.create({
              content: 'Cargando...'
            });
            this.data = data.results;
            console.log(data)
          });
          loader.dismiss()
      });
    }


   getTipos() {
     /* Funcion que recibe todos los tipos */
     if (this.tipos) {
       return Promise.resolve(this.tipos);
     }


     let loader = this.loading.create({
       content: 'Recibiendo tipos...',
       //duration: 1500
     })

    loader.present()
    // Si todavía no hay data
    return new Promise(resolve => {
      // Hacer get a la api
      this.http.get('http://educalabs.cl:5000/gettipos')
        .map(res => res.json())
        .subscribe(data => {
          this.tipos = data['tipos'];
          //alert(this.tipos[0].id);
          resolve(this.tipos);
        });
        loader.dismiss();
      });
   }

   getTags() {
     /* Funcion para recibir todos los tags */
     if (this.tags) {
       return Promise.resolve(this.tags);
     }

     let loader = this.loading.create({
       content: 'Recibiendo tags..'
     })

     loader.present();
     // Si todavia no hay info en los tags
     return new Promise(resolve => {
       // Hacer get a la api
       this.http.get('http://educalabs.cl:5000/gettags')
         .map(res => res.json())
         .subscribe(data => {
           this.tags = data['tags']
           console.log(data)
           resolve(this.tags);
         });
         loader.dismiss();
     })
   }

  // Nueva actividad
  borrarActividad(credenciales) {
    let loader = this.loading.create({
      content: 'Cargando...'
    });

    
    
    loader.present();
    return new Promise(resolver => {
      let headers = new Headers();
      headers.append('Content-Type', undefined);
      this.http.post('http://educalabs.cl:5000/removeActividad', JSON.stringify(credenciales), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.results;
          console.log(data)
        });
        loader.dismiss()
      });
    }   



    getInfoTags(credenciales) {
      /* Funcion para recibir info de los tags, se usa en la primera
      pestaña del inicio. Tengo que mandar Token del usuario actual */

      if (this.tags_tab1) {
        return Promise.resolve(this.tags_tab1);
      }


      
      return new Promise(resolve => {
        let headers = new Headers();
        headers.append('Content-Type', undefined);
        this.http.post('http://educalabs.cl:5000/getTagsInfo', JSON.stringify(credenciales), {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            this.tags_tab1 = data['tags'];
            console.log(data)
            resolve(this.tags_tab1);
          });
      })
    }

    getActividadesByTag(credenciales) {
      if (this.actividades_by_tag) {
        return Promise.resolve(this.actividades_by_tag);
      }

      let loader = this.loading.create({
        content: 'Cargando actividades...'
      });

      loader.present();
      return new Promise(resolve => {
        let headers = new Headers();
        headers.append('Content-Type', undefined);
        this.http.post('http://educalabs.cl:5000/get_actividades', JSON.stringify(credenciales), {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            this.actividades_by_tag = data['actividades'];
            resolve(this.actividades_by_tag);
            console.log(this.actividades_by_tag)
            
          });
          loader.dismiss()
      })
    }






  	// Cargar Actividades
  	load() {
  		if (this.data) {
    		// Si es que hay Data ya cargada
    		return Promise.resolve(this.data);
  		}

  		let loader = this.loading.create({
  			content: 'Cargando...'
  		});

  		loader.present()
  		// Si todavía no hay data
  		return new Promise(resolve => {
  		// Hacer get a la api
    		this.http.get('https://randomuser.me/api/?results=10')
      			.map(res => res.json())
      			.subscribe(data => {
					this.data = data.results;
		  			resolve(this.data);
				});
      			loader.dismiss();
  		});	
	}
}
