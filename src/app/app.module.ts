// Importar componentes
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
// Importar Paginas
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { NoticiasPage } from '../pages/noticias/noticias'
import { DetallePage } from '../pages/detalle/detalle';
import { NuevaActividadPage } from '../pages/nueva-actividad/nueva-actividad';
import { LoginPage } from '../pages/login/login';
import { DetalleNoticiaPage } from '../pages/detalle-noticia/detalle-noticia';
import { RegisterPage } from '../pages/register/register';
import { AboutPage } from '../pages/about/about';
import { DetalleAboutPage } from '../pages/detalle-about/detalle-about';
import { DetalleTagPage } from '../pages/detalle-tag/detalle-tag';

// Importar Providers
import { Auth } from '../providers/auth';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    DetallePage,
    NoticiasPage,
    NuevaActividadPage,
    LoginPage,
    DetalleNoticiaPage,
    RegisterPage,
    AboutPage,
    DetalleAboutPage,
    DetalleTagPage
  ],

  imports: [
    IonicModule.forRoot(MyApp)
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    Page1,
    Page2,
    DetallePage,
    NoticiasPage,
    NuevaActividadPage,
    LoginPage,
    DetalleNoticiaPage,
    RegisterPage,
    AboutPage,
    DetalleAboutPage,
    DetalleTagPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Auth, Storage]
})
export class AppModule {}
