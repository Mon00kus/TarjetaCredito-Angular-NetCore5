import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment }  from '../../environments/environment'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TarjetaService {

  private ruta_api_tarjeta = environment.ruta_api_tarjeta;
  private ruta_api = environment.ruta_api;

  constructor(private http: HttpClient) {
  }

  getListTarjetas(): Observable<any>{
    return this.http.get(this.ruta_api + this.ruta_api_tarjeta);
  }

  deleteTarjeta(id : number): Observable<any>{
    return this.http.delete(this.ruta_api + this.ruta_api_tarjeta + id);
  }

  saveTarjeta(tarjeta :any):Observable<any>{
    return this.http.post(this.ruta_api + this.ruta_api_tarjeta, tarjeta);
  }

  updateTajeta(id : number, tarjeta : any):Observable<any>{
    return this.http.put(this.ruta_api + this.ruta_api_tarjeta+id, tarjeta);
  }
}
