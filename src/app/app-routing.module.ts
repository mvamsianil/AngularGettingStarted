import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { LoginComponent } from './login/login.component';
import { AllUsersComponent } from './all-users/all-users.component';

const routes: Routes = [
  { path: 'books', component: BookDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'all-users', component: AllUsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
