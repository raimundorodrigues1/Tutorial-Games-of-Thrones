import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Warrior } from './warrior';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class WarriorService {

  private warriorsUrl = 'api/warriors';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getWarriors (): Observable<Warrior[]> {
    return this.http.get<Warrior[]>(this.warriorsUrl)
      .pipe(
        tap(warriors => this.log('fetched warriors')),
        catchError(this.handleError('getWarriors', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getWarriorNo404<Data>(id: number): Observable<Warrior> {
    const url = `${this.warriorsUrl}/?id=${id}`;
    return this.http.get<Warrior[]>(url)
      .pipe(
        map(warriors => warriors[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} warrior id=${id}`);
        }),
        catchError(this.handleError<Warrior>(`getWarrior id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getWarrior(id: number): Observable<Warrior> {
    const url = `${this.warriorsUrl}/${id}`;
    return this.http.get<Warrior>(url).pipe(
      tap(_ => this.log(`fetched warrior id=${id}`)),
      catchError(this.handleError<Warrior>(`getWarrior id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Warrior[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Warrior[]>(`${this.warriorsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found warriors matching "${term}"`)),
      catchError(this.handleError<Warrior[]>('searchWarriors', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addWarrior (warrior: Warrior): Observable<Warrior> {
    return this.http.post<Warrior>(this.warriorsUrl, warrior, httpOptions).pipe(
      tap((warrior: Warrior) => this.log(`added warrior w/ id=${warrior.id}`)),
      catchError(this.handleError<Warrior>('addWarrior'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteWarrior (warrior: Warrior | number): Observable<Warrior> {
    const id = typeof warrior === 'number' ? warrior : warrior.id;
    const url = `${this.warriorsUrl}/${id}`;

    return this.http.delete<Warrior>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted warrior id=${id}`)),
      catchError(this.handleError<Warrior>('deleteWarrior'))
    );
  }

  /** PUT: update the hero on the server */
  updateWarrior (warrior: Warrior): Observable<any> {
    return this.http.put(this.warriorsUrl, warrior, httpOptions).pipe(
      tap(_ => this.log(`updated warrior id=${warrior.id}`)),
      catchError(this.handleError<any>('updateWarrior'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`WarriorService: ${message}`);
  }
}