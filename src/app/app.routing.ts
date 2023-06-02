// Importar  los modulos de routing de angular 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Importar componentes que seran pagina exclusiva
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component'; 
import { FormularioComponent } from './components/formulario/formulario.component';
import { Pagina1Component } from './components/pagina1/pagina1.component';
import { ErrorComponent } from './components/error/error.component';

// Array de rutas 

const appRoutes : Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'pagina1', component: Pagina1Component},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

// Exportar el modulo de rutas 

export class AppRoutingModule { }

