import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Book } from './entity/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  getBooksListUrl: string = 'https://localhost:44397/coreapi/Book/ListOfBooks';
  //book : Observable<Book>[] = [];

  constructor(private _httpClient: HttpClient) { }

  getMyBooks(): Observable<Book[]> {
    return this._httpClient.get<Book[]>(this.getBooksListUrl);
  }
}
