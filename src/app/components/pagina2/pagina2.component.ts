import { Component } from '@angular/core';
import { Aprendiz } from 'src/app/models/aprendiz';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.css']
})
export class Pagina2Component {


  public aprendices!: Array<any>;

constructor(){
  this.aprendices = [
    {name: "Samuel", apellido: "Cuello", edad: 20},
    {name: "Brandon", apellido: "Chaparro", edad: 21},
    {name: "Daniel", apellido: "Parra", edad: 22},
    {name: "Jaiver", apellido: "Galindo", edad: 24},
  ];
}

}
