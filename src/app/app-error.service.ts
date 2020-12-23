import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AppError {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  /**
   * Manejo de los errores de la aplicación según la respuesta del back
   *
   * @param {HttpErrorResponse} error
   * @returns throwError
   * @memberof AppError.handleError
   */
  handleError(error: HttpErrorResponse) {
    if (error.status) {
      this.toastr.error(error.error.messages, 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
      });
    } else {
      this.toastr.error('Please try later', 'Internal error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-center',
      });
    }

    return throwError(error);
  }
}
