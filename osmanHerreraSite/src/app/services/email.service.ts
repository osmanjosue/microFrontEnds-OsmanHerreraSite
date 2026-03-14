import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  enviarCorreo(data: { nombre: string, correoElectronico: string, content: string }) {
    const url = `${base_url}/email`;

    return this.http.post(url, data).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'Error desconocido';

        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente (ej. problemas de red local)
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor (403 CORS, 500 Internal Error, etc.)
          errorMsg = `Código de error: ${error.status}, mensaje: ${error.message}`;
        }

        console.error(errorMsg);
        // Retornamos el error para que el componente también pueda manejarlo
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
