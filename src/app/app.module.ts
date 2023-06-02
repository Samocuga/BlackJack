import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { MiComponente } from './components/mi-componente/mi-componente.component';
import { PruebaComponentComponent } from './components/prueba-component/prueba-component.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { Pagina1Component } from './components/pagina1/pagina1.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    MiComponente,
    AppComponent,
    PruebaComponentComponent,
    HeaderComponent,
    SliderComponent,
    SideBarComponent,
    FooterComponent,
    HomeComponent,
    BlogComponent,
    FormularioComponent,
    Pagina1Component,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
