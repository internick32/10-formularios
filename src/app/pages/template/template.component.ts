import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  paises:any[] = [];

  usuario = {
    nombre: 'Jose Trinidad',
    apellido: 'Garcia Lopez',
    correo: 'uno@dos.com',
    pais:'CRI',
    genero: 'M'
  }

  constructor( private paisService: PaisService) { }

  ngOnInit() {
    this.paisService.getPaises().subscribe( paises => {
        this.paises = paises;
        this.paises.unshift({ nombre:'[Seleccione Pais]', codigo:'' })
        console.log( this.paises );
    });
  }

  guardar( forma: NgForm ) {
    console.log(forma);

    if( forma.invalid ) {
      Object.values( forma.controls ).forEach( control => {
        control.markAsTouched();
      });
    return;  
    }

    console.log(forma.value);
  }

}
