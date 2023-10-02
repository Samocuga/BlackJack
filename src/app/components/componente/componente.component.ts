import { Component } from "@angular/core";

@Component({
  selector: 'componente',
  templateUrl:'./componente.component.html'
})

export class componente{
   constructor (){
    console.log('Componente cargado')
   }
}