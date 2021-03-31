import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Book } from './entity/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private _httpClient: HttpClient) { }

  getMyBooks(): Observable<Book[]> {
    return this._httpClient.get<Book[]>(environment.apiUrl + environment.getBooksListUrl);
  }
}