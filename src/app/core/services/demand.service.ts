import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Demand } from '../entities/demand';

@Injectable({
  providedIn: 'root'
})
export class DemandService {

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

  getAllDemandIDs = () : Observable<any> => {
    return this.http.get<string>('http://localhost:8080/demandIDs')
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );    
  }

  getDemand = (demandId: string) : Observable<any> => {
    let params = { 'id': demandId }

    return this.http.get<Demand>('http://localhost:8080/demand', {params: params})
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );    
  }

}
