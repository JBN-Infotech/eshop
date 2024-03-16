import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  // run the rails app eshop /eshop-users in 3002 port
  private apiUrl = 'http://localhost:3002/api/v1';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
 
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiUrl+ '/users/').pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }))
  }
  errorHandler(errorHandler: any): import("rxjs").OperatorFunction<Object, any> {
    throw new Error('Method not implemented.');
  }

  create(user: User):Observable<any> {
    return this.httpClient.post(this.apiUrl+'/users/', JSON.stringify(user), this.httpOptions).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }))
  }

  find(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl+ '/users/'+id).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }))
  }

  update(id: number, user: User): Observable<any> {
    return this.httpClient.put(this.apiUrl+ '/users/'+id, JSON.stringify(user), this.httpOptions).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }))
  }

  delete(id: number) {
    return this.httpClient.delete(this.apiUrl+ '/users/'+id).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error);
    }))
  }
}
