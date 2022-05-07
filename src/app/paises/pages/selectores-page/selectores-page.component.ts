import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServicesService } from '../../services/paises-services.service';

@Component({
  selector: 'app-selectores-page',
  templateUrl: './selectores-page.component.html',
  styles: [
  ]
})
export class SelectoresPageComponent implements OnInit {

  miFormulario : FormGroup = this.fb.group({
    region: ['',[Validators.required]]
  })

  regiones: string[] = [];

  constructor(private fb : FormBuilder,
              private paisesService : PaisesServicesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;
  }

  guardar(){
    console.log(this.miFormulario.value)
  }

}
