import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URLSERVICE = 'http://jsonplaceholder.typicode.com/';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  // SERVICIO GET
  private getRequest = (metod: string, customheaders?: string) => this.http.get(`${ URLSERVICE }${ metod }`);

  // SERVICIO POST
  private postRequest = (metod: string, parametros?: object, customheaders?: string) =>
                        this.http.post(`${ URLSERVICE }${ metod }`, parametros);

  // Usuarios
  public getUsers = () => {
    return this.getRequest('users');
  };

}
