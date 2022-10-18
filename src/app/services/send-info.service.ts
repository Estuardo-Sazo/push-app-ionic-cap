import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
export class Divice {
  divice: string;
  user: string;
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class SendInfoService {
  endpoint = 'http://192.168.100.7:3000/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}

  sentDivice(user: Divice): Observable<any> {
    return this.httpClient
      .post<Divice>(this.endpoint, JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.handleError<Divice>('Error occured')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
