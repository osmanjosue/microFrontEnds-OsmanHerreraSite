import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  enviarCorreo(data: { nombre: string, correoElectronico: string, content: string }) {
    const url = `${base_url}/email`;
    return this.http.post(url, data);
  }
}
