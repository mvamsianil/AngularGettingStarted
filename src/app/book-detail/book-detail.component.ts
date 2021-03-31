import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../entity';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  books: Book[] = [];
  constructor(private _bookService: BookService, private _router: Router,private _alertService: AlertService) { }

  ngOnInit(): void {
    this._alertService.clear();

    this._bookService.getMyBooks().subscribe(b => {
        this._alertService.success("Books service success", {keepAfterRouteChange: true });
        this.books = b;
      },
      error => {
        this._alertService.error("Books service error");
      }
    );
  } 
}