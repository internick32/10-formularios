import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb: FormBuilder, private validadores: ValidadoresService ) { 
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit() {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre') && this.forma.get('nombre').touched
  }

  get apellidoNoValido() {
    return this.forma.get('apellido') && this.forma.get('apellido').touched
  }

  get correoNoValido() {
    return this.forma.get('correo') && this.forma.get('correo').touched
  }

  get usuarioNoValido() {
    return    this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  } 

  get municipioNoValido() {
    return    this.forma.get('direccion.municipio').invalid && this.forma.get('direccion.municipio').touched
  } 

  get cityNoValida() {
    return    this.forma.get('direccion.city').invalid && this.forma.get('direccion.city').touched
  } 

  get password1NoValido() {
    return    this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  } 

  get password2NoValido() {
    const password1 = this.forma.get('pass1').value;
    const password2 = this.forma.get('pass2').value;

    return (password1 == password2) ? false : true;
  } 

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validadores.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        municipio: ['', Validators.required],
        city: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  crearListeners() {
    this.forma.valueChanges.subscribe( valor => {
      console.log(valor);
    });

    this.forma.statusChanges.subscribe( status => {
      console.log( {status} );
    });
  }

  cargarDataAlFormulario(){
    //this.forma.setValue({
    this.forma.reset({  
      nombre:'Juan Fernando',
      apellido: 'Garcia',
      correo: 'uno@dos.com',
      password1: '123',
      password2: '123',
      direccion: {
        municipio: 'Nicolas Romero',
        city: "Ciudad de Mexico"
      }
    }); 
  }

  agregarPasatiempo() {
    this.pasatiempos.push( this.fb.control('NuevoElemento'));
  }

  borrarPasatiempo(i: Number) {
    this.pasatiempos.removeAt(Number(i));
  }

  guardar() {
    console.log(this.forma);
    if( this.forma.invalid ) {

      Object.values( this.forma.controls ).forEach( control => {
        if( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });

      return;
    }
    this.forma.reset();
  }

}
