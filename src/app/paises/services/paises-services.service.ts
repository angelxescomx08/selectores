import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';
import { PaisCodigo } from '../interfaces/pais-codigo.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesServicesService {

  private baseUrl : string = 'https://restcountries.com/v3.1';
  private _regiones : string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones(): string[]{
    return [...this._regiones];
  }

  constructor(private http : HttpClient) { }

  getPaisesPorRegion(region: string):Observable<Pais[]>{
    const url = `${this.baseUrl}/region/${region}?fields=cca3,name`;
    return this.http.get<Pais[]>(url);
  }

  getPaisPorCodigo(codigo:string):Observable<PaisCodigo[] | null>{
    if(!codigo){
      return of(null);
    }
    const url = `${this.baseUrl}/alpha/${codigo}`;
    return this.http.get<PaisCodigo[]>(url);
  }
}
