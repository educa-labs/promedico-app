import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


// Importar paginas del menu
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { NoticiasPage } from '../pages/noticias/noticias';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';

// Importar Providers
import { Storage } from '@ionic/storage';
import { Auth } from '../providers/auth';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public storage: Storage, private auth: Auth) {
    this.initializeApp();

    // Acá se usa el NgFor que repite las paginas del menu
    this.pages = [
      { title: 'Inicio', component: Page1 },
      { title: 'Mis Actividades', component: Page2 },
      { title: 'Noticias' , component: NoticiasPage },
      { title: '¿Por qué DPC?', component: AboutPage }
    ];

  }

  cerrarSesion() {

    this.auth.logout().subscribe(succ => {
      alert("Cerraste Sesión");
      this.storage.remove('user');
      this.nav.setRoot(LoginPage);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.backgroundColorByHexString("#3b6ab5");
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
