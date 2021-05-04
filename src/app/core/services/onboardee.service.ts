import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Onboardee } from '../entities/onboardee';

@Injectable({
  providedIn: 'root'
})
export class OnboardeeService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }

    return throwError('Something bad happened; please try again later.');
  }

  getAllOnboardees = () : Observable<any> => {
    return this.http.get('http://localhost:8080/onboardees')
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );    
  }

  getOnboardee = (email: string) : Observable<Onboardee> => {
    let params = { 'email': email }

    return this.http.get<Onboardee>('http://localhost:8080/onboardee', {params: params})
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );    
  }

  addNewOnboardee = (newOnboardee: Onboardee): Observable<number> => {
    return this.http.post<number>('http://localhost:8080/addOnboardee', newOnboardee)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  updateOnboardee = (changedOnboardee: Onboardee): Observable<number> => {
    return this.http.post<number>('http://localhost:8080/updateOnboardee', changedOnboardee)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

}
