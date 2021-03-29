import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../entity/book';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  books: Book[] = [];
  constructor(private bookService: BookService, private router: Router,) { }

  ngOnInit(): void {
    this.bookService.getMyBooks().subscribe((b) => {
      this.books = b;
    });
  } 

}