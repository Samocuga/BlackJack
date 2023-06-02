import { Component } from "@angular/core";


@Component({
  selector: 'mi-componente',
  templateUrl: './mi-componente.component.html'
})

export class MiComponente{
  constructor(){
    console.log('Componente MiComponente cargado')
  }
}