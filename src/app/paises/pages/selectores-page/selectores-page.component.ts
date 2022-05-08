import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Pais } from '../../interfaces/pais.interface';
import { PaisesServicesService } from '../../services/paises-services.service';

@Component({
  selector: 'app-selectores-page',
  templateUrl: './selectores-page.component.html',
  styles: [
  ]
})
export class SelectoresPageComponent implements OnInit {

  miFormulario : FormGroup = this.fb.group({
    region: ['',[Validators.required]],
    pais: ['',[Validators.required]],
    frontera: ['',[Validators.required]]
  })

  regiones: string[] = [];
  paises : Pais[] = [];
  fronteras: string[] = [];

  cargando : boolean = false;

  constructor(private fb : FormBuilder,
              private paisesService : PaisesServicesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap((_)=>{
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap(region=>this.paisesService.getPaisesPorRegion(region))
      )
      .subscribe(paises=>{
        this.paises = paises;
        this.cargando = false;
      })

    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap((_)=>{
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;
        }),
        switchMap(codigo=>this.paisesService.getPaisPorCodigo(codigo))
      )
      .subscribe(paises=>{
        this.fronteras = paises ? paises[0].borders : [];
        this.cargando = false;
      })
  }

  guardar(){
    console.log(this.miFormulario.value)
  }

}
