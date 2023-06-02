import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-prueba-component',
  templateUrl: './prueba-component.component.html',
  styleUrls: ['./prueba-component.component.css']
})
export class PruebaComponentComponent implements OnInit, DoCheck, OnDestroy{
  // Inicio de variables

  // Parametrisacion
  constructor(){

    console.log('Constructor Lanzado');
  }
  // Logica de inicio
  ngOnInit(): void {
    console.log('Componente Lanzado');
  }
  // Logica de cambios
  ngDoCheck(): void {
    console.log('DoCheck Lanzado');
  }
  // Eliminacion de componetes
  ngOnDestroy(): void {
    console.log('El Componente sera eliminado');
  }
  // Metodos Varios

}
