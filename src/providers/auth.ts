import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

// Clase usuario
export class User {
  // Datos del usuario
  id: number;
  name: string;
  ocupacion: string;
  email: string;
  clinica: string;
  token: any;

  constructor(id: number, name: string, 
      ocupacion: string, email: string, token: any, clinica: string) {
    this.id = id
    this.name = name ;
    this.email = email;
    this.token = token;
    this.ocupacion = ocupacion;
    this.clinica = clinica;
  }
}


// Funciones del provider Auth
@Injectable()
export class Auth {
  // Usuario actual
  currentUser: User;
  data: any;

  // Infomacion 
  clinicas: any;

  // Funcion de Login
  public login(credentials){
    // Si no ingresa correctamente las credenciales
    if (credentials.email === null || credentials.password === null){
      return Observable.throw("Ingresa las credenciales");
    }

    // Si ingresan correctamente las credenciales
    else {

      /* Crea un Observable y después llama a la funcion 
      getInfo(), que retorna una promesa con la info */
      return Observable.create(observer => {

        let headers = new Headers();
        headers.append('Content-Type', undefined);

        this.http.post('http://educalabs.cl:5000/login', JSON.stringify(credentials), {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            let loader = this.loading.create({
              content: 'Cargando...'
            });
            loader.present()
            this.data = data._body;
            console.log(data);
            this.currentUser = new User(0, data["nombre"], data["ocupacion"], data["mail"], data["token"], data["clinica"])
            loader.dismiss()
            observer.next(data["status"]);
            observer.complete();
          });
      })
    }
  }

  // Funcion para registrarse
  public register(credentials){
    // Si no ingresa las credenciales
    if (credentials.email === null || credentials.password === null){
      return Observable.throw("Por favor ingresa las credenciales");
    }

    // Si ingresa credenciales correctamente
    else {
      let headers = new Headers();
      headers.append('Content-Type', undefined);

      this.http.post('http://educalabs.cl:5000/signup', JSON.stringify(credentials), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let loader = this.loading.create({
            content: 'Cargando...'
          });
          
          loader.present()
          this.data = data._body;
          console.log(data);
          loader.dismiss()
          });

      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      })
    }
  }

  // Funcion para ver usuario actual
  public getUserInfo(): User {  
    return this.currentUser;
  }

/*  // Funcion para recibir info de las clinicas
  public getClinicas() {

    return new Promise(resolve => {
      this.http.get('http://educalabs.cl:5000/getclinicas')
        .map(res => res.json())
        .subscribe( data => {
          let loader = this.loading.create({
            content: 'Recibiendo información...',
            duration: 2500
          });
          loader.present();
          this.data = data._body;

        })
    })
    
  }*/

  // Funcion para setear info
  public setUserInfo(value) {
    this.currentUser = value
  }

  // Funcion para ver data
  public getData() {
    return this.data;
  }

  // Funcion para cerrar sesión 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }


	constructor(public http: Http, public loading: LoadingController) {}

}
