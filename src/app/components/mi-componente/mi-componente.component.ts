import { Component } from "@angular/core";


@Component({
  selector: 'mi-componente',
  template: `
  <h1>Hola mundo</h1>
  <p>Mi primer parrafo UwU</p>
  `
})

export class MiComponente{
  constructor(){
    console.log('Componente MiComponente cargado')
  }
}