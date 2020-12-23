import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpParams,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AppError } from '../app-error.service';

const headers = {};

const httpOptions = {
  headers: new HttpHeaders(headers),
  observe: 'response' as 'body',
  params: new HttpParams({}),
};

const onSuccess = map((response: HttpResponse<any>) => {
  switch (response.status) {
    case 200:
      return response.body;
    case 201:
      return response.ok;
    case 204:
      return response.ok;
    default:
      return response.ok;
  }
});

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private appError: AppError) {}

  public get(
    url: string,
    params?: { [param: number]: string | string[] }
  ): Observable<any> {
    httpOptions.params = new HttpParams({
      fromObject: params,
    });
    return this.http.get(url, httpOptions).pipe(
      onSuccess,
      catchError((error: HttpErrorResponse) => {
        return this.appError.handleError(error);
      })
    );
  }
}
