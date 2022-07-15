import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError, lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { UtilsService } from '../utils.service';
import { environment } from '../../../environments/environment';
import { AppExeption, DeletedData } from '../app.models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    // private toastrService: NbToastrService,
    // private utilsService: UtilsService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  // Método general para hacer post porque el servicio recibe cualquier objeto
  public async postAsync(data: any, node: string): Promise<any> {
    const url = environment.backUrl + '/firestore/collection/' + node;
    // const dataPlain = this.utilsService.toPlainObject(data);
    const response$ = this.httpClient.post(url, data);

    return lastValueFrom(response$);
  }

  public postDataToService<T = any>(data: any, service: string): Promise<T> {
    const url = environment.backUrl + '/' + service;
    // const dataPlain = this.utilsService.toPlainObject(data);
    const response$ = this.httpClient.post<T>(url, data).pipe(
      // Estrategía de catch and rethrow solo para mostrar el mensaje en alert
      catchError((err) => {
        this.handleError(err);
        return throwError(() => err);
      })
    );

    return lastValueFrom<T>(response$);
  }

  public async getDataFromService<T = any[]>(service: string) {
    const url = `${environment.backUrl}/${service}`;
    const get$ = this.httpClient.get<T>(url).pipe(
      catchError((err) => {
        this.handleError(err);
        return throwError(() => err);
      })
    );

    return lastValueFrom<T>(get$);
  }

  public async deleteDataFromService(service: string): Promise<DeletedData> {
    const url = `${environment.backUrl}/${service}`;
    const response$ = await this.httpClient.delete<DeletedData>(url);
    return lastValueFrom(response$);
  }

  public getObservable<T>(service: string): Observable<T> {
    const url = `${environment.backUrl}/${service}`;
    return this.httpClient.get<T>(url).pipe(
      catchError((err) => {
        this.handleError(err);
        return throwError(err);
      })
    );
  }

  public postObservable<ReturnType, DataType>(
    service: string,
    data: DataType,
    skipErrorHandling = false
  ): Observable<ReturnType | any> {
    const url = `${environment.backUrl}/${service}`;
    return this.httpClient.post<ReturnType>(url, data).pipe(
      catchError((err) => {
        if (skipErrorHandling) {
          this.handleError(err);
        }
        return throwError(() => err);
      })
    );
  }

  public deleteObservable<ReturnType>(service: string): Observable<ReturnType> {
    const url = `${environment.backUrl}/${service}`;
    return this.httpClient.delete<ReturnType>(url).pipe(
      // Estrategía de catch and rethrow solo para mostrar el mensaje en alert
      catchError((err) => {
        this.handleError(err);
        return throwError(err);
      })
    );
  }

  private handleError(err: HttpErrorResponse): void {
    if (err.status === 0) {
      // TODO? todavía no entiendo como cargar los modulos desde el principio, cuando no tengo activo el backend
      // lo primero que hace es botar este error, pero no tengo el toastService en ese momento, siento que la app
      // debería garantizar la carga de ThemeModule desde el mero principio.
      // this.toastrService.danger('No es posible conectar con el servidor')
      alert('No es posible contactar con el servidor');
      // this.router.navigateByUrl('/auth/login');
    } else {
      const error: AppExeption = err.error;
      const message = error.explanation || error.error_message;
      // this.toastrService.danger(message, 'Ocurrió un problema', {
      //   duration: 4500,
      // });
    }
  }
}
